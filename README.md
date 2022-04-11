# smtp-server-features
Establish API routes to a contact form on the frontend.
Receive user data from these routes upon form submission.
Format a mailable JSON object with the data received.
Construct a transport function with Nodemailer in preparation for delivery.
Obtain authorization from Gmail using credentials stored in the server.
Call the transport function, prompting Nodemailer to handoff the email object to the Gmail SMTP Server for delivery.
Request confirmation of successful delivery and return an error message if not received.
