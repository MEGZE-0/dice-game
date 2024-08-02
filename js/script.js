let currentPlayer = 1;
let currentScore = 0;
let totalScores = [0, 0];
const maxScore = 50;

const current1 = document.getElementById('current1');
const current2 = document.getElementById('current2');
const score1 = document.getElementById('score1');
const score2 = document.getElementById('score2');
const rollButton = document.getElementById('roll');
const holdButton = document.getElementById('hold');
const testFlareButton = document.getElementById('testFlareButton');
const diceImage = document.getElementById('diceImage');

rollButton.addEventListener('click', rollDice);
holdButton.addEventListener('click', holdScore);
testFlareButton.addEventListener('click', addCelebratingFlares);

function rollDice() {
    const diceValue = Math.floor(Math.random() * 6) + 1;
    diceImage.src = `./images/dice${diceValue}.png`;
    diceImage.alt = `Dice showing ${diceValue}`;

    if (diceValue === 1) {
        currentScore = 0;
        document.getElementById(`current${currentPlayer}`).textContent = currentScore;
        switchPlayer();
    } else {
        currentScore += diceValue;
        document.getElementById(`current${currentPlayer}`).textContent = currentScore;
    }
}

function holdScore() {
    totalScores[currentPlayer - 1] += currentScore;
    document.getElementById(`score${currentPlayer}`).textContent = totalScores[currentPlayer - 1];
    currentScore = 0;
    document.getElementById(`current${currentPlayer}`).textContent = currentScore;

    if (totalScores[currentPlayer - 1] >= maxScore) {
        showWinner();
    } else {
        switchPlayer();
    }
    resetDice();
}

function switchPlayer() {
    document.getElementById(`player${currentPlayer}`).classList.remove('active');
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    document.getElementById(`player${currentPlayer}`).classList.add('active');
}

function resetDice() {
    diceImage.src = './images/dice1.png';
    diceImage.alt = 'Dice showing 1';
}

function showWinner() {
    const winnerMessage = document.createElement('div');
    winnerMessage.classList.add('winner-message');
    winnerMessage.innerHTML = `Winner Winner Chicken Dinner!<br>Player ${currentPlayer} Wins!`;
    document.body.appendChild(winnerMessage);
    addCelebratingFlares();
}

function addCelebratingFlares() {
    for (let i = 0; i < 30; i++) {
        const flare = document.createElement('div');
        flare.classList.add('flare');
        flare.style.setProperty('--flare-x', Math.random() * 2 - 1);
        flare.style.setProperty('--flare-y', Math.random() * 2 - 1);
        flare.style.left = `${Math.random() * 100}vw`;
        flare.style.top = `${Math.random() * 100}vh`;
        document.body.appendChild(flare);
    }
    setTimeout(() => {
        document.querySelectorAll('.flare').forEach(flare => flare.remove());
    }, 5000);
}
