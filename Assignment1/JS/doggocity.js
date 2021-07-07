
/* function myFunction() {
  var x = document.getElementById("btn");
  if (x.className === "btn") {
    x.className += " responsive";
  } else {
    x.className = "btn";
  }
} */

var input = document.getElementById("myInput");
input.addEventListener("keyup", function(event) {
  if (event === 13) {
   event.preventDefault();
   document.getElementById("myBtn").click();
  }
});


/* var button = document.querySelector('button');

button.addEventListener("click", function(){document.querySelector('p').style.display = 'demo'; }); */

/* button.addEventListener("click", myFunction)
var button = document.getElementById("myBtn").addEventListener("click", myFunction); */


/* function myFunction1() {
  let text;
  let person = prompt("Please enter your name:", "Harry Potter");
  if (person == null || person == "") {
    text = "User cancelled the prompt.";
  } else {
    text = "Hello " + person + "! How are you today?";
  }
  document.getElementById("demo").innerHTML = text;
}
 */