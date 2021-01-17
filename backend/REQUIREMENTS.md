# Recovery Password

**FR**  <!-- Functional Requirements -->

[ ] The user should be able to recovery his password by entering his email

[ ] The user should receive an email with password recovery instructions

[ ] The user should be able to reset their password

**NFR** <!-- Non-Functional Requirements - Technic/Libs -->

[ ] Use MailTrap to test in development mode

[ ] Use Amazon SES to send in production mode

[ ] The email sending function must take place in the background

**BR**  <!-- Business Rules -->

[ ] The link sent by email should expire in 2 hours

[ ] The user needs to confirm new password when resetting password


# Update Profile

**FR**  <!-- Functional Requirements -->

[ ] The user should able to update his name, email and password

**NFR** <!-- Non-Functional Requirements - Technic/Libs -->


**BR**  <!-- Business Rules -->

[ ] The user must not be able to update his email to an email already registered

[ ] The user needs to enter their old password to change their password

[ ] The user needs to confirm new password

# Appointments

**FR**  <!-- Functional Requirements -->

[ ] The user must be able to list all saved providers

[ ] The user must be able to list days of the month with at least one available time from a provider

[ ] The user must be able to list the available times on a specific day from a provider

[ ] The user must be able to make a new appointment with a provider

**NFR** <!-- Non-Functional Requirements - Technic/Libs -->

[ ] The list of providers must be cached

**BR**  <!-- Business Rules -->

[ ] Each appointment must last one hour

[ ] The appointments must be available between 8am and 6pm

[ ] The user should not be able to make an appointment at an unavailable time

[ ] The user should not be able to make an appointment at a time that has passed

[ ] The user should not be able to make an appointment with himself

# Dashboard Provider

**FR**  <!-- Functional Requirements -->

[ ] The providers must be able to list their appointment at the specific day

[ ] The provider must receive notification whenever a new appointment occurs

[ ] The provider must be able to see unread notifications

**NFR** <!-- Non-Functional Requirements - Technic/Libs -->

[ ] The appointments of the providers must be cached

[ ] The notifications must be saved in MongoDB

[ ] The notifications must be sent in real-time with socket.io

**BR**  <!-- Business Rules -->

[ ] The notification must have read and unread status in order for the provider to control
