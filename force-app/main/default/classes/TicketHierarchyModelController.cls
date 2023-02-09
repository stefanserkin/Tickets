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
                       Priority__c, 
                       Subject__c, 
                       Description__c, 
                       Submitted_By__c, 
                       Submitted_By__r.Name, 
                       Facility__c, 
                       Facility__r.Name, 
                       Location__c, 
                       Location__r.Name, 
                       RecordTypeId, 
                       RecordType.Name
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