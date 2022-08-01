'use strict'

const GHOST = '&#9781;'
var gGhosts = []
var gIntervalGhosts
function SuperModeGhost() {
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].HtmlInput = `<span style="color:blue">${GHOST}</span>`
    }
    // setTimeout(() => {
    //     for (var i = 0; i < gGhosts.length; i++) {
    //         gGhosts[i].HtmlInput = `<span style="color:${getRandomColor()}">${GHOST}</span>`
    //     }
    // }, 5000)
    setTimeout(()=>{
       while(gGhostEaten.length !== 0){
        gGhosts.push(gGhostEaten.pop())
       }
       for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].HtmlInput = `<span style="color:${getRandomColor()}">${GHOST}</span>`
    }
       console.log(gGhosts)
    },5000)

}

function createGhost(board) {
    const ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: FOOD,
        // color: getRandomColor(),
        HtmlInput: `<span style="color:${getRandomColor()}">${GHOST}</span>`
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function createGhosts(board) {
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    const moveDiff = getMoveDiff();
    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    if (nextCell === PACMAN && gPacman.isSuper) {
        return
    } else if (nextCell === PACMAN) {
        renderCell(nextLocation, DEAD)
        gameOver()
        return
    }

    // model
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // DOM
    renderCell(ghost.location, ghost.currCellContent)

    // model
    ghost.location = nextLocation
    ghost.currCellContent = gBoard[ghost.location.i][ghost.location.j]
    gBoard[ghost.location.i][ghost.location.j] = GHOST

    // DOM
    renderCell(ghost.location, ghost.HtmlInput)
}

function getMoveDiff() {
    const randNum = getRandomIntInt(0, 100);
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}

// function getGhostHTML(ghost) {
//     return `<span style="color:${}">${GHOST}</span>`
// }