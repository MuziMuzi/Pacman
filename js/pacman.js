'use strict'

const PACMAN = '😷';
var gPacman;
const gGhostEaten = []

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}
// eatGhost(location){
//     var ghostIndex
//     for (var i = 0; i < gGhosts.length; i++) {
//         if (gGhosts[i].location.i === location.i && gGhosts[i].location.j === location.j) {
//             ghostIndex = i
//         }
//     }
//     ghostEaten.push(gGhosts[ghostIndex].splice(i,1))
// }
function movePacman(ev) {

    if (!gGame.isOn) return
    // console.log('ev', ev);
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return
    // console.log('nextLocation', nextLocation)

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('NEXT CELL', nextCell)
    
    if (nextCell === WALL) return
    if (nextCell === FOOD) {
        updateScore(1)
        gGame.foodLeft--
        checkVictory()
    }
    if (nextCell === CHERRY){
        updateScore(15)
    }
    if (nextCell === SUPERFOOD) {
        if(gPacman.isSuper) return
        gPacman.isSuper = true
        setTimeout(() => {gPacman.isSuper = false}, 5000)
        SuperModeGhost()
    } else if (nextCell === GHOST && gPacman.isSuper) {
        updateScore(50)
        var ghostIdx 
        for (var i = 0; i < gGhosts.length; i++) {
            if (gGhosts[i].location.i === nextLocation.i && gGhosts[i].location.j === nextLocation.j) {
                ghostIdx = i
            }
        }
        gGhostEaten.push(...gGhosts.splice(ghostIdx, 1))
    } else if (nextCell === GHOST) {
        renderCell(gPacman.location, DEAD)
        gameOver()
        return
    }
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}