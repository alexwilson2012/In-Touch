
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
  var currentCoords = "Latitude=" + position.coords.latitude + "&Longitude=" + position.coords.longitude + "&email=" + params['email'];
  // document.getElementById('response').innerHTML = currentCoords;
  sendNotification(currentCoords);
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