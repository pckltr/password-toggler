// ==UserScript==
// @name         Password Toggler - view input passwords
// @namespace    https://github.com/pckltr/password-toggler
// @version      1.2
// @description  Adds button to show/hide password in input elements
// @author       pckltr
// @match        *://*/*
// ==/UserScript==

(function() {
    "use strict";

    // get all page inputs
    var pageInputs = document.getElementsByTagName("input"),
        passwordInputs = [],
        buttonStyle = ".password-toggler-button-parent {position: relative; overflow: visible;} .password-toggler-button {top: 50%; right: 8px; position: absolute; width: auto; cursor: pointer; transform: translateY(-50%); background-size: cover; z-index: 9999999; background: #dcdcdc; border-radius: 100%; background-repeat: no-repeat; background-position: center center; box-sizing: border-box;} .password-toggler-hide {background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDMyIDMyIj4KPHBhdGggZmlsbD0iIzc1NzU3NSIgZD0iTTE2IDZjLTYuOTc5IDAtMTMuMDI4IDQuMDY0LTE2IDEwIDIuOTcyIDUuOTM2IDkuMDIxIDEwIDE2IDEwczEzLjAyNy00LjA2NCAxNi0xMGMtMi45NzItNS45MzYtOS4wMjEtMTAtMTYtMTB6TTIzLjg4OSAxMS4zMDNjMS44OCAxLjE5OSAzLjQ3MyAyLjgwNSA0LjY3IDQuNjk3LTEuMTk3IDEuODkxLTIuNzkgMy40OTgtNC42NyA0LjY5Ny0yLjM2MiAxLjUwNy01LjA5MCAyLjMwMy03Ljg4OSAyLjMwM3MtNS41MjctMC43OTYtNy44ODktMi4zMDNjLTEuODgtMS4xOTktMy40NzMtMi44MDUtNC42Ny00LjY5NyAxLjE5Ny0xLjg5MSAyLjc5LTMuNDk4IDQuNjctNC42OTcgMC4xMjItMC4wNzggMC4yNDYtMC4xNTQgMC4zNzEtMC4yMjgtMC4zMTEgMC44NTQtMC40ODIgMS43NzYtMC40ODIgMi43MzcgMCA0LjQxOCAzLjU4MiA4IDggOHM4LTMuNTgyIDgtOGMwLTAuOTYyLTAuMTctMS44ODMtMC40ODItMi43MzcgMC4xMjQgMC4wNzQgMC4yNDggMC4xNSAwLjM3MSAwLjIyOHYwek0xNiAxM2MwIDEuNjU3LTEuMzQzIDMtMyAzcy0zLTEuMzQzLTMtMyAxLjM0My0zIDMtMyAzIDEuMzQzIDMgM3oiPjwvcGF0aD4KPC9zdmc+Cg==);} .password-toggler-show {background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0ZWQgYnkgSWNvTW9vbi5pbyAtLT4KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDMyIDMyIj4KPHBhdGggZmlsbD0iIzc1NzU3NSIgZD0iTTI5LjU2MSAwLjQzOWMtMC41ODYtMC41ODYtMS41MzUtMC41ODYtMi4xMjEgMGwtNi4zMTggNi4zMThjLTEuNjIzLTAuNDkyLTMuMzQyLTAuNzU3LTUuMTIyLTAuNzU3LTYuOTc5IDAtMTMuMDI4IDQuMDY0LTE2IDEwIDEuMjg1IDIuNTY2IDMuMTQ1IDQuNzgyIDUuNDA3IDYuNDcybC00Ljk2OCA0Ljk2OGMtMC41ODYgMC41ODYtMC41ODYgMS41MzUgMCAyLjEyMSAwLjI5MyAwLjI5MyAwLjY3NyAwLjQzOSAxLjA2MSAwLjQzOXMwLjc2OC0wLjE0NiAxLjA2MS0wLjQzOWwyNy0yN2MwLjU4Ni0wLjU4NiAwLjU4Ni0xLjUzNiAwLTIuMTIxek0xMyAxMGMxLjMyIDAgMi40NCAwLjg1MyAyLjg0MSAyLjAzN2wtMy44MDQgMy44MDRjLTEuMTg0LTAuNDAxLTIuMDM3LTEuNTIxLTIuMDM3LTIuODQxIDAtMS42NTcgMS4zNDMtMyAzLTN6TTMuNDQxIDE2YzEuMTk3LTEuODkxIDIuNzktMy40OTggNC42Ny00LjY5NyAwLjEyMi0wLjA3OCAwLjI0Ni0wLjE1NCAwLjM3MS0wLjIyOC0wLjMxMSAwLjg1NC0wLjQ4MiAxLjc3Ni0wLjQ4MiAyLjczNyAwIDEuNzE1IDAuNTQgMy4zMDQgMS40NTkgNC42MDdsLTEuOTA0IDEuOTA0Yy0xLjYzOS0xLjE1MS0zLjAzOC0yLjYyMS00LjExNC00LjMyM3oiPjwvcGF0aD4KPHBhdGggZmlsbD0iIzc1NzU3NSIgZD0iTTI0IDEzLjgxM2MwLTAuODQ5LTAuMTMzLTEuNjY3LTAuMzc4LTIuNDM0bC0xMC4wNTYgMTAuMDU2YzAuNzY4IDAuMjQ1IDEuNTg2IDAuMzc4IDIuNDM1IDAuMzc4IDQuNDE4IDAgOC0zLjU4MiA4LTh6Ij48L3BhdGg+CjxwYXRoIGZpbGw9IiM3NTc1NzUiIGQ9Ik0yNS45MzggOS4wNjJsLTIuMTY4IDIuMTY4YzAuMDQwIDAuMDI1IDAuMDc5IDAuMDQ5IDAuMTE4IDAuMDc0IDEuODggMS4xOTkgMy40NzMgMi44MDUgNC42NyA0LjY5Ny0xLjE5NyAxLjg5MS0yLjc5IDMuNDk4LTQuNjcgNC42OTctMi4zNjIgMS41MDctNS4wOTAgMi4zMDMtNy44ODkgMi4zMDMtMS4yMDggMC0yLjQwMy0wLjE0OS0zLjU2MS0wLjQzOWwtMi40MDMgMi40MDNjMS44NjYgMC42NzEgMy44NzMgMS4wMzYgNS45NjQgMS4wMzYgNi45NzggMCAxMy4wMjctNC4wNjQgMTYtMTAtMS40MDctMi44MS0zLjUwNC01LjItNi4wNjItNi45Mzh6Ij48L3BhdGg+Cjwvc3ZnPgo=);}";

    // add style element in DOM
    var style = document.createElement("style");
    style.innerHTML = buttonStyle;
    document.head.appendChild(style);

    var addButtons = function() {

        // add password inputs into an array
        for (var a = 0; a < pageInputs.length; a++) {
            if (pageInputs[a].hasAttribute("type") && pageInputs[a].getAttribute("type") === "password") {
                passwordInputs.push(pageInputs[a]);
            }
        }

        // add buttons to each password input
        for (var b = 0; b < passwordInputs.length; b++) {
            var button = document.createElement("div");
            passwordInputs[b].parentElement.className += " password-toggler-button-parent";
            passwordInputs[b].parentElement.appendChild(button);
            button.setAttribute("style", "height: " + (passwordInputs[b].offsetHeight-8) + "px; width: " + (passwordInputs[b].offsetHeight-8) + "px;");
            button.className += "password-toggler-button password-toggler-hide";
            button.setAttribute("title", "Show password");
        }

        // get all buttons
        var passwordTogglers = document.getElementsByClassName("password-toggler-button");

        // toggle password inputs title, type and change button style
        function togglePasswords() {
            for (var i = 0; i < passwordInputs.length; i++) {
                if (passwordInputs[i].type === "password") {
                    passwordInputs[i].type = "text";
                    for (var j = 0; j < passwordTogglers.length; j++) {
                        passwordTogglers[j].title = "Hide password";
                        passwordTogglers[j].className = "password-toggler-button password-toggler-show";
                    }
                } else {
                    passwordInputs[i].type = "password";
                    for (var k = 0; k < passwordTogglers.length; k++) {
                        passwordTogglers[k].title = "Show password";
                        passwordTogglers[k].className = "password-toggler-button password-toggler-hide";
                    }
                }
            }
        }

        // add click event to buttons
        (function() {
            for (var i = 0; i < passwordTogglers.length; i++) {
                passwordTogglers[i].addEventListener("click", togglePasswords, false);
            }
        })();

        // clear inverval
        if (pageInputs.length !== 0) {
            clearInterval(buttonRepeat);
        }
    };

    // add inverval if inputs don't exist
    var buttonRepeat;
    if (pageInputs.length === 0) {
        buttonRepeat = setInterval(addButtons, 100);
    }

})();
