import '/imports/Notification.js';

// Watch the Log for event notifications
Meteor.startup(function() {
	SSR.compileTemplate('notificationEventMail', Assets.getText('mails/notificationEventMail.html'));

	// To avoid sending stale notifications, only consider records added in the
	// last hours. This way, if the server should have failed for a longer time,
	// no notifications will go out.
	var gracePeriod = new Date();
	gracePeriod.setHours(gracePeriod.getHours() - 12);

	// The Log is append-only so we only watch for additions
	Log.find({ tr: 'Notification.Event', ts: { $gte: gracePeriod } }).observe({
		added: Notification.Event.handler
	});
});