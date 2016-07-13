Template.kioskEvent.helpers({
	timePeriod: function() {
		return Template.instance().parentInstance().data.timePeriod;
	},

	isOngoing: function() {
		return Template.instance().parentInstance().data.timePeriod == "ongoing";
	},

	isUpcoming: function() {
		return Template.instance().parentInstance().data.timePeriod == "upcoming";
	}
});

Template.kioskEvent.rendered = function() {
	var kioskEventList = this.parentInstance();

	this.$('.kiosk-event-title').dotdotdot();

	if (kioskEventList.hasDescription) {
		this.$('.kiosk-event-description').dotdotdot();
	}
};

Template.kioskEventLocation.helpers({
	showLocation: function() {
		// The location is shown when we have a location name and the location is not used as a filter
		return this.location.name && !Router.current().params.query.location;
	}
});
