
var preset_tolerance = 0.2; // as in ~0.2 mile radius

// Get the location of the user
function getLocation()
{
  document.getElementById('response').innerHTML = '...sending';
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(showPosition);
    }
  else{document.getElementById("response").innerHTML="Geolocation is not supported by this browser.";}
}

// Send coordinates to other user in email form
function showPosition(position)
{
  var params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(str,key,value) {
    params[key] = value;
  });


  Parse.initialize("jM32k6jnO3Eb6VyLvRwxHKUbyiOmsQADopEOQAnd", "PjdQCU7hyLwoJT1K2W3ziIkG2Y77P457SHzwso2J");

  // Using QUERY.FIND() command to get multiple entries from a parse.com query
  var user_login_obj = Parse.Object.extend("user_login");
  var query = new Parse.Query(user_login_obj);
  query.equalTo("unique_id", parseInt(params["unique_id"]));
  query.find({
    success: function(object) {
        var distance_to_home = inPresetLocation(position.coords.latitude,position.coords.longitude,object[0].attributes.home_lat,object[0].attributes.home_lng);
        var distance_to_work = inPresetLocation(position.coords.latitude,position.coords.longitude,object[0].attributes.work_lat,object[0].attributes.work_lng);
        var distance_to_school = inPresetLocation(position.coords.latitude,position.coords.longitude,object[0].attributes.school_lat,object[0].attributes.school_lng);
        var preset_location = '';
        if(distance_to_home <= preset_tolerance)
        {
            preset_location = 'home';
        }
        else if(distance_to_school <= preset_tolerance)
        {
            preset_location = 'school';
        }
        else if(distance_to_work <= preset_tolerance)
        {
            preset_location = 'work';
        }
        // document.getElementById('response').innerHTML = preset_location;
        var currentCoords = "Latitude=" + position.coords.latitude + "&Longitude=" + position.coords.longitude + "&email=" + object[0].attributes.email+ "&name=" + object[0].attributes.child_name+"&parent_name="+object[0].attributes.parent_name+"&preset_location="+preset_location+ "&phone_email=" + object[0].attributes.phone_email;
        // document.getElementById('response').innerHTML = currentCoords;
        sendDataToParse(object[0].attributes.text_vs_email,object[0].attributes.phone,object[0].attributes.carrier,object[0].attributes.email,position.coords.latitude,position.coords.longitude,object[0].attributes.child_name,currentCoords);
    },
    error: function(object, error) {
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and description.
    }
  });
}

function sendDataToParse(emailVsText,phone,carrier,email,latitude,longitude,name,currentCoords)
{  
  Parse.initialize("jM32k6jnO3Eb6VyLvRwxHKUbyiOmsQADopEOQAnd", "PjdQCU7hyLwoJT1K2W3ziIkG2Y77P457SHzwso2J");
  var teen_checkin_obj = Parse.Object.extend("teen_checkin");
  var teen_db = new teen_checkin_obj();
  var user_login_obj = Parse.Object.extend("user_login");
  var user_login_db = new user_login_obj();
  
  var phone_email = new String(); 
  
  teen_db.set("name", name); 
  //teen_db.set("emailId", email); 
  teen_db.set("text_vs_email",emailVsText);
  teen_db.set("phone", phone); 
  teen_db.set("carrier",carrier);
  teen_db.set("latitude", latitude);
  teen_db.set("longitude", longitude);
  
  
////Carrier emails
//  AT&T: number@txt.att.net
// 	Qwest: number@qwestmp.com
// 	T-Mobile: number@tmomail.net
// 	Verizon: number@vtext.com
// 	Sprint: number@messaging.sprintpcs.com or number@pm.sprint.com
// 	Virgin Mobile: number@vmobl.com
// 	Nextel: number@messaging.nextel.com
// 	Alltel: number@message.alltel.com
// 	Metro PCS: number@mymetropcs.com
// 	Powertel: number@ptel.com
// 	Boost Mobile: number@myboostmobile.com
// 	Suncom: number@tms.suncom.com
// 	Tracfone: number@mmst5.tracfone.com
// 	U.S. Cellular: number@email.uscc.net
///////////////////////////////////////
  
  
  //Insert logic cases for carrier here
  if (emailVsText=="text_notification"){
     if(carrier=="att"){phone_email=phone+"@txt.att.net";}
     if(carrier=="sprint"){phone_email=phone+"@messaging.sprintpcs.com";}
     if(carrier=="qwest"){phone_email=phone+"@qwestmp.com";}
     if(carrier=="tmobile"){phone_email=phone+"@tmomail.net";}
     if(carrier=="verizon"){phone_email=phone+"@vtext.com";}
     if(carrier=="virgin"){phone_email=phone+"@pm.sprint.com";}
     if(carrier=="nextel"){phone_email=phone+"@txt.att.net";}
     if(carrier=="alltel"){phone_email=phone+"@pm.sprint.com";}
     if(carrier=="metropcs"){phone_email=phone+"@txt.att.net";}
     if(carrier=="powertel"){phone_email=phone+"@pm.sprint.com";}
     if(carrier=="boost"){phone_email=phone+"@txt.att.net";}
     if(carrier=="suncom"){phone_email=phone+"@pm.sprint.com";}
     if(carrier=="tracfone"){phone_email=phone+"@txt.att.net";}
     if(carrier=="uscellular"){phone_email=phone+"@pm.sprint.com";}
     
     teen_db.set("emailId", phone_email); 
     user_login_obj.set("phone_email",phone_email);
  } else {
       teen_db.set("emailId", email); 
  }

  var geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(parseFloat(latitude),parseFloat(longitude));
  geocoder.geocode( { 'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
        teen_db.set("address", results[0].formatted_address);
        teen_db.save(null, {
        success: function(teen_db) {
            // If everything is successul, send email
            sendNotification(currentCoords);
        }
        });
    } 
  });
}

function inPresetLocation(current_lat,current_lng,location_lat,location_lng)
{
    // distance from current location to preset location in miles (assuming 69 miles/degree of latitude)
    var distance_to_location = Math.sqrt(Math.pow(Math.abs(location_lat - current_lat),2) + Math.pow(Math.abs(location_lng - current_lng),2))*69;
    return distance_to_location;
}

// Sets up the AJAX call to sendnotification.php, which will call the python script on the server
function sendNotification(coords)
{
    // Call the XMLHttp function
    var xmlHttp = getXMLHttp();

    xmlHttp.onreadystatechange = function()
    {
        if(xmlHttp.readyState == 4)
        {
            document.getElementById("response").innerHTML = xmlHttp.responseText;
        }
    }

    // POST COMMAND
    var message = coords;

    xmlHttp.open("POST", 'sendnotification.php', true);
    xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlHttp.setRequestHeader("Content-length","message.length");
    xmlHttp.setRequestHeader("Connection","close");
    xmlHttp.send(message);
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