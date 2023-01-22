import { LightningElement, api } from 'lwc';

export default class RecordTypeFilteredPicklist extends LightningElement {

    /****************************
     * Required Attributes
     ****************************/

    // {String} API Name of the object
    @api objectName;
    // {String} API Name of the picklist field
    @api fieldName;
    // {String} Id of the record type to filter on
    @api recordTypeId;

    /****************************
     * Optional Attributes
     ****************************/

    // {Boolean} Whether or not the input is required
    @api isRequired;
    // {String} Error message non selected
    @api errorMessage;

    /****************************
     * Output
     ****************************/
    
    // {String} API value of selected picklist value (not the label, but the value)
    @api fieldValue;

    /****************************
     * Validation
     * Ensure required fields have been completed on next action
     ****************************/

    @api validate() {
        if (
            !this.isRequired || 
            (this.isRequired && this.fieldValue && this.fieldValue.length > 0) 
        ) {
            return { isValid: true };
        } else {
            return {
                isValid: false,
                errorMessage: this.errorMessage
             };
         }
    }

    /****************************
     * Handle changes
     ****************************/

    handleFieldChange(event) {
        this.fieldValue = event.target.value;
    }

}