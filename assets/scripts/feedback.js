function sendFeedbackEmail(feedbackForm) {
    emailjs.send("gmail", "MS2", {
        "from_name": feedbackForm.name.value,                   //variables used in emailJS to populate email that will be sent
        "from_email": feedbackForm.email.value,                 //variables used in emailJS to populate email that will be sent
        "memory_game_feedback": feedbackForm.feedback.value     //variables used in emailJS to populate email that will be sent
    })
    .then(
        function(response) {                                    //When a status of 200 is achieved, the console will log the 
            console.log("Your email was sent!", response);      //success message and an alert box will notify the user of
            alert("Your feedback was sent! Thank you!");        //the email being sent
        },
        function(failed) {                                      //If the email fails to send, the user will be notified
            console.log("Your email was not sent :(", failed);
            alert("Your email was not sent");
        });
        return false;                                           //Used to ensure that the page does not refresh upon submission of email
}