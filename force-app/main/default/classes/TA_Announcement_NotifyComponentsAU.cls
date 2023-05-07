public with sharing class TA_Announcement_NotifyComponentsAU implements TriggerAction.AfterUpdate {

    /**
     * Controlled by sObject Trigger Setting: Announcement
     * Notify announcement board components of an updated announcement
     */

    public void afterUpdate(
        List<Announcement__c> newList, 
        List<Announcement__c> oldList
    ) {
        AnnouncementNotificationService ans = new AnnouncementNotificationService();
        ans.notifyComponents(newList);
    }

}