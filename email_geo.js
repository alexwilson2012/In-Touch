
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
  var currentCoords = "Latitude=" + position.coords.latitude + "&Longitude=" + position.coords.longitude + "&email=" + params['email']+ "&name=" + params['name'];
  // document.getElementById('response').innerHTML = currentCoords;
  sendDataToParse(params['email'],position.coords.latitude,position.coords.longitude,params['name'],currentCoords);
}

function sendDataToParse(email,latitude,longitude,name,currentCoords)
{  
  Parse.initialize("jM32k6jnO3Eb6VyLvRwxHKUbyiOmsQADopEOQAnd", "PjdQCU7hyLwoJT1K2W3ziIkG2Y77P457SHzwso2J");
  var teen_checkin_obj = Parse.Object.extend("teen_checkin");
  var teen_db = new teen_checkin_obj();
  teen_db.set("name", name); 
  teen_db.set("emailId", email); 
  teen_db.set("latitude", latitude);
  teen_db.set("longitude", longitude);

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