
var unique_id;

function addLoginToParse(form)
{
	var home_latlng_block = String(home_latlng).replace('(','').replace(')','').split(',');
	// document.body.innerHTML = form.parent_name.value;
	Parse.initialize("jM32k6jnO3Eb6VyLvRwxHKUbyiOmsQADopEOQAnd", "PjdQCU7hyLwoJT1K2W3ziIkG2Y77P457SHzwso2J");
	var user_login_obj = Parse.Object.extend("user_login");
	var login = new user_login_obj();
	unique_id = Math.floor(Math.random()*10000000000000);
	login.set("unique_id", unique_id);
	login.set("parent_name", form.parent_name.value);
	login.set("child_name", form.child_name.value);
	login.set("email", form.email.value); 
	login.set("home_lat", home_latlng_block[0]);
	login.set("home_lng", home_latlng_block[1]);
	// login.set("address", results[0].formatted_address);
	login.save(null, {
		success: function(login) {
			//var url_return_string = "<br>Your Dashboard (bookmark this):<br><a href='http://ec2-54-242-115-65.compute-1.amazonaws.com/index.html?unique_id="+unique_id+"' target='_blank'>\
			//http://ec2-54-242-115-65.compute-1.amazonaws.com/index.html?unique_id="+unique_id+"</a><br>";
			//url_return_string = url_return_string + "<br>Give this link to your teen (for check-in):<br><a href='http://ec2-54-242-115-65.compute-1.amazonaws.com/sendmylocation.html?unique_id="+unique_id+"' target='_blank'>\
			//http://ec2-54-242-115-65.compute-1.amazonaws.com/sendmylocation.html?unique_id="+unique_id+"</a><br>";
			
			var url_return_string = "<input type='button' name='get_url' class='btn btn-primary btn-large' style='width:100%;' value='Your Dashboard' onclick='window.open('http://ec2-54-242-115-65.compute-1.amazonaws.com/index.html?unique_id="+unique_id+"');'/><br>";
			
			url_return_string = url_return_string +"<input type='button' name='get_url' class='btn btn-warning btn-large' style='width:100%;' value='Give this link to your teen' onclick='window.open('http://ec2-54-242-115-65.compute-1.amazonaws.com/sendmylocation.html?unique_id="+unique_id+"');'/><br>";
			
			// url_return_string = url_return_string + "<br>Worried you might forget?<br><input type='button' onclick='emailURL()' value='Send links to your email'/>"
			document.getElementById('url_results').innerHTML = url_return_string;
		}
	});
} 


// global "map" variable
var map = null;
var marker = null;
var home_latlng;

var infowindow = new google.maps.InfoWindow(
  { 
    size: new google.maps.Size(150,50)
  });

// A function to create the marker and set up the event window function 
function createMarker(latlng, name, html) {
    var contentString = html;
    var marker = new google.maps.Marker({
        position: latlng,
        map: map,
        zIndex: Math.round(latlng.lat()*-100000)<<5
        });

    google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent(contentString); 
        infowindow.open(map,marker);
        });
    google.maps.event.trigger(marker, 'click');    
    return marker;
}

function initialize()
{
	// Get current position of user so they can locate their home
	if (navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(showPosition);
	}
}

function showPosition(position) {
  // create the map using the users current location
  var myOptions = {
    zoom: 15,
    center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
    mapTypeControl: true,
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
    navigationControl: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  }
  map = new google.maps.Map(document.getElementById("map_canvas"),
                                myOptions);
 
  google.maps.event.addListener(map, 'click', function() {
        infowindow.close();
        });

  google.maps.event.addListener(map, 'click', function(event) {
	//call function to create marker
         if (marker) {
            marker.setMap(null);
            marker = null;
         }

  //  var geocoder = new google.maps.Geocoder();
  // var latlng = new google.maps.LatLng(parseFloat(latitude),parseFloat(longitude));
  // geocoder.geocode( { 'latLng': latlng}, function(results, status) {
  //   if (status == google.maps.GeocoderStatus.OK) {
  //     teen_db.set("address", results[0].formatted_address);
	 marker = createMarker(event.latLng, "name", "<b>Home</b><br>"+event.latLng);
	 home_latlng = event.latLng;
	// }});

  });

}