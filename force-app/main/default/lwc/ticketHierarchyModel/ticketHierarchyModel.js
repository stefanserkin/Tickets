import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { getRecord } from 'lightning/uiRecordApi';
import getTicketsInHierarchy from '@salesforce/apex/TicketHierarchyModelController.getTicketsInHierarchy';

import ULTIMATE_PARENT_ID_FIELD from '@salesforce/schema/Ticket__c.Ultimate_Parent_ID__c';

export default class TicketHierarchyModel extends NavigationMixin(LightningElement) {
    /**
     * Record id from page context
     */
    @api recordId;

    /**
     * Design time attributes - set in lightning app builder
     */
    @api cardTitle;
    @api cardIconName;

    /**
     * Loading flag and error
     */
    isLoading = false;
    error;

    /**
     * Stuff to actually do stuff with
     */
    currentTicket;
    ultimateParentId;
    wiredTickets = [];
    tickets;
    // Tier one - single ticket
    ultimateParentTicket;
    // Tier two - an array of child tickets to the ultimate parent ticket
    lstTierTwoTickets = [];
    // Tier three - a nested array of a tier two ticket id to its array of third tier child tickets
    mapTierThreeTickets = [];

    /**
     * @description set current ticket and ultimate parent id for the top of hierarchy
     * @param recordId - record id from current ticket page context
     */
    @wire(getRecord, { recordId: '$recordId', fields: [ULTIMATE_PARENT_ID_FIELD] }) 
    wiredTicket({ error, data }) {
        if (error) {
            this.handleError(error);
        } else if (data) {
            this.currentTicket = data;
            this.ultimateParentId = this.currentTicket.fields.Ultimate_Parent_ID__c.value;
        }
    }

    /**
     * @description get all tickets that share an ultimate parent id
     * @param ultimateParentId - the ultimate parent id of the current ticket record
     */
    @wire(getTicketsInHierarchy, { ultimateParentId: '$ultimateParentId' })
    wiredTicketsInHierarchy(result) {
        this.isLoading = true;
        this.wiredTickets = result;
        if (result.data) {
            let rows = JSON.parse( JSON.stringify(result.data) );
            // Identify current ticket
            rows.forEach(row => {
                if (row.Id === this.recordId) {
                    row.isCurrentRecord = true;
                } else {
                    row.isCurrentRecord = false;
                }
            });
            // Top level ticket is the one where the ultimate parent id is the record id
            this.ultimateParentTicket = rows.find(tk => (tk.Ultimate_Parent_ID__c === this.ultimateParentId));
            // Second tier is an array of children of the ultimate parent id
            this.lstTierTwoTickets = rows.filter(tk => (tk.Parent_Ticket__c === this.ultimateParentId));
            // Third tier will be a nested array of a second tier id to its third tier child tickets
            this.lstTierTwoTickets.forEach(parentRow => {
                let childTicketArray = rows.filter(r => r.Parent_Ticket__c === parentRow.Id);
                this.mapTierThreeTickets.push({parentTicket: parentRow, childTickets: childTicketArray});
            });

            this.tickets = rows;
            this.error = undefined;
            this.isLoading = false;
        } else if (result.error) {
            this.tickets = undefined;
            this.handleError(error);
            this.isLoading = false;
        }
    }

    /**
     * @description navigate to ticket record page using the lightning navigation service
     * @param recordId
     */
    goToRecordPage(event) {
        const recordId = event.target.dataset.id;
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                objectApiName: 'Ticket__c',
                actionName: 'view'
            }
        });
    }

    /**
     * @description parse error and raise toast for user
     * @param error
     */
    handleError(error) {
        console.error(error);
        this.error = error;
        let message = 'Unknown error';
        if (Array.isArray(error.body)) {
            message = error.body.map(e => e.message).join(', ');
        } else if (typeof error.body.message === 'string') {
            message = error.body.message;
        }
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error loading contact',
                message,
                variant: 'error',
            }),
        );
    }

}