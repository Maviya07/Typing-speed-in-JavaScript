const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=90";
const quoteSelection = document.getElementById("quote");
const userInput = document.getElementsByClassName("quote-input")[0];
console.log(quoteSelection, userInput);

let quote = "";
let time = 60;
let timer = "";
let mistakes = 0;



// Display random quote
const renderNewQuote = async () => {
    // Fetch content from url 
    const response = await fetch(quoteApiUrl);


    // store response
    let data = await response.json();

    //Access quote
    quote = data.content;
    console.log(data.content);

    let arr = quote.split("").map((value) => {
        return "<span class = 'quote-chars'>" + value + "</span>";
    });



    // logic for comparing inputs of user with quote 
    userInput.addEventListener('input', () => {
        let quoteChars = document.querySelectorAll('.quote-chars');
        console.log(quoteChars);

        //create an array from recieved quote-chars 
        quoteChars = Array.from(quoteChars);
        console.log(quoteChars);

        //user input characters
        let userInputChars = userInput.value.split("");


        // loop the each character in quote 

        quoteChars.forEach((char, index) => {
            if (char.innerText === userInputChars[index]) {
                char.classList.add("success");
            }
            // if user hasnt entered any thing or backspaced 
            else if (userInputChars[index] == null) {
                //remove class of color green and red
                if (char.classList.contains("success")) {
                    char.classList.remove("success");
                } else {
                    char.classList.remove("failed");
                }
                // if user enter wrong character
            } else {
                // chack add failed RED
                if (!char.classList.contains("failed")) {
                    mistakes = mistakes + 1;
                    char.classList.add("failed");
                }
                document.getElementById("mistakesID").innerHTML = mistakes;
            }
            let check = quoteChars.every((element) => {
                return element.classList.contains("success");
            });
            if (check) {
                displayResult();
            }
        });
    });
    quoteSelection.innerHTML += arr.join("");
};

// for update time
function updateTimer() {
    if (time == 0) {
        //End test if timer reaches 0
        displayResult();
    }
    else {
        document.getElementById("timerID").innerHTML = --time + "s";
    }
}

// for time reduce
const timeReduce = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);

}

// end test
const displayResult = () => {
    document.querySelector(".result").style.display = "block";
    clearInterval(timer);
    document.getElementById("stop-test").style.display = "none";
    userInput.disabled = true;

    let timeTaken = 1;
    if (time != 0) {
        timeTaken = (60 - time) / 100;
    }
    document.getElementById("speedID").innerText = (userInput.value.length / 5 / timeTaken).toFixed(2) + "wpm";

    document.getElementById("accuracyID").innerText = Math.round(
        ((userInput.value.length - mistakes) / userInput.value.length) * 100
    ) + " %";

}

// for start test
const startTest = () => {
    timer = "";
    mistakes = 0;
    userInput.disabled = false;
    timeReduce();
    document.getElementById("stop-test").style.display = "block";
    document.getElementById("start-test").style.display = "none";
}

// fetch api text on window load
window.onload = () => {
    userInput.value = "";
    document.getElementById("start-test").style.display = "block";
    document.getElementById("stop-test").style.display = "none";
    // document.querySelector(".start-test").style.display = "block";
    // document.querySelector(".stop-test").style.display = "none";
    userInput.disabled = true;
    renderNewQuote();
};
