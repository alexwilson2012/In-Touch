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

# Create message container - the correct MIME type is multipart/alternative.
msg = MIMEMultipart('alternative')
msg['Subject'] = "Welcome to inTouch"
msg['From'] = from_me
msg['To'] = to_you


# if sys.argv[5] == 'work' or sys.argv[5] == 'school' or sys.argv[5] == 'home':
text = ""
# else:
	# text = sys.argv[4]+" is at Latitude - "+latitude+" and Longitude "+longitude

html = """\
<!DOCTYPE html>
<html>
  <head>
    <title>inTouch</title>
    <link rel="stylesheet" type="text/css" href="css/email.css">
  </head>
  <body>
    <h3>Welcome to inTouch</h3>
    inTouch let's you stay connected with your family<br><br>
    As a parent, you can keep track of where your kids are from your "Parent Dashboard":<br>
    <a href='http://ec2-54-242-115-65.compute-1.amazonaws.com/index.html?unique_id="""+sys.argv[2]+"""' target='_blank'><input type='button' name='get_url' value='Parent Dashboard'/></a><br><br>
    Just send this link to your kids:<br>
    <a href='http://ec2-54-242-115-65.compute-1.amazonaws.com/sendmylocation.html?unique_id="""+sys.argv[2]+"""' target='_blank'>http://ec2-54-242-115-65.compute-1.amazonaws.com/sendmylocation.html?unique_id="""+sys.argv[2]+"""</a><br>

  --<br>
  inTouch
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