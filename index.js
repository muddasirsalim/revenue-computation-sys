firebase.auth().onAuthStateChanged(function(user)
{
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      var email_verified = user.emailVerified;

      if(email_verified)
      {
        document.getElementById("verify_btn").style.display ="none";
          setTimeout(function()
        {
          console.log("redirect");
          window.location.href = "dashboard/index.html";
        }, 2000); 
      }
      else
      {
        document.getElementById("verify_btn").style.display ="block"
      }

      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id + "<br> Verified: " + email_verified;
      
    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});



function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function signUp(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function logout(){
  firebase.auth().signOut();
}


function sendVerification(){
  var user = firebase.auth().currentUser;

 user.sendEmailVerification().then(function() {
      window.alert("Email verification has been sent to your email address.");
    }).catch(function(error) {
      window.alert("Error" + error.message);
    });
}

function forgotPassword()
{
  var auth = firebase.auth();
  var userEmail = document.getElementById("email_field").value;

auth.sendPasswordResetEmail(userEmail).then(function() {
    window.alert("Password reset link is sent to your mail");
  }).catch(function(error) {
    window.alert("Error" + error.message);
  });
}