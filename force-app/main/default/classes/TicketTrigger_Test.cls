/********************************************
 * All actions fired by TicketTrigger are flows. These tests
 * attempt only to make the ticket trigger fire successfully
 ********************************************/
@isTest
private class TicketTrigger_Test {

    private static Id engineeringRecordTypeId = Schema.SObjectType.Ticket__c.getRecordTypeInfosByDeveloperName().get('Engineering').getRecordTypeId();

    @isTest
    static void testTicketTriggerOnInsert() {
        Id engineeringRecordTypeId = Schema.SObjectType.Ticket__c.getRecordTypeInfosByDeveloperName().get('Engineering').getRecordTypeId();
        
        Ticket__c tik = getTicket();

        Test.startTest();
        Database.SaveResult sr = Database.insert(tik, false);
        Test.stopTest();

        System.assert(sr.isSuccess(), 'Ticket should have successfully saved');
    }

    @isTest
    static void testTicketTriggerBatch() {
        List<Ticket__c> lstTickets = new List<Ticket__c>();
        for (Integer i = 0; i < 201; i++) {
            lstTickets.add(
                getTicket()
            );
        }

        Test.startTest();
        List<Database.SaveResult> lstSRs = Database.insert(lstTickets, false);
        Test.stopTest();

        for (Database.SaveResult sr : lstSRs) {
            System.assert(sr.isSuccess(), 'Ticket should have successfully saved');
        }
    }

    private static Ticket__c getTicket() {
        Ticket__c tik = new Ticket__c();
        tik.Subject__c = 'Testing tickets';
        tik.Description__c = 'Good news folks. It works.';
        tik.Status__c = 'Assigned';
        tik.OwnerId = UserInfo.getUserId();
        tik.Priority__c = 'Low';
        tik.Type__c = 'General Inquiry';
        tik.RecordTypeId = engineeringRecordTypeId;
        return tik;
    }
    
}
