let userHasClicked = false;
let timer = null;
let reactionTime = 0;

const startButton = document.getElementById('start-game')

function startGame() {
    console.log("Game!")
    let startGameContainer = document.getElementById('start-game-container');
    startGameContainer.classList.add('is-hidden');

    let gameWindow = document.getElementById('game-window');
    let reactionButton = document.getElementById('reaction-button');
    gameWindow.classList.add('has-background-danger');
    gameWindow.classList.remove('is-hidden');

    let timeout = waitSomeRandomTime();
    console.log(timeout);

    let turnGreenTimeout = setTimeout(turnGreen, timeout, gameWindow);

    reactionButton.addEventListener('click', () => {
        userHasClicked = true;
        console.log(userHasClicked)
        stopTimer()
        console.log(gameWindow.innerHTML)
        gameWindow.innerHTML = ``;

        if (gameWindow.classList.contains('has-background-danger')) {
            console.log("Too fast! Try again.");
            gameWindow.innerHTML = `
            <h1 class="title has-text-light">Too fast! Try again.</h2>
            `
            clearTimeout(turnGreenTimeout);
        } else  if (gameWindow.classList.contains('has-background-success')) {
            console.log('score: ', reactionTime);
            gameWindow.innerHTML = `
            <h1 class="title has-text-light">Your result: 
                <h1 class="title has-text-light" style="font-size: 72px;">
                    ${reactionTime}
                </h1>
            </h2>
            `
        }

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

startButton.addEventListener('click', () => {
    startGame()
})