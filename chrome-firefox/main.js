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
        loadingDone = setInterval(init, 100);

    /* hoisting */
    function init() {
        if (document.readyState === 'loading') {
            return;
        }

        clearInterval(loadingDone);

        document.body.classList.add('password-toggler-shown');

        addButtons();
        var observer = new MutationObserver(handleMutations);
        observer.observe(document, {
            attributes: true,
            childList: true,
            subtree: true
        });
    }

    function handleMutations(mutations) {
        /* somehow fix the explosive complexity */
        addButtons();
    }

    function addButtons() {
        var target;
        passwordInputs = document.querySelectorAll('input[type=password]');

        if (document.body.classList.contains('password-toggler-shown')) {
            target = 'text';
        } else {
            target = 'password';
        }

        // add buttons to each password input
        for (var index = 0; index < passwordInputs.length; index++) {
            var input = passwordInputs[index];
            var parent = input.parentElement;
            var baseButton, showButton, hideButton;

            input.type = target;

            if (parent.classList.contains("password-toggler-button-parent")) {
                /* already handled, reposition? */
                showButton = parent.querySelectorAll('.password-toggler-show');
                hideButton = parent.querySelectorAll('.password-toggler-hide');
                if (showButton.length) {
                    showButton[0].setAttribute("style", "height: " + (input.offsetHeight - 8) + "px; width: " + (input.offsetHeight - 8) + "px;");
                }
                if (hideButton.length) {
                    hideButton[0].setAttribute("style", "height: " + (input.offsetHeight - 8) + "px; width: " + (input.offsetHeight - 8) + "px;");
                }
                continue;
            }
            parent.classList.add("password-toggler-button-parent");

            baseButton = document.createElement("div");
            baseButton.classList.add("password-toggler-button");
            baseButton.setAttribute("style", "height: " + (input.offsetHeight - 8) + "px; width: " + (input.offsetHeight - 8) + "px;");

            /* add show button */
            showButton = baseButton.cloneNode(false);
            showButton.title = 'Show password';
            showButton.classList.add("password-toggler-show");
            showButton.addEventListener("click", togglePasswords, false);
            parent.appendChild(showButton);

            /* make hide button */
            hideButton = baseButton.cloneNode(false);
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
