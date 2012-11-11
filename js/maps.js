window.onload = function() {   
Parse.initialize("jM32k6jnO3Eb6VyLvRwxHKUbyiOmsQADopEOQAnd", "PjdQCU7hyLwoJT1K2W3ziIkG2Y77P457SHzwso2J");


// Using a QUERY.GET() command to get a single entry from parse.com
// var TestObject = Parse.Object.extend("TestObject");
// var query = new Parse.Query(TestObject);
// query.get("Pjow95QwjZ", {
//   success: function(object) {
//     // The object was retrieved successfully.
//     document.getElementById('test').innerHTML = object.attributes.name + '<br>' + Object.keys(object.attributes);
//     // document.getElementById('test').innerHTML = Object.keys(object);
//   },
//   error: function(object, error) {
//     // The object was not retrieved successfully.
//     // error is a Parse.Error with an error code and description.
//     document.getElementById('test').innerHTML = 'FAIL';
//   }
// });

// Using QUERY.FIND() command to get multiple entries from a parse.com query
var TestObject = Parse.Object.extend("TestObject");
var query = new Parse.Query(TestObject);

// //Creating matrix of cooridinates and text
 mapsArray = new Array ();


//var mapsArray = new Array();
var i = 0;
query.equalTo("EmailID", "alexwilson2012@u.northwestern.edu");
query.find({
  success: function(object) {
    // The object was retrieved successfully.
    for (k = 0; k < object.length; ++k){
      mapsArray [k] = new Array (3);
    };
    for (var query_ii = 0; query_ii < object.length; query_ii++) {
    		mapsArray[query_ii][0] = object[query_ii].attributes.name;
    		mapsArray[query_ii][1] = object[query_ii].attributes.PlaceLatitude;
    		mapsArray[query_ii][2] = object[query_ii].attributes.Placelongitude;
    };
  },
  error: function(object, error) {
    // The object was not retrieved successfully.
    // error is a Parse.Error with an error code and description.
    alert('Could not retrieve previous locations.');
  }
});
  
}
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
		var pos = new google.maps.LatLng(mapsArray[i][1], mapsArray[i][2]);
		bounds.extend(pos);
		marker = new google.maps.Marker({
										position: pos,
										map: map
										});
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
														return function() {
														infowindow.setContent(mapsArraymarkers[i][0]);
														infowindow.open(map, marker);
														}
														})(marker, i));
	}
	map.fitBounds(bounds);
}