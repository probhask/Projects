// getting the element references
const play = document.getElementById("play");
const reset = document.getElementById("reset");
const popupDiv = document.querySelector(".popup");
const popSign = document.querySelector(".sign").firstElementChild;
const popMessage = document.querySelector(".message");
const popBtn = document.querySelector(".button");

//getting time elements
const hourDiv = document.querySelector(".div-hour");
const minuteDiv = document.querySelector(".div-minute");
const secondDiv = document.querySelector(".div-second");

// setting default to zero
hourDiv.innerHTML = "0";
minuteDiv.innerHTML = "0";
secondDiv.innerHTML = "0";

//flag for record if input and play button
let inputFlag = false, playing = false;


//pop message display
const popUP = (message, sign) => {
    popupDiv.classList.add("pop-in");
    popSign.className = `fa-solid ${sign}`;
    if (popSign.classList.contains("fa-check-circle")) {
        popSign.style.color = "green";
    }
    else {
        popSign.style.color = "red";
    }
    popMessage.innerHTML = message;
    hourDiv.innerHTML = "0";
    minuteDiv.innerHTML = "0";
    secondDiv.innerHTML = "0";
}
//pop up remove
popBtn.addEventListener("click", () => {
    popupDiv.classList.remove("pop-in");
    popSign.classList.remove("fa-check-circle");
    popSign.classList.remove("fa-warning");
})

//reset button functionality
const resetFunc = (interval) => {
    clearInterval(interval);
    if (play.classList.contains("fa-pause")) {
        play.classList.add("fa-play");
        play.classList.remove("fa-pause");
    }
    hourDiv.innerHTML = "0";
    minuteDiv.innerHTML = "0";
    secondDiv.innerHTML = "0";
}

let allTimeDiv = [...document.getElementsByClassName("div")];
console.log(allTimeDiv);
allTimeDiv.map(Element => {
    Element.addEventListener("click", () => {
        if (play.classList.contains("fa-play")) {
            Element.previousElementSibling.classList.remove("hidden");
            Element.previousElementSibling.value = Element.innerHTML;
            Element.previousElementSibling.classList.add("input-edit");
            Element.classList.add("hidden");
            console.log(Element.previousElementSibling);
            inputFlag = true;
        }
    })
})





const playFunc = () => {

    //change input to div when change is made and play button is clicked
    if (inputFlag === true) {
        let allInput = [...document.getElementsByClassName("input-edit")];
        console.log(allInput);
        allInput.map(Element => {
            console.log("elemeny value", Element.value);
            Element.nextElementSibling.classList.remove("hidden");
            Element.nextElementSibling.innerHTML = Element.value;
            Element.classList.add("hidden")
        })
        inputFlag = false;
    }

    let hour = Number.parseInt(hourDiv.innerHTML);
    let minute = Number.parseInt(minuteDiv.innerHTML);
    let second = Number.parseInt(secondDiv.innerHTML);

    if (hour < 0 || minute < 0 || minute > 60 || second < 0 || second > 60) {
        popUP("Please Enter the Correct Time", "fa-warning");
    }
    else {
        // console.log(hour, minute, second);
        counter = true;
        if (!play.classList.contains("fa-play")) {
            counter = false;
        }
        play.classList.toggle("fa-play");
        play.classList.toggle("fa-pause");

        let interval = setInterval(() => {

            //reset button click call a function
            reset.addEventListener("click", () => {
                resetFunc(interval);
            });
            if (counter === false) {
                clearInterval(interval);
                return;
            }

            if (hour === 0 && minute === 0 && second === 0) {
                clearInterval(interval);
                popUP("Time is Over", "fa-check-circle");
                play.classList.add("fa-play");
                return;
            }

            if (minute === 0 && second === 0) {
                hour--;
                hourDiv.innerHTML = hour;
                minute = 60;
            }

            if (second === 0) {
                minute--;
                minuteDiv.innerHTML = minute;
                second = 60;
            }
            second--;
            secondDiv.innerHTML = second;
        }, 1000);
    }
}
// play button click add event
play.addEventListener("click", playFunc);