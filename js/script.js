/***Treehouse Techdegree
FSJS project 3 - Interactive Form***/

//Puts focus on "Name" field when page loads
$('#name').focus();

//Hides the 'Your Job Role' input text field
$('#other-title').hide();

//Event listener for the when Jobe Role option changes
$('#title').on('change', function () {

    //If 'Other' selected, show the 'Your Job Role' input field
    if ($(this).val() === 'other') {
        $('#other-title').show();

        //Keep input text field hidden if anything else selected
    } else {
        $('#other-title').hide();
    }

});

//T-Shirt Section

//Hides color option
$('#colors-js-puns').hide();

//Event listener for when Design option changes
$('#design').on('change', function (event) {
    console.log('design')

    //If 'js puns' selected, only show Cornflower Blue, Dark Slate Grey, Gold color option
    if ($(event.target).prop('value') === 'js puns') {
        console.log('js puns');
        $('#color').html(`<option value="cornflowerblue">Cornflower Blue (JS Puns shirt only)</option>
        <option value="darkslategrey">Dark Slate Grey (JS Puns shirt only)</option>
        <option value="gold">Gold (JS Puns shirt only)</option>`);
        $('#colors-js-puns').show();

        //If 'heart js' selected, only show Tomato, Steel Blue, Dim Grey color option
    } else if ($(event.target).prop('value') === 'heart js') {
        console.log('heart js');
        $('#color').html(`<option value="tomato">Tomato (I &#9829; JS shirt only)</option>
        <option value="steelblue">Steel Blue (I &#9829; JS shirt only)</option>
        <option value="dimgrey">Dim Grey (I &#9829; JS shirt only)</option>`);
        $('#colors-js-puns').show();

        //If 'js puns' selected hide 'heart js' color option
    } else {
        $('#colors-js-puns').hide();
    }
});

//Activity Section

//Global variable to store activity cost
let totalCost = 0;
//Adding label for total cost
$(".activities").append('<label id = "total"> Total Cost: $ </label>');

//Listening for checkbox to be selected
$('[type = "checkbox"]').change(() => {
    let totalCost = 0;

    //If and else statements initiates listening and the statues of change in the checked and unchecked boxes
    //Each checked triggers recalculation of total cost (+=) 

    if ($(`input[name="all"]`).prop("checked")) {
        totalCost += 200;
    }

    if ($(`input[name="build-tools"]`).prop("checked")) {
        totalCost += 100;
    }
    if ($(`input[name="npm"]`).prop("checked")) {
        totalCost += 100;
    }

    if ($(`input[name="js-frameworks"]`).prop("checked")) {
        $(`input[name="express"]`).attr("disabled", true);
        totalCost += 100;
    } else {
        $(`input[name="express"]`).removeAttr("disabled");
    }

    if ($(`input[name="express"]`).prop("checked")) {
        $(`input[name="js-frameworks"]`).attr("disabled", true);
        totalCost += 100;
    } else {
        $(`input[name="js-frameworks"]`).removeAttr("disabled");
    }

    if ($(`input[name="js-libs"]`).prop("checked")) {
        $(`input[name="node"]`).attr("disabled", true);
        totalCost += 100;
    } else {
        $(`input[name="node"]`).removeAttr("disabled");
    }

    if ($(`input[name="node"]`).prop("checked")) {
        $(`input[name="js-libs"]`).attr("disabled", true);
        totalCost += 100;
    } else {
        $(`input[name="js-libs"]`).removeAttr("disabled");
    }
    $('#total').html("<p><strong>Total: $" + totalCost + "</strong><p>")
    console.log(totalCost)
});


//Payment Section

//Classes were added to identify the correct siblings and elemensts in the html
$("#credit-card").siblings().eq(3).addClass("paypal");
$("#credit-card").siblings().eq(4).addClass("bitcoin");
$('select option[value="credit card"]').attr("selected", true);
$('select option[value="select_method"]').attr("disabled", true);
$('select option[value="select_method"]').hide;
$(".paypal").hide();
$(".bitcoin").hide();

//Event listener was created to listen for each section or event in the 'Payment Information' menu
$("#payment").on('change', function () {

    if ($(this).val() === "credit card") {
        $("#credit-card").show();
        $(".paypal").hide();
        $(".bitcoin").hide();

    } else if ($(this).val() === "paypal") {
        $("#credit-card").hide();
        $(".paypal").show();
        $(".bitcoin").hide();

    } else {
        $("#credit-card").hide();
        $(".paypal").hide();
        $(".bitcoin").show();
    }
});

