let trackOrder = [];
let playerOrder = [];
//the flash count per turn
let flashCount;
//
let intervalId;
//the # of turns completed so far
let turn;
//bool to show if player won
let win;
//bool to check if player is correct
let correct;
let powerOn = false;
let sound = true;
let difficulty = false;
let clickable = false;

const green = document.getElementById("green");
const red = document.getElementById("red");
const blue = document.getElementById("blue");
const yellow = document.getElementById("yellow");
const powerbtn = document.getElementById("power");
const start = document.getElementById("start");
const repeat = document.getElementById("repeat");
const turnCount = document.getElementById("score");
const easy = document.getElementById("easy");
const hard = document.getElementById('hard');
const disable = document.getElementsByClassName("offClick");

powerbtn.addEventListener('click', (e) => {
    if (!powerOn) {
        powerOn = true;
        powerbtn.style.backgroundColor = "red";
        easy.style.backgroundColor = "tomato";

        powerbtn.style.color = "red";
        turnCount.innerHTML = "Hi!";
        setTimeout(() => {
            turnCount.innerHTML = "";
        }, 1000)

    }
    else if (powerOn) {
        powerOn = false;
        powerbtn.style.backgroundColor = "grey";
        turnCount.innerHTML = "";
        easy.style.backgroundColor = "white";
        hard.style.backgroundColor = "white";

    }
});

//main function, controls when the user goes and when the computer goes. Calls gameTurn function

start.addEventListener('click', (e) => {
    if (powerOn) {
        //clickable = true;
        win = false;
        trackOrder = [];
        playerOrder = [];
        flashCount = 0;
        intervalId = 0;
        turn = 1;
        turnCount.innerHTML = 1;
        correct = true;

        for (let i = 0; i < 20; i++) {
            trackOrder.push(Math.floor(Math.random() * 4) + 1);
        }
        console.log(trackOrder);
        compTurn = true;
        if (!difficulty) {
            intervalId = setInterval(gameTurn, 800);
        }
        else if (difficulty) {
            intervalId = setInterval(gameTurn, 400);
        }
        else {
            console.log("playGame() not working!");
        }
    }
        //clickable = true;


});

repeat.addEventListener('click', (e) => {
    if (powerOn) {
        clearColor();
        turnCount.innerHTML = turn;
        compTurn = true;
        flashCount = 0;
        playerOrder = [];
        correct = true;
        if (difficulty === false) {
            intervalId = setInterval(gameTurn, 800);
        }
        else if (difficulty === true) {
            intervalId = setInterval(gameTurn, 400);
        }
        else {
            console.log("check() difficulty not working.")
        }
    }

});




easy.addEventListener('click', (e) => {
    if (powerOn) {
        difficulty = false;
        clearColor();
        turnCount.innerHTML = "";
        compTurn = true;
        flashCount = 0;
        playerOrder = [];
        correct = true;
        easy.style.backgroundColor = "tomato";
        hard.style.backgroundColor = "white";
    }

});

hard.addEventListener('click', (e) => {
    if (powerOn) {
        difficulty = true;
        clearColor();
        turnCount.innerHTML = "";
        compTurn = true;
        flashCount = 0;
        playerOrder = [];
        correct = true;
        easy.style.backgroundColor = "white";
        hard.style.backgroundColor = "tomato";
    }


});

function gameTurn() {
    if (powerOn) {

        if (flashCount == turn) {
            clearInterval(intervalId);
            compTurn = false;
            clearColor();
        }
        if (compTurn) {
            //disable.style.pointerEvents = 'none';
            //pointer-events: none;
            if (!difficulty) {
                setTimeout(() => {
                    if (trackOrder[flashCount] == 1) { greenAudio() };
                    if (trackOrder[flashCount] == 2) { redAudio() };
                    if (trackOrder[flashCount] == 3) { blueAudio() };
                    if (trackOrder[flashCount] == 4) { yellowAudio() };
                    flashCount++;

                }, 500);
                clearColor();
            }
            else if (difficulty) {
                setTimeout(() => {
                    if (trackOrder[flashCount] == 1) { greenAudio() };
                    if (trackOrder[flashCount] == 2) { redAudio() };
                    if (trackOrder[flashCount] == 3) { blueAudio() };
                    if (trackOrder[flashCount] == 4) { yellowAudio() };
                    flashCount++;

                }, 250);
                clearColor();
            }
            else {
                console.log("gameTurn() difficulty not working");
            }
        }


    }
    else if (!powerOn) {
        flashColor();
        clearColor();
        turnCount.innerHTML = "";
        win = false;
        trackOrder = [];
        playerOrder = [];
        flashCount = 0;
        intervalId = 0;
        correct = true;
        turn = 0;
    }

}

