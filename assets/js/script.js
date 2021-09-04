
//retrieve a reference to all the elements that will will need
var passwordText = document.getElementById("password");
var modal = document.getElementById("password-generation-modal");

var charCountText = document.getElementById("char-count-text");
var charCountSlider = document.getElementById("char-count-slider");

var lowercaseCheckbox = document.getElementById("lowercase-checkbox");
var uppercaseCheckbox = document.getElementById("uppercase-checkbox");
var numericCheckbox = document.getElementById("numeric-checkbox");
var specialCheckbox = document.getElementById("special-checkbox");

//bind the value of the charCountText to the charCountSlider
charCountText.addEventListener("change", function () {
  var valueAsInt = parseInt(charCountText.value);
  valueAsInt && valueAsInt > 7 && valueAsInt < 129
    ? (charCountText.value = charCountSlider.value = valueAsInt)
    : (charCountText.value = charCountSlider.value = 8);
});

//bind the value of the charCountSlider to the charCountText
charCountSlider.addEventListener("input", function () {
  charCountText.value = charCountSlider.value;
});

//Set the function that show the modal dialog if we click "Open password generator" button
document
  .getElementById("open-password-generation-modal")
  .addEventListener("click", function () {
    modal.style.display = "block";
  });

//Set the function that hide the modal dialog if we click the "x" in top right corner
document
  .getElementById("password-generation-close")
  .addEventListener("click", function () {
    modal.style.display = "none";
  });

//Set the function that hide the modal dialog if we click outside of it
window.addEventListener("mousedown", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

//Set the function that is being called when Clicking the "Generate Password" button in the modal dialog.
document
  .getElementById("generate-password")
  .addEventListener("click", function () {
    //get the value of the character count slider/input
    var valueAsInt = parseInt(charCountSlider.value);
    //verify that at least one type of character is checked
    var atLeastOneCheckbox =
      lowercaseCheckbox.checked ||
      uppercaseCheckbox.checked ||
      numericCheckbox.checked ||
      specialCheckbox.checked;

      //make sure that value is a valid integer (undefined is considered null or false) and that it is between to accepted range
    valueAsInt && valueAsInt > 7 && valueAsInt < 129
      ? atLeastOneCheckbox
      //generate the password and assign it to the password textbox
        ? (passwordText.value = generatePassword(charCountSlider.value)) &&
        //hide the modal dialog
          (modal.style.display = "none")
          //send an alert if none of the character types are selected
        : alert(
            "At least one type of characters has to be included to generate a password!"
          )
          //send an alert if the password format or lenght is wrong
      : alert(
          "The password length has to be between 8 and 128 characters long!"
        );
  });

// Write password to the #password input
function generatePassword(passwordLength) {
  //declare the character types
  var numbericChars = "0123456789";
  var uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  var specialChars = "! \"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  //combined the selected character types
  var allChars =
    (lowercaseCheckbox.checked ? lowercaseChars : "") +
    (uppercaseCheckbox.checked ? uppercaseChars : "") +
    (numericCheckbox.checked ? numbericChars : "") +
    (specialCheckbox.checked ? specialChars : "");

  //assuming that we want at least one character of each selected, assign one of each
  var randPasswordArray = [
    numericCheckbox.checked ? numbericChars : allChars,
    uppercaseCheckbox.checked ? uppercaseChars : allChars,
    lowercaseCheckbox.checked ? lowercaseChars : allChars,
    specialCheckbox.checked ? specialChars : allChars,
  ];

  //assign the combined character types for all other characters
  for (var i = 4; i < passwordLength; i++) {
    randPasswordArray.push(allChars);
  }

  //map a random character from every arrays into the final password and then shuffle the result and return it.
  return shuffleArray(
    randPasswordArray.map(function (x) {
      return x[Math.floor(Math.random() * x.length)];
    })
  ).join("");
}

//Shuffle the an array using the pseudo-random function
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
