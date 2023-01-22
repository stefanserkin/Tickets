public with sharing class TA_Ticket_TestFramework implements TriggerAction.BeforeUpdate {
    
    public void beforeUpdate(
        List<Ticket__c> newList, 
        List<Ticket__c> oldList
    ) {
        for (Ticket__c ticket : newList) {
            ticket.Resolution_Notes__c = 'The thing worked';
        }
    }
}