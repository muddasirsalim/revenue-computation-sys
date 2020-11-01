firebase.auth().onAuthStateChanged(function(user)
{
if (user) {
      var user = firebase.auth().currentUser;
      var email_id = user.email;
      document.getElementById("userEmail").innerHTML = email_id;

}});

function signOut(){
  firebase.auth().signOut();
  setTimeout(function()
      {
        console.log("redirect");
        window.location.href = "../index.html";
      }, 1000); 
      
}



