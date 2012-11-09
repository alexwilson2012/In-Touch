<script src='getLatLong.php'>
var markers = [
                           ['Today @ 11:15AM', 42.0514992, -87.6812264],
                           ['Today @ 11:00AM', 42.0524992, -87.6892964],
                           ['Today @ 10:00AM', 42.0563992, -87.6862764],
                           ['Last Night @ 8:10PM', 42.0544992, -87.6864464],
                           ['Last Night @ 6:30PM', 42.0565992, -87.6863464]
                ];
            
function initializeMaps() {
	var myOptions = {
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		mapTypeControl: false
	};
	var map = new google.maps.Map(document.getElementById("map_canvas"),myOptions);
	var infowindow = new google.maps.InfoWindow();
	var marker, i;
	var bounds = new google.maps.LatLngBounds();
	
	for (i = 0; i < markers.length; i++) {
		var pos = new google.maps.LatLng(markers[i][1], markers[i][2]);
		bounds.extend(pos);
		marker = new google.maps.Marker({
										position: pos,
										map: map
										});
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
														return function() {
														infowindow.setContent(markers[i][0]);
														infowindow.open(map, marker);
														}
														})(marker, i));
	}
	map.fitBounds(bounds);
}