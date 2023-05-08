import { LightningElement, wire, api } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { subscribe, onError } from 'lightning/empApi';
import AnnouncementBoardModal from 'c/announcementBoardModal';

import getAnnouncements from '@salesforce/apex/AnnouncementBoardController.getAnnouncements';

export default class AnnouncementBoard extends LightningElement {
    isLoading = false;
    error;

    @api cardTitle = 'Announcement Board';
    @api cardIconName = 'utility:announcement';

    channelName = '/event/Announcement_Notification__e';
    subscription = {};

    wiredAnnouncements = [];
    announcements;

    /**
     * emp api - platform event subscription
     */

    // Initializes the component
    connectedCallback() {
        // Register error listener
        this.registerErrorListener();
        this.handleSubscribe();
    }

    /**
     * Get most recent 20 announcements
     */
    @wire(getAnnouncements)
    wiredResult(result) {
        this.isLoading = true;
        this.wiredAnnouncements = result;
        if (result.data) {
            console.table(result.data);
            this.announcements = result.data;
            this.error = undefined;
            this.isLoading = false;
        } else if (result.error) {
            this.announcements = undefined;
            this.error = result.error;
            console.error(this.error);
            this.isLoading = false;
        }
    }

    async handleMoreRowInfo(event) {
        const row = event.target.dataset;
        console.log(':::: row highlights: ' + row.highlights);
        console.log(':::: row highlights: ' + row.details);
        const result = await AnnouncementBoardModal.open({
            size: 'small',
            description: 'More information about the announcement',
            name: row.name,
            highlights: row.highlights,
            details: row.details
        });
        // if modal closed with X button, promise returns result = 'undefined'
        // if modal closed with OK button, promise returns result = 'okay'
        console.log(result);
    }

    handleRefresh() {
        refreshApex(this.wiredAnnouncements);
    }

    // Handles subscribe button click
    handleSubscribe() {
        // Callback invoked whenever a new event message is received
        const messageCallback = response => {
            console.log('New message received: ', JSON.stringify(response));
            // Response contains the payload of the new message received
            console.log('refresh please');
            this.handleRefresh();
        };

        // Invoke subscribe method of empApi. Pass reference to messageCallback
        subscribe(this.channelName, -1, messageCallback).then((response) => {
            // Response contains the subscription information on subscribe call
            console.log(
                'Subscription request sent to: ',
                JSON.stringify(response.channel)
            );
            this.subscription = response;
        });
    }

    registerErrorListener() {
        // Invoke onError empApi method
        onError((error) => {
            console.log('Received error from server: ', JSON.stringify(error));
            // Error contains the server-side error
        });
    }

}