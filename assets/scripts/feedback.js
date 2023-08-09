function sendFeedbackEmail(feedbackForm) {
  emailjs
    .send('service_f2y6hce', 'template_47mnlpf', {
      from_name: feedbackForm.name.value, //variables used in emailJS to populate email that will be sent
      from_email: feedbackForm.email.value, //variables used in emailJS to populate email that will be sent
      message: feedbackForm.feedback.value, //variables used in emailJS to populate email that will be sent
    })
    .then(
      function (response) {
        //When a status of 200 is achieved, the user will be notified
        alert('Your feedback was sent! Thank you!');
      },
      function (failed) {
        //If the email fails to send, the user will be notified
        alert('Your email was not sent');
      },
    );
  return false; //Used to ensure that the page does not refresh upon submission of email
}
