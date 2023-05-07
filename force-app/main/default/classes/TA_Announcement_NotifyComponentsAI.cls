public with sharing class TA_Announcement_NotifyComponentsAI implements TriggerAction.AfterInsert {

    /**
     * Controlled by sObject Trigger Setting: Announcement
     * Notify announcement board components of a newly inserted announcement
     */
    
    public void afterInsert(
        List<Announcement__c> newList
    ) {
        AnnouncementNotificationService ans = new AnnouncementNotificationService();
        ans.notifyComponents(newList);
    }

}