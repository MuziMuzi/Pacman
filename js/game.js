'use strict'
const DEAD = '☠️'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SUPERFOOD = '🍔'
const CHERRY = '🍒'

var gGame = {
    score: 0,
    isOn: false,
    foodLeft: 0
}
var gBoard


function init() {
    hideModal()
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)

    printMat(gBoard, '.board-container')
    gGame.foodLeft = countFood(gBoard)
    gGame.isOn = true
    gGame.score = 0
    updateScore(0)
    setInterval(generateCherry,15000)
}
function generateCherry(){
    var emptyLocation = returnEmptyCell(gBoard)
    console.log(emptyLocation)
    gBoard[emptyLocation.i][emptyLocation.j] = CHERRY
    renderCell(emptyLocation,CHERRY)
}
function returnEmptyCell(board) {
    var emptyCells = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            if (board[i][j] === EMPTY) emptyCells.push({i,j})
        }
    }
    console.log('emptyCell.length',emptyCells.length)
    var emptyCell = emptyCells[getRandomIntInt(0,emptyCells.length)]
    return emptyCell
}
function countFood(board) {
    const SIZE = 10
    var foodCounter = 0
    for (var i = 0; i < SIZE; i++) {
        for (var j = 0; j < SIZE; j++) {
            if (board[i][j] === FOOD) foodCounter++
        }
    }
    return foodCounter + 1
}
function showModal() {
    const elModal = document.querySelector('.modal-container')
    elModal.style.display = 'block'
}
function hideModal() {
    const elModal = document.querySelector('.modal-container')
    elModal.style.display = 'none'
}
function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
            }
        }
    }
    board[1][SIZE - 2] = SUPERFOOD
    board[1][1] = SUPERFOOD
    board[SIZE - 2][1] = SUPERFOOD
    board[SIZE - 2][SIZE - 2] = SUPERFOOD


    return board
}

function updateScore(diff) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
}
function checkVictory() {
    if (gGame.foodLeft === 0) {
        showWinningModal()
        gameOver()
    }
}
function showWinningModal() {
    const elModal = document.querySelector('.modal-message')
    elModal.style.display = 'block'
    setTimeout(() => elModal.style.display = 'none', 2000)
}

function gameOver() {
    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    showModal()
}