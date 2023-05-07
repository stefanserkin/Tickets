public with sharing class AnnouncementBoardController {

    @AuraEnabled(cacheable=true)
    public static List<Announcement__c> getAnnouncements(){
        try {
            return [
                SELECT Id, Name, Highlights__c, Details__c, Priority__c, Priority_End_Date_Time__c, 
                       (SELECT Id, Topic__c, Topic__r.Hex_Color__c FROM Topic_Tags__r)
                  FROM Announcement__c
                 ORDER BY Priority__c DESC, CreatedDate DESC
                 LIMIT 20
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

}