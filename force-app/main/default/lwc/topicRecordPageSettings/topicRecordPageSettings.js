import { LightningElement, api, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import NAME_FIELD from '@salesforce/schema/Topic__c.Name';
import ACTIVE_FIELD from '@salesforce/schema/Topic__c.Active__c';
import HEX_COLOR_FIELD from '@salesforce/schema/Topic__c.Hex_Color__c';

export default class TopicRecordPageSettings extends LightningElement {
    @api recordId;
    @api objectApiName;

    cardTitle = 'Topic Settings';
    defaultColor = '#8DC141';

    // Expose fields to make them available in the template
    nameField = NAME_FIELD;
    activeField = ACTIVE_FIELD;
    hexColorField = HEX_COLOR_FIELD;

    handleColorChange(event) {
        console.log(event.detail.value);
    }

    handleReset(event) {
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
    }

    handleSuccess(event) {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Hooray the record has been saved for ' + event.detail.id,
                variant: 'success',
            }),
        );
    }

    handleError(event) {
        console.log(event.detail);
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Error updating record',
                message: event.detail.message,
                variant: 'error',
            }),
        );
    }

}