//Form Validation and Validation Messages

//Hide error message if a valid name entered
function isValidUserName() {
    const valid = /^[a-zA-Z]/;
    if (valid.test($('#name').val())) {
        $("#name").prev().text("Name:").css("color", "black")
        return true;
        //Show error message if no valid name is entered
    } else {
        $("#name").prev().text("Name field must not be empty").css("color", "red")
        return false;
    }
}
//active when switching between text input fields
$('#name').on('focusout', (e) => {
    isValidUserName();
})

//Hide error message if a valid email entered
function isValidEmail() {
    const valid = /^[^@]+@[^@.]+\.[a-z]+$/;
    if (valid.test($('#mail').val())) {
        $("#mail").prev().text("Email:").css("color", "black")
        return true;
        //Show error message if no valid email is entered
    } else {
        $("#mail").prev().text("Please enter a valid email address").css("color", "red")
        return false;
    }
}
//active when switching between text input fields
$('#mail').on('focusout', (e) => {
    isValidEmail();
})

function isValidActivity() {

    if ($('input[type="checkbox"]').is(":checked")) {
        return true;
    }
    if ($('input[type="checkbox"]').is(":not(:checked)")) {
        $('.activities legend').text("Please choose at least one activity").css("color", "red")
        return false;
    }
}

$('input[type="checkbox"]:checked').on('change', (e) => {
    isValidActivity();
})

//Hide error message if a valid credit card number enters
function isValidCreditCard() {
    const valid = /^\d{13,16}$/;
    if (valid.test($('#cc-num').val())) {
        $("#cc-num").prev().text("Card Number:").css("color", "black")
        return true;
        //Show error message if no valid credit card is entered
    } else {
        $("#cc-num").prev().text("Enter a number that is between 13 and 16 digits").css("color", "red")
        return false;
    }
}
//active when switching between text input fields
$('#cc-num').on('focusout', (e) => {
    isValidCreditCard();
})

//Hide error message if a valid zip code entered
function isValidZipCode() {
    const valid = /^\d{5}$/;
    if (valid.test($('#zip').val())) {
        $("#zip").prev().text("Zip Code:").css("color", "black")
        return true;
        //Show error message if no valid zip code is entered
    } else {
        $("#zip").prev().text("Enter a 5 digit zip code").css("color", "red")
        return false;
    }
}
//active when switching between text input fields
$('#zip').on('focusout', (e) => {
    isValidZipCode();
})

//Hide error message if a valid cvv entered
function isValidCVV() {
    const valid = /^\d{3}$/;
    if (valid.test($('#cvv').val())) {
        $("#cvv").prev().text("CVV:").css("color", "black")
        return true;
        //Show error message if no valid cvv is entered
    } else {
        $("#cvv").prev().text("Enter a 3 digit cvv number").css("color", "red")
        return false;
    }
}
//Active when switching between text input fields
$('#cvv').on('focusout', (e) => {
    isValidCVV();
})

const isValid = () => {

    //If credit card payment is selected
    //Returns true if all forms are valid
    if ($('#payment').val() === 'credit card') {
        if (isValidActivity() && isValidUserName($('#name').val()) && isValidEmail($('#mail').val()) && isValidCreditCard($('#cc-num').val()) && isValidZipCode($('#zip').val()) && isValidCVV($('#cvv').val())) {
            return true;

            //returns false if any form is invalid
        } else {
            isValidActivity();
            isValidUserName($('#name').val());
            isValidEmail($('#mail').val());
            isValidCreditCard($('#cc-num').val());
            isValidZipCode($('#zip').val());
            isValidCVV($('#cvv').val());
            return false;
        }
        //If credit card not selected
        //Returns true if all other forms are valid
    } else {
        if (isValidActivity() && isValidUserName($('#name').val()) && isValidEmail($('#mail').val())) {
            return true;

            //Returns false if any other form is invalid
        } else {
            isValidActivity();
            isValidUserName($('#name').val());
            isValidEmail($('#mail').val());
            return false;
        }
    }
}
//Form will not submit unless all forms are valid
$('form').on('submit', (e) => {
    if (isValid() === true) {
        window.location.reload();
        //Submit button will not work if forms are not valid
    } else {
        e.preventDefault();
    }
});