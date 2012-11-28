
var unique_id;
var parent_email;

function addLoginToParse(form)
{
	
	var home_latlng_block = String(home_latlng).replace('(','').replace(')','').split(',');

	Parse.initialize("jM32k6jnO3Eb6VyLvRwxHKUbyiOmsQADopEOQAnd", "PjdQCU7hyLwoJT1K2W3ziIkG2Y77P457SHzwso2J");
	var user_login_obj = Parse.Object.extend("user_login");
	var login = new user_login_obj();
	unique_id = Math.floor(Math.random()*10000000000000);
	login.set("unique_id", unique_id);
	login.set("parent_name", form.parent_name.value);
	login.set("child_name", form.child_name.value);
	login.set("email", form.email.value); 
  parent_email = form.email.value;
	login.set("phone", form.phone.value); 
	login.set("text_vs_email", form.text_vs_email.value); 
	login.set("carrier", form.carrier.value); 

  // Store the Home, Work, and School address presets, and aquire their latitude and longitude
  // Since this is a call to googles api it requires a recursive call...sorry its messy
  var latlng_home;
  var latlng_work;
  var latlng_school;
  var address_home = form.address_home.value;
  var address_work = form.address_work.value;
  var address_school = form.address_school.value;
  if(address_school == '')
  {
    address_school = '1';
  }
  else if(address_work == '')
  {
    address_work = '1';
  }
  else if(address_home == '')
  {
    address_home = '1';
  }

  // Initialize the geocoder
  geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address_work}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      // Save the work latitude and longitude
      latlng_work = String(results[0].geometry.location).replace('(','').replace(')','').split(',');
      geocoder.geocode( { 'address': address_home}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        // Save the home latitude and longitude
        latlng_home = String(results[0].geometry.location).replace('(','').replace(')','').split(',');
        geocoder.geocode( { 'address': address_school}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          // Save the school latitude and longitude
          latlng_school = String(results[0].geometry.location).replace('(','').replace(')','').split(',');

            // Assign addresses and latitude/longitude coordinates to parse
            login.set("home_address", address_home);
            login.set("school_address", address_school);
            login.set("work_address", address_work);
            login.set("home_lat", latlng_home[0]);
            login.set("home_lng", latlng_home[1]);
            login.set("work_lat", latlng_work[0]);
            login.set("work_lng", latlng_work[1]);
            login.set("school_lat", latlng_school[0]);
            login.set("school_lng", latlng_school[1]);

            // Save all variables to pares.com
            login.save(null, {
              success: function(login) {
                printUniqueURL(unique_id);
              }
            });
            } else {

              // Assign addresses and latitude/longitude coordinates to parse
            login.set("home_address", address_home);
            login.set("work_address", address_work);
            login.set("home_lat", latlng_home[0]);
            login.set("home_lng", latlng_home[1]);
            login.set("work_lat", latlng_work[0]);
            login.set("work_lng", latlng_work[1]);

                login.save(null, {
                  success: function(login) {
                    printUniqueURL(unique_id);
                  }
                });
                return status;
            }
          });
        } else {

            // Assign addresses and latitude/longitude coordinates to parse
            login.set("work_address", address_work);
            login.set("work_lat", latlng_work[0]);
            login.set("work_lng", latlng_work[1]);
            login.save(null, {
              success: function(login) {
                printUniqueURL(unique_id);
              }
            });
            return status;
        }
      });
    } else {
      // Assign addresses and latitude/longitude coordinates to parse
            login.set("work_address", address_work);
        login.save(null, {
          success: function(login) {
            printUniqueURL(unique_id);
          }
        });
        return status;
    }
  });
        //var url_return_string = "<br>Your Dashboard (bookmark this):<br><a href='http://ec2-54-242-115-65.compute-1.amazonaws.com/index.html?unique_id="+unique_id+"' target='_blank'>\
      //http://ec2-54-242-115-65.compute-1.amazonaws.com/index.html?unique_id="+unique_id+"</a><br>";
      //url_return_string = url_return_string + "<br>Give this link to your teen (for check-in):<br><a href='http://ec2-54-242-115-65.compute-1.amazonaws.com/sendmylocation.html?unique_id="+unique_id+"' target='_blank'>\
      //http://ec2-54-242-115-65.compute-1.amazonaws.com/sendmylocation.html?unique_id="+unique_id+"</a><br>";
} 

function printUniqueURL(unique_id)
{
  // Print unique links for parent and teenager
  var url_return_string = "<a href='index.html?unique_id="+unique_id+"' target='_blank'><input type='button' name='get_url' class='btn btn-primary btn-large' style='width:100%;' value='Your Dashboard'/></a><br>";
  url_return_string = url_return_string +"<a href='sendmylocation.html?unique_id="+unique_id+"' target='_blank'><input type='button' name='get_url' class='btn btn-warning btn-large' style='width:100%;' value='Give this link to your teen' /></a><br>";
  // CALL FUNCTION TO EMAIL LINKS TO PARENT HERE
  // url_return_string = url_return_string + "<br>Worried you might forget?<br><input type='button' onclick='emailURL()' value='Send links to your email'/>"
  document.getElementById('url_results').innerHTML = url_return_string;
  // document.getElementById("test").innerHTML = 'hi';
  emailUniqueId(unique_id);
}

function emailUniqueId(unique_id)
{
  // Call the XMLHttp function
  var xmlHttp = getXMLHttp();

  xmlHttp.onreadystatechange = function()
  {
      if(xmlHttp.readyState == 4)
      {
          document.getElementById("test").innerHTML = xmlHttp.responseText;
      }
  }

  // POST COMMAND
  var message = 'unique_id=' + unique_id + '&parent_email=' + parent_email;

  xmlHttp.open("POST", 'send_unique_id_email.php', true);
  xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
  xmlHttp.setRequestHeader("Content-length","message.length");
  xmlHttp.setRequestHeader("Connection","close");
  xmlHttp.send(message);

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

var geocoder;

function codeAddress(address) {
    var latlng_address;
    geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            latlng_address = String(results[0].geometry.location).replace('(','').replace(')','').split(',');
            return latlng_address;
        } else {
            return status;
        }
    });
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


// Setup a request function FOR USE WITH ALL AJAX REQUESTS
function getXMLHttp()
{
  var xmlHttp
  try
  {
    //Firefox, Opera 8.0+, Safari
    xmlHttp = new XMLHttpRequest();
  }
  catch(e)
  {
    //Internet Explorer
    try
    {
      xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
    }
    catch(e)
    {
      try
      {
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      catch(e)
      {
        alert("Your browser does not support AJAX!")
        return false;
      }
    }
  }
  return xmlHttp;
}