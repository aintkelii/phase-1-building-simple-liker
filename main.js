// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener("DOMContentLoaded", () => {
  // Add click event listener to all empty hearts
  document.querySelectorAll(".like-glyph").forEach((heart) => {
    heart.addEventListener("click", handleLikeClick);
  });
});

function handleLikeClick(e) {
  const heart = e.target;

  if (heart.classList.contains("activated-heart")) {
    // If heart is already liked, unlike it
    heart.classList.remove("activated-heart");
    heart.textContent = "♡";
  } else {
    // If heart is not liked, attempt to like it
    mimicServerCall()
      .then(() => {
        // Success case
        heart.classList.add("activated-heart");
        heart.textContent = "♥";
      })
      .catch((error) => {
        // Error case
        const modal = document.getElementById("modal");
        modal.classList.remove("hidden");
        modal.querySelector("#modal-message").textContent = error;

        // Hide modal after 3 seconds
        setTimeout(() => {
          modal.classList.add("hidden");
        }, 3000);
      });
  }
}





//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
