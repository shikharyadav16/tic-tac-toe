const body = document.body;
let chance = 0;
let playingArray = []

function startGame() {
    document.getElementsByClassName('start')[0].style.display = 'none';
    document.getElementsByClassName('container')[0].style.display = 'grid'
    const body = document.body;
    body.style.backgroundColor = 'green';
    let chance = 0;
    let playingArray = []

    document.querySelectorAll('.button').forEach((Element) => {
        Element.addEventListener('click', (event) => {
            let button = event.target;
            if (chance % 2 === 0 && button.innerHTML === '') {
                button.innerHTML = 'O';
                body.style.backgroundColor = 'red'
                button.style.color = 'green'
                let resultArray = checkWins(Element.dataset.value, 'green');
                if (resultArray) {
                    let winArray = Array.from(document.querySelectorAll('.button'));
                    winArray[resultArray[1]].style.backgroundColor = 'yellow'
                    winArray[resultArray[2]].style.backgroundColor = 'yellow'
                    winArray[resultArray[3]].style.backgroundColor = 'yellow'
                    winArray.forEach((btn) => { btn.replaceWith(btn.cloneNode(true)) })
                    setTimeout(()=> {
                        document.getElementsByClassName('container')[0].style.display = 'none';
                        body.style.backgroundColor = 'rgb(141, 214, 243)'
                        displayResult('green')
                    },2000)
                }
                
                
                chance++;
            } else if (chance % 2 !== 0 && button.innerHTML === '') {
                button.innerHTML = 'X'
                body.style.backgroundColor = 'green'
                button.style.color = 'red'
                
                let resultArray = checkWins(Element.dataset.value, 'red');
                if (resultArray) {
                    console.log(resultArray[0], 'wins');
                    console.log('By:', resultArray[1], resultArray[2], resultArray[3])
                    let winArray = Array.from(document.querySelectorAll('.button'));
                    winArray[resultArray[1]].style.backgroundColor = 'yellow'
                    winArray[resultArray[2]].style.backgroundColor = 'yellow'
                    winArray[resultArray[3]].style.backgroundColor = 'yellow'
                    winArray.forEach((btn) => { btn.replaceWith(btn.cloneNode(true)) })
                    setTimeout(()=> {
                        document.getElementsByClassName('container')[0].style.display = 'none';
                        body.style.backgroundColor = 'rgb(141, 214, 243)'
                        displayResult('red')
                    },2000)
                }

                chance++;
            }
        })
    })


    const checkWins = (value, color) => {
        playingArray[value - 1] = color;

        //diagonal approach
        if (playingArray[0] === color && playingArray[4] === color && playingArray[8] === color) {
            return [color, 0, 4, 8];
        } else if (playingArray[2] === color && playingArray[4] === color && playingArray[6] === color) {
            return [color, 2, 4, 6];
        }

        //horizontal approach
        for (let i = 0; i < 7; i += 3) {
            if (playingArray[i] === color && playingArray[i + 1] === color && playingArray[i + 2] === color) {
                return [color, i, i + 1, i + 2];
            }
        }

        // Vertical approach
        for (let i = 0; i < 3; i++) {
            if (playingArray[i] === color && playingArray[i + 3] === color && playingArray[i + 6] === color) {
                return [color, i, i + 3, i + 6];
            }
        }

        return false;
    }
}

function displayResult(value) {
    document.getElementsByClassName('won')[0].style.display = 'block';
    document.getElementsByClassName('color-win')[0].style.backgroundColor = value;
    let statement = document.getElementsByClassName('statement')[0];
    (value === 'green')?(statement.innerHTML = 'Green Win!'):(statement.innerHTML = 'Red Win!')
    statement.style.color = value;
    return;
}

function restartGame() {
    playingArray = [];
    document.querySelectorAll('.button').forEach((Element)=> {
        Element.innerHTML = '';
        Element.style.backgroundColor = 'aliceblue';
        document.getElementsByClassName('won')[0].style.display = 'none';
        startGame();
    })
}