// ==UserScript==
// @name         Password Toggler - view input passwords
// @namespace    https://github.com/pckltr/password-toggler
// @version      1.2
// @description  Adds buttons to each input to show/hide passwords
// @author       pckltr
// @match        *://*/*
// ==/UserScript==

(function() {
    "use strict";

    // get all page inputs
    var passwordInputs,
        buttonRepeat = setInterval(addButtons, 100);

    /* hoisting */
    function addButtons() {
        passwordInputs = document.querySelectorAll('input[type=password]');
        if (passwordInputs.length === 0) {
            return;
        }
        // clear inverval
        clearInterval(buttonRepeat);
        document.body.classList.add('password-toggler-shown');

        // add buttons to each password input
        for (var b = 0; b < passwordInputs.length; b++) {
            var input = passwordInputs[b];
            var baseButton = document.createElement("div");
            var parent = input.parentElement;
            parent.classList.add("password-toggler-button-parent");
            baseButton.classList.add("password-toggler-button");
            baseButton.setAttribute("style", "height: " + (input.offsetHeight - 8) + "px; width: " + (input.offsetHeight - 8) + "px;");

            /* add show button */
            var showButton = baseButton.cloneNode(false);
            showButton.title = 'Show password';
            showButton.classList.add("password-toggler-show");
            showButton.addEventListener("click", togglePasswords, false);
            parent.appendChild(showButton);

            /* make hide button */
            var hideButton = baseButton.cloneNode(false);
            hideButton.title = 'Hide password';
            hideButton.classList.add("password-toggler-hide");
            hideButton.addEventListener("click", togglePasswords, false);
            parent.appendChild(hideButton);
        }
    }

    // toggle password inputs title, type and change button style
    function togglePasswords() {
        var target;
        if (document.body.classList.contains('password-toggler-shown')) {
            document.body.classList.remove('password-toggler-shown');
            target = 'text';
        } else {
            document.body.classList.add('password-toggler-shown');
            target = 'password';
        }

        for (var index = passwordInputs.length - 1; index >= 0; index--) {
            passwordInputs[index].type = target;
        }
    }

})();
