# Tickets

A solution to manage intake, workload, and fulfillment for engineering, customer service, and technology requests, issues, and work orders.

## Ticket Assignment Rules

Ticket assignment is handled by the Ticket TA BI AssignTicket flow - called by the Trigger Actions Framework. Bypass assignment rules for an individual record by setting the Override Assignment Rules checkbox to true.

When a new ticket is claimed or assigned from a queue, the status is automatically updated to ‘Assigned’.

## Close Behavior

### Close Ticket Record Page Action

Copied over https://quip.com/XEPAEAnwCEh’s close case screen flow. The user can select to have the Ticket Closed Notification email template sent to the Submitted By user.

### Date/Time Closed

If the Date/Time Closed is not defined before or at the time a ticket is closed, the Date/Time Closed will be set to the current date/time.

### Ticket Hierarchy Close Behavior

Ticket hierarchies up to three levels can be created by setting the Parent Ticket values on a set of tickets.

* When a parent ticket is closed, all open child tickets are automatically closed
* When all child tickets for a given parent ticket are closed, the parent ticket is automatically closed

## Trigger Actions Framework

Automation on the Ticket object leverages Mitch Spano’s Trigger Actions Framework. DML-triggered Apex and autolaunched flows are managed from sObject Trigger Settings custom metadata records.

Setup > Custom Metadata Types > sObject Trigger Settings > Manage

All automation can be bypassed at the object level, or at the level of the individual Apex class or flow. Set up an org-wide bypass, enable a bypass for only users with a particular custom permission, or enable a bypass for all users that do not have a particular custom permission. Can be helpful when data loading large volumes of records.

## Docs

- [Build Deck](https://quip.com/Rm6jAO2Jc2EL/Tickets-Build-Deck)
- [Trigger Actions Framework](https://github.com/mitchspano/apex-trigger-actions-framework)
