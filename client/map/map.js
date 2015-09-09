/* Display markers on an interactive map
 *
 * Expected data
 * markers: A cursor of geojson documents
 *
 * */

Template.map.onRendered(function() {
	var instance = this;

	var layers = {};
	var centers = {};

	L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

	map = L.map(instance.find('.map'), {}).setView(L.latLng(0,0), 1);
	L.tileLayer.provider('Thunderforest.Transport').addTo(map);

	var geojsonMarkerOptions = {
		radius: 8,
		fillColor: "#ff7800",
		color: "#000",
		weight: 1,
		opacity: 1,
		fillOpacity: 0.8
	};

	// Zoom to show all markers
	// This is debounc'd so it's only done after the last marker in a series is added
	var fitBounds = _.debounce(function() {
		var bounds = L.latLngBounds([]);
		var count = 0;
		for (layerPos in layers) {
			bounds.extend(layers[layerPos].getBounds());
			count += 1;
		}

		// To give some perspective, we include the center in the bounds when there are few markers
		if (count < 2) {
			for (centerPos in centers) { bounds.extend(centers[centerPos]); }
			count += 1;
		}
		if (bounds.isValid()) {
			// Have some padding
			bounds.pad(10);
			map.fitBounds(bounds);
		}
	}, 0);

	fitBounds();

	// Tracked so that observe() will be stopped when the template is destroyed
	Tracker.autorun(function() {
		instance.data.markers.observe({
			added: function(mark) {
				// Marks that have the center flage set are not displayed but used for anchoring the map
				if (mark.center) {
					centers[mark._id] = L.geoJson(mark).getBounds();
				} else {
					var marker = L.geoJson(mark, {
						pointToLayer: function(feature, latlng) {
							return L.circleMarker(latlng, geojsonMarkerOptions);
						}
					});
					layers[mark._id] = marker;
					marker.addTo(map);
				}
				fitBounds();
			},
			removed: function(mark) {
				if (markers[mark._id]) map.removeLayer(markers[mark._id]);
				delete markers[mark._id];
				delete centers[mark._id];
				fitBounds();
			}
		});
	});
});
