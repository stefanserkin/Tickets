public class AnnouncementNotificationService {

    public void notifyComponents(
        List<Announcement__c> lstAnnouncements
    ) {
        System.debug('::::::: entered AnnouncementNotificationService.notifyComponents');
        List<Announcement_Notification__e> lstNotifications = new List<Announcement_Notification__e>();
        String strDmlType = getDmlType();
        for (Announcement__c ann : lstAnnouncements) {
            System.debug('::::::: adding notification for announcement id ' + ann.Id);
            lstNotifications.add(
                new Announcement_Notification__e(
                    Record_Id__c = ann.Id,
                    DML_Type__c = strDmlType
                )
            );
        }
        System.debug('::::::: number of notifications to publish: ' + lstNotifications.size());
        EventBus.publish(lstNotifications);
    }
    
    private String getDmlType() {
        System.debug('::::::: entered AnnouncementNotificationService.getDmlType');
        String strDmlType = '';
        switch on Trigger.operationType {
            when BEFORE_INSERT, AFTER_INSERT {
                strDmlType = 'Insert';
            }
            when BEFORE_UPDATE, AFTER_UPDATE {
                strDmlType = 'Update';
            }
        }
        System.debug('::::::: dml type is ' + strDmlType);
        return strDmlType;
    }

}