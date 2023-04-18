const selectBox = document.querySelector('.select-box')
const selectXBtn = selectBox.querySelector('.playerX')
const selectOBtn = selectBox.querySelector('.playerO')
const playerBoard = document.querySelector('.play-board')
const allBox = document.querySelectorAll('section span')
const players = document.querySelector('.players')  
const resultBox = document.querySelector('.result-box')
const wonText = resultBox.querySelector('.won-text')
const button = resultBox.querySelector('.btn')

window.onload = () => {
    for (let i = 0; i < allBox.length; i++) { // add onclick attribute in all available section's spans
        allBox[i].setAttribute('onclick', 'clickedBox(this)')
    }

    selectXBtn.onclick = () => {
        selectBox.classList.add('hide') // hide the slect box on playerX button clicked
        playerBoard.classList.add('show') // show the player board on playerX button clicked
    }

    selectOBtn.onclick = () => {
        selectBox.classList.add('hide'); // hide the slect box on playerO button clicked
        playerBoard.classList.add('show'); // show the player board on playerO button clicked
        players.setAttribute('class', 'players active player')
    }
}   

let playerXIcon = 'fa-solid fa-xmark' // class name of font awesome cross icon
let playerOIcon = 'fa-solid fa-o' // class name of font awesome circle icon
let playerSign = 'X' // suppose player will be X
let runBot = true

// user click function
function clickedBox(element) {
    // console.log(element)
    if (runBot) {
        if (players.classList.contains('player')) {
            playerSign = 'O'
            element.innerHTML = `<i class="${playerOIcon}"></i>`
            players.classList.add('active')
            element.setAttribute('id', playerSign)
        } else {
            playerSign = 'X'
            element.innerHTML = `<i class="${playerXIcon}"></i>`
            players.classList.add('active')
            element.setAttribute('id', playerSign)
        }
        playerBoard.style.pointerEvents = 'none' // once user select then user can't select any other box until bot select
        element.style.pointerEvents = 'none' // once user select any box then that box can't be selected again
        let randomDelayTime = ((Math.random() * 1000) + 400).toFixed() // generating random time delay so bot will delay randomly
        setTimeout(() => {
            bot()
        }, randomDelayTime)
        setTimeout(() => {
            selectWinner()
        }, 1000)
    }
}

// bot click function
function bot() {
    if (runBot) {
        let array = [] // creating empty array... we'll store unselected box index in this array
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) { // if span has no any child element
                array.push(i) // inserting unclicked or unselected boxes inside array means that span has no children
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)]
        if (array.length > 0) {
            if (players.classList.contains('player')) {
                playerSign = 'X'
                allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`
                players.classList.remove('active')
                allBox[randomBox].setAttribute('id', playerSign)
            } else {
                playerSign = 'O'
                allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`
                players.classList.remove('active')
                allBox[randomBox].setAttribute('id', playerSign)
            }
        }
        allBox[randomBox].style.pointerEvents = 'none' // once bot select any box then user can't select or click on that box
        playerBoard.style.pointerEvents = 'auto'
        setTimeout(() => {
            selectWinner()
        }, 1000)
    }
}

// let work on select the winner
function getClass(idname) {
    return document.querySelector('.box' + idname).id
}

function checkThreeClasses(val1, val2, val3, sign) {
    if (getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign) {
        return true
    }
}

function selectWinner() {
    if (checkThreeClasses(1, 2, 3, playerSign) || checkThreeClasses(4, 5, 6, playerSign) || checkThreeClasses(7, 8, 9, playerSign) || checkThreeClasses(1, 4, 7, playerSign) || checkThreeClasses(2, 5, 8, playerSign) || checkThreeClasses(3, 6, 9, playerSign) || checkThreeClasses(1, 5, 9, playerSign) || checkThreeClasses(3, 5, 7, playerSign)) {
        runBot = false

        // let show the result box with winner sign
        setTimeout(() => {
            playerBoard.classList.remove('show')
            resultBox.classList.add('show')
        })
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`
    } else {
        if (getClass(1) != "" && getClass(2) != "" && getClass(3) != "" && getClass(4) != "" && getClass(5) != "" && getClass(6) != "" && getClass(7) != "" && getClass(8) != "" && getClass(9) != "") {
            runBot = false

            // let show the result box with winner sign
            setTimeout(() => {
                playerBoard.classList.remove('show')
                resultBox.classList.add('show')
            })
            wonText.innerHTML = `Match has been drawn!`
        }
    }
}

button.onclick = () => {
    window.location.reload()
}