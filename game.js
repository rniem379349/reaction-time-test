let userHasClicked = false;
let timer = null;
let reactionTime = 0;

function startGame() {
    // hide initial screen 
    let startGameContainer = document.getElementById('start-game-container');
    startGameContainer.classList.add('is-hidden');

    // make screen red, clickable
    let gameWindow = document.getElementById('game-window');
    let reactionButton = document.getElementById('reaction-button');
    gameWindow.classList.add('has-background-danger');
    gameWindow.classList.remove('is-hidden');

    // generate a random timeout value 
    let timeout = waitSomeRandomTime();

    // set the timeout, which starts the timer
    let turnGreenTimeout = setTimeout(turnGreen, timeout, gameWindow);

    // react to the user's click 
    reactionButton.addEventListener('click', () => {
        userHasClicked = true;
        stopTimer()

        // clear the game window 
        gameWindow.innerHTML = ``;

        if (gameWindow.classList.contains('has-background-danger')) {
            // if user clicked too early, prompt to try again
            console.log("Too fast! Try again.");
            gameWindow.innerHTML = `
            <h1 class="title has-text-light">Too fast! Try again.</h2>
            `
            clearTimeout(turnGreenTimeout);
        } else if (gameWindow.classList.contains('has-background-success')) {
            // if user clicked correctly, print out the reaction time 
            console.log('score: ', reactionTime);
            gameWindow.innerHTML = `
            <h1 class="title has-text-light">Your result: 
                <h1 class="title has-text-light" style="font-size: 72px;">
                    ${reactionTime} ms
                </h1>
            </h2>
            `
        }

        // add button to try again 
        gameWindow.innerHTML += `
            <button class="button" id="try-again-button">Try again?</button>
        `
        let tryAgainButton = document.getElementById('try-again-button');
        console.log(tryAgainButton);
        tryAgainButton.addEventListener('click', () => {
            window.location.reload()
        })
    })
};

function waitSomeRandomTime() {
    const res = Math.floor(2000 + Math.random() * 4 * 1000);
    return(res);
};

function turnGreen(element) {
    // turn the screen green and start the timer
    element.classList.remove('has-background-danger')
    element.classList.add('has-background-success')
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        reactionTime += 10;
    }, 10);
}

function stopTimer() {
    clearInterval(timer)
}

const startButton = document.getElementById('start-game')

startButton.addEventListener('click', () => {
    startGame()
})