function clearColor() {
    green.style.backgroundColor = "green";
    //green.style = "box-sizing: none";

    red.style.backgroundColor = "red";
    //red.style = "box-sizing: none";

    blue.style.backgroundColor = "blue";
    //blue.style = "box-sizing: none";

    yellow.style.backgroundColor = "rgb(180, 180, 17)";
    //yellow.style = "box-sizing: none";

}

function flashColor() {

    green.style.backgroundColor = "lightgreen";
    red.style.backgroundColor = "rgb(252, 96, 96)";
    blue.style.backgroundColor = "lightskyblue";
    yellow.style.backgroundColor = "lightyellow";

}

function flashColorWin(i) {

    setTimeout(() => {

        if (trackOrder[i] == 1) {
            greenAudio();
            red.style.backgroundColor = "red";
            blue.style.backgroundColor = "blue";
            yellow.style.backgroundColor = "rgb(180, 180, 17)";
        }
        if (trackOrder[i] == 2) {
            redAudio();
            green.style.backgroundColor = "green";
            blue.style.backgroundColor = "blue";
            yellow.style.backgroundColor = "rgb(180, 180, 17)";
        }
        if (trackOrder[i] == 3) {
            blueAudio();
            green.style.backgroundColor = "green";
            red.style.backgroundColor = "red";
            yellow.style.backgroundColor = "rgb(180, 180, 17)";
        }
        if (trackOrder[i] == 4) {
            yellowAudio();
            green.style.backgroundColor = "green";
            red.style.backgroundColor = "red";
            blue.style.backgroundColor = "blue";
        }

        console.log(trackOrder[i])

    }, 100 * i);




}


function greenAudio() {
    if (sound) {
        const audio = document.getElementById("greenSound");
        audio.play();
    }
    sound = true;
    green.style.backgroundColor = "lightgreen";
}

function redAudio() {
    if (sound) {
        const audio = document.getElementById("redSound");
        audio.play();
    }
    sound = true;
    red.style.backgroundColor = "rgb(252, 96, 96)";

}

function blueAudio() {
    if (sound) {
        const audio = document.getElementById("blueSound");
        audio.play();
    }
    sound = true;
    blue.style.backgroundColor = "lightskyblue";
}

function yellowAudio() {
    if (sound) {
        const audio = document.getElementById("yellowSound");
        audio.play();
    }
    sound = true;
    yellow.style.backgroundColor = "lightyellow";
}



green.addEventListener('click', (e) => {
    if(powerOn){
        playerOrder.push(1);
        check();
        greenAudio();
    
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 200);
        }
    }
    //green.style = "box-sizing: border-box";

});

red.addEventListener('click', (e) => {
    if(powerOn){
        playerOrder.push(2);

        check();
        redAudio();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 200);
        }
    }
    //red.style = "box-sizing: border-box";

});

blue.addEventListener('click', (e) => {
    //blue.style = "box-sizing: border-box";

    if(powerOn){
        playerOrder.push(3);
        check();
        blueAudio();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 200);
        }
    }

});

yellow.addEventListener('click', (e) => {
    if(powerOn){
        playerOrder.push(4);
        check();
        yellowAudio();
        if (!win) {
            setTimeout(() => {
                clearColor();
            }, 200);
        }
    }
    //yellow.style = "box-sizing: border-box";

});
 
function check() {
    if (playerOrder[playerOrder.length - 1] != trackOrder[playerOrder.length - 1]) {
        correct = false;
    }
    //control game win turn
    if (playerOrder.length == 5 && correct) {
        winner();
    }

    if (correct == false) {
        flashColor();
        turnCount.innerHTML = "Wrong!";
        if (!difficulty) {
            setTimeout(() => {
                turnCount.innerHTML = turn;
                clearColor();
                compTurn = true;
                flashCount = 0;
                playerOrder = [];
                correct = true;
                intervalId = setInterval(gameTurn, 800);
            }, 1000);
        }
        else if (difficulty) {
            setTimeout(() => {
                turnCount.innerHTML = turn;
                clearColor();
                compTurn = true;
                flashCount = 0;
                playerOrder = [];
                correct = true;
                intervalId = setInterval(gameTurn, 400);
            }, 1000);
        }
        sound = false;
    }

    if (turn == playerOrder.length && correct && !win) {
        turn++;
        playerOrder = [];
        compTurn = true;
        flashCount = 0;
        turnCount.innerHTML = turn;
        if (!difficulty) {
            intervalId = setInterval(gameTurn, 800);
        }
        else if (difficulty) {
            intervalId = setInterval(gameTurn, 400);
        }
        else {
            console.log("check() difficulty not working.")
        }
    }
}

function winner() {

    turnCount.innerHTML = "WIN!";
    win = true;
    for (let i = 0; i < 20; i++) {
        flashColorWin(i);
    }
    setTimeout(()=>{
        flashColor();
        clearColor();
        turnCount.innerHTML = "";
        win = false;
        trackOrder = [];
        playerOrder = [];
        flashCount = 0;
        intervalId = 0;
        correct = true;
        turn = 0;
    },2000)
   

}



