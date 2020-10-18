function sendFeedbackEmail(feedbackForm) {
    emailjs.send("gmail", "MS2", {
        "from_name": feedbackForm.name.value,
        "from_email": feedbackForm.email.value,
        "memory_game_feedback": feedbackForm.feedback.value
    })
    .then(
        function(response) {
            console.log("Your email was sent!", response);
        },
        function(failed) {
            console.log("Your email was not sent :(", failed);
        });
        return false;
}