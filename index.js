$(document).ready(function () {
    var counter = 0;

    $("#addrow").on("click", function () {
        var newRow = $("<tr>");
        var cols = "";

        cols += '<td><input type="text" class="form-control" name="plate' + counter + '"/></td>';
        cols += '<td><input type="text" class="form-control" name="type' + counter + '"/></td>';
        cols += '<td><input type="text" class="form-control" name="tax' + counter + '"/></td>';
        newRow.append(cols);
        $("table.order-list").append(newRow);
        counter++;
    });



    $("table.order-list").on("click", ".ibtnDel", function (event) {
        $(this).closest("tr").remove();       
        counter -= 1
    });


});


function writeData()
{
    firebase.database().ref("User").push({
        plate: document.getElementById("plate").value,
        type: document.getElementById("type").value,
        tax: document.getElementById("tax").value
    });

    getData();

}

function getData()
{
     firebase.database().ref("/").once('value', function(snapshot)
     {
        snapshot.forEach(function(childSnapshot)
        {
            var childKey = childSnapshot.key;
            var childData = childSnapshot.val();
            document.getElementById("data").innerHTML = childData['plate'] + "," + childData['type'] + "," + childData['tax']
        })

     })
}
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