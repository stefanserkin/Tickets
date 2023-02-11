public with sharing class TicketHierarchyModelController {

    @AuraEnabled(cacheable=true)
    public static List<Ticket__c> getTicketsInHierarchy(
        String ultimateParentId
    ) {
        try {
            return [
                SELECT Id, 
                       Name, 
                       Parent_Ticket__c, 
                       Ultimate_Parent_ID__c, 
                       OwnerId, 
                       Owner.Name, 
                       Status__c, 
                       Subject__c, 
                       Date_Time_Opened__c
                  FROM Ticket__c
                 WHERE Ultimate_Parent_ID__c = :ultimateParentId
                 ORDER BY Name ASC
                 LIMIT 10000
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    
}