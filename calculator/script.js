document.addEventListener("DOMContentLoaded", function () {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const value = this.innerText;

            if (value === "C") {
                clearDisplay();
            } else if (value === "DEL") {
                deleteChar();
            } else if (value === "=") {
                calculateAnswer();
            } else if (value === "^") {
                appendValue("**"); 
            } else {
                appendValue(value);
            }
        });
    });

    function appendValue(value) {
        if (display.value === "Error") {
            clearDisplay();
        }

        const lastChar = display.value.slice(-1);

        // Prevent consecutive operators (except for - sign)
        if (isOperator(lastChar) && isOperator(value) && value !== "-") {
            return;
        }

        display.value += value;
    }

    function isOperator(char) {
        const operators = ["+", "-", "*", "/", "%", "."];
        return operators.includes(char);
    }

    function clearDisplay() {
        display.value = "";
    }

    function deleteChar() {
        display.value = display.value.slice(0, -1);
    }

    function calculateAnswer() {
        try {
            if (display.value.trim() === "") return;

            // Replace ^ with ** for exponentiation
            let expression = display.value.replace(/\^/g, "**");

            let result = eval(expression);

            if (Number.isFinite(result)) {
                display.value = result;
            } else {
                display.value = "Error";
            }
        } catch (error) {
            display.value = "Error";
        }
    }

    document.addEventListener("keydown", function (event) {
        const key = event.key;

        if (!isNaN(key) || isOperator(key) || key === "Enter" || key === "Backspace" || key === "Escape") {
            event.preventDefault();

            if (key === "Enter") {
                calculateAnswer();
            } else if (key === "Backspace") {
                deleteChar();
            } else if (key === "Escape") {
                clearDisplay();
            } else {
                appendValue(key);
            }
        }
    });
});
