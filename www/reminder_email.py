#!/usr/bin/python
print "Content-type: text/html"
print

# Allows us to use parameters if run through web
import cgi
form = cgi.FieldStorage()

# Allows us to pass parameters as arguments
import sys

# enable debugging
import cgitb
cgitb.enable()

# Allows us to use SMTP
import smtplib  


# FORMAT HTML EMAIL
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
  
# Email from and to set here, sys.argv[1] is the TO EMAIL ADDRESS
from_me = 'inTouch inTouch394@gmail.com'
to_you  = sys.argv[1]

# Latitude and Longitude are passed in as arguments
latitude = sys.argv[2]
longitude = sys.argv[3]

# Create message container - the correct MIME type is multipart/alternative.
msg = MIMEMultipart('alternative')
msg['Subject'] = sys.argv[4]+" just checked in"
msg['From'] = from_me
msg['To'] = to_you

# Create the body of the message (a plain-text and an HTML version).
text = sys.argv[4]+" is at Latitude - "+latitude+" and Longitude "+longitude
html = """\
<!DOCTYPE html>
<html>
    <head>
        <title>inTouch</title>
        <!-- Styles -->
        <link href="/css/reset.css" rel="stylesheet">
        <link href="/css/styles.css" rel="stylesheet">
    </head>
    
    <body onLoad="initializeMaps()">
        <h1>inTouch</h1>
<img src='http://www.google.com/staticmap?center="""+latitude+","+longitude+"&markers="+latitude+","+longitude+""",red&zoom=14&size=450x250'>
    </body>
</html>
"""

# Record the MIME types of both parts - text/plain and text/html.
part1 = MIMEText(text, 'plain')
part2 = MIMEText(html, 'html')

# Attach parts into message container.
# According to RFC 2046, the last part of a multipart message, in this case
# the HTML message, is best and preferred.
msg.attach(part1)
msg.attach(part2)
  
  
# Send email from our new TakeControl GMAIL account
username = 'intouch394@gmail.com'  
password = 'eecs394!'
  
# The actual mail send  
server = smtplib.SMTP('smtp.gmail.com:587')  
server.starttls()  
server.login(username,password)  
server.sendmail(from_me, to_you, msg.as_string())  
server.quit()