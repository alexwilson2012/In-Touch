
var preset_tolerance = 0.2; // as in ~0.2 mile radius
var preset_location;

var address_of_kid;
var send_second_parent = 0;

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
        preset_location = '';
        // Parent 1
        var phone_email = new String();
        var phone = object[0].attributes.phone;
        var carrier = object[0].attributes.carrier;
        // Parent 2
        var phone_email2 = new String();
        var phone2 = object[0].attributes.phone2;
        var carrier2 = object[0].attributes.carrier2;
        
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
        //Insert logic cases for carrier here
        // Parent 1
		  if (object[0].attributes.text_vs_email=="text_notification"){
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
			 }
		// Parent 2
		if (object[0].attributes.text_vs_email2=="text_notification"){
			 if(carrier2=="att"){phone_email2=phone2+"@txt.att.net";}
			 if(carrier2=="sprint"){phone_email2=phone2+"@messaging.sprintpcs.com";}
			 if(carrier2=="qwest"){phone_email2=phone2+"@qwestmp.com";}
			 if(carrier2=="tmobile"){phone_email2=phone2+"@tmomail.net";}
			 if(carrier2=="verizon"){phone_email2=phone2+"@vtext.com";}
			 if(carrier2=="virgin"){phone_email2=phone2+"@pm.sprint.com";}
			 if(carrier2=="nextel"){phone_email2=phone2+"@txt.att.net";}
			 if(carrier2=="alltel"){phone_email2=phone2+"@pm.sprint.com";}
			 if(carrier2=="metropcs"){phone_email2=phone2+"@txt.att.net";}
			 if(carrier2=="powertel"){phone_email2=phone2+"@pm.sprint.com";}
			 if(carrier2=="boost"){phone_email2=phone2+"@txt.att.net";}
			 if(carrier2=="suncom"){phone_email2=phone2+"@pm.sprint.com";}
			 if(carrier2=="tracfone"){phone_email2=phone2+"@txt.att.net";}
			 if(carrier2=="uscellular"){phone_email2=phone2+"@pm.sprint.com";}
			 }
        var currentCoords = "Latitude=" + position.coords.latitude + "&Longitude=" + position.coords.longitude + "&email=" + object[0].attributes.email+ "&name=" + object[0].attributes.child_name+"&parent_name="+object[0].attributes.parent_name+"&preset_location="+preset_location+ "&phone_email=" + phone_email;
        var currentCoords2 = "Latitude=" + position.coords.latitude + "&Longitude=" + position.coords.longitude + "&email=" + object[0].attributes.email2 + "&name=" + object[0].attributes.child_name+"&parent_name="+object[0].attributes.parent_name2+"&preset_location="+preset_location+ "&phone_email=" + phone_email2;
        // document.getElementById('response').innerHTML = currentCoords;
        sendDataToParse(object[0].attributes.text_vs_email,object[0].attributes.text_vs_email2,object[0].attributes.phone,object[0].attributes.phone2,object[0].attributes.carrier,object[0].attributes.carrier2,object[0].attributes.email,object[0].attributes.email2,position.coords.latitude,position.coords.longitude,object[0].attributes.child_name,currentCoords, currentCoords2);
		
    },
    error: function(object, error) {
        alert('error');
      // The object was not retrieved successfully.
      // error is a Parse.Error with an error code and description.
    }
  });
}

function sendDataToParse(emailVsText,emailVsText2,phone,phone2,carrier,carrier2,email,email2,latitude,longitude,name,currentCoords,currentCoords2)
{  
  Parse.initialize("jM32k6jnO3Eb6VyLvRwxHKUbyiOmsQADopEOQAnd", "PjdQCU7hyLwoJT1K2W3ziIkG2Y77P457SHzwso2J");
  var teen_checkin_obj = Parse.Object.extend("teen_checkin");
  var teen_db = new teen_checkin_obj();
  
  var phone_email = new String(); 
  
  teen_db.set("name", name); 
  //teen_db.set("emailId", email); 
  teen_db.set("text_vs_email",emailVsText);
  teen_db.set("phone", phone); 
  teen_db.set("carrier",carrier);
  teen_db.set("text_vs_email2",emailVsText2);
  teen_db.set("phone2", phone); 
  teen_db.set("carrier2",carrier);
  teen_db.set("latitude", latitude);
  teen_db.set("longitude", longitude);
  var d = new Date();
  teen_db.set("time", d.getTime())
  
  
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
     
     // teen_db.set("emailId", phone_email); 
     teen_db.set("emailId", email); 
     
  } else {
     teen_db.set("emailId", email); 
  }
  
  //Insert logic cases for carrier here
  if (emailVsText2=="text_notification"){
     if(carrier2=="att"){phone_email2=phone2+"@txt.att.net";}
     if(carrier2=="sprint"){phone_email2=phone2+"@messaging.sprintpcs.com";}
     if(carrier2=="qwest"){phone_email2=phone2+"@qwestmp.com";}
     if(carrier2=="tmobile"){phone_email2=phone2+"@tmomail.net";}
     if(carrier2=="verizon"){phone_email2=phone2+"@vtext.com";}
     if(carrier2=="virgin"){phone_email2=phone2+"@pm.sprint.com";}
     if(carrier2=="nextel"){phone_email2=phone2+"@txt.att.net";}
     if(carrier2=="alltel"){phone_email2=phone2+"@pm.sprint.com";}
     if(carrier2=="metropcs"){phone_email2=phone2+"@txt.att.net";}
     if(carrier2=="powertel"){phone_email2=phone2+"@pm.sprint.com";}
     if(carrier2=="boost"){phone_email2=phone2+"@txt.att.net";}
     if(carrier2=="suncom"){phone_email2=phone2+"@pm.sprint.com";}
     if(carrier2=="tracfone"){phone_email2=phone2+"@txt.att.net";}
     if(carrier2=="uscellular"){phone_email2=phone2+"@pm.sprint.com";}
     
     // teen_db.set("emailId", phone_email); 
     teen_db.set("emailId", email); 
     
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
            address_of_kid = results[0].formatted_address;
            currentCoords = currentCoords+"&address="+results[0].formatted_address+"&send_count=1";
            currentCoords2 = currentCoords2+"&address="+results[0].formatted_address+"&send_count=2";
            // If everything is successul, send email
            // alert(currentCoords)
            // alert(currentCoords2)

            sendNotification(currentCoords);
            sendNotification(currentCoords2);
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
            if(send_second_parent == 0)
            {
              if(preset_location == '')
              {
                document.getElementById("response").innerHTML = 'You are at '+address_of_kid;
              }
              else
              {
                document.getElementById("response").innerHTML = 'You are at '+preset_location;
              }
              send_second_parent = 1;
            }
            document.getElementById("response").innerHTML += xmlHttp.responseText;
        }
    }

    // POST COMMAND
    var message = coords;

    // xmlHttp.open("POST", 'sendnotification.php', true);
    xmlHttp.open("POST", 'http://ec2-54-242-115-65.compute-1.amazonaws.com/sendnotification.php', true);
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