// ===== GAME STATE VARIABLES =====
const TARGET_WORD = "WORDS";  // Our secret word for testing
let currentRow = 0;           // Which row we're filling (0-5)
let currentTile = 0;          // Which tile in the row (0-4)
let gameOver = false;         // Is the game finished?

// DOM element references (set up on page load)
let gameBoard, rows, debugOutput;

// ===== HELPER FUNCTIONS (PROVIDED) =====

// Debug/Testing Functions
function logDebug(message, type = 'info') {
    // Log to browser console
    console.log(message);
    
    // Also log to visual testing area
    if (!debugOutput) {
        debugOutput = document.getElementById('debug-output');
    }
    
    if (debugOutput) {
        const entry = document.createElement('div');
        entry.className = `debug-entry ${type}`;
        entry.innerHTML = `
            <span style="color: #666; font-size: 12px;">${new Date().toLocaleTimeString()}</span> - 
            ${message}
        `;
        
        // Add to top of debug output
        debugOutput.insertBefore(entry, debugOutput.firstChild);
        
        // Keep only last 20 entries for performance
        const entries = debugOutput.querySelectorAll('.debug-entry');
        if (entries.length > 20) {
            entries[entries.length - 1].remove();
        }
    }
}

function clearDebug() {
    const debugOutput = document.getElementById('debug-output');
    if (debugOutput) {
        debugOutput.innerHTML = '<p style="text-align: center; color: #999; font-style: italic;">Debug output cleared - ready for new messages...</p>';
    }
}

// Helper function to get current word being typed
function getCurrentWord() {
    const currentRowElement = rows[currentRow];
    const tiles = currentRowElement.querySelectorAll('.tile');
    let word = '';
    tiles.forEach(tile => word += tile.textContent);
    return word;
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    gameBoard = document.querySelector('.game-board');
    rows = document.querySelectorAll('.row');
    debugOutput = document.getElementById('debug-output');
    
    logDebug("🎮 Game initialized successfully!", 'success');
    logDebug(`🎯 Target word: ${TARGET_WORD}`, 'info');
    logDebug("💡 Try typing letters, pressing Backspace, or Enter", 'info');
});

// ===== YOUR CHALLENGE: IMPLEMENT THESE FUNCTIONS =====

// TODO: Add keyboard event listener
// document.addEventListener("keydown", (event) => {
//     // Your code here!
// });

document.addEventListener('keydown', (event) => 
    {
        if(gameOver === false)
        {
            if(event.key.length === 1 && event.key.toUpperCase() >= 'A' && event.key.toUpperCase() <= 'Z')
            {
                logDebug("Single '" + event.key + "' key was pressed.");
                addLetter(event.key.toUpperCase());
            }
            else if(event.key === 'Backspace')
            {
                logDebug("Single 'Backspace' key was pressed.");
                deleteLetter();
            }
            else if(event.key === 'Enter')
            {
                logDebug("Single 'Enter' key was pressed.");
                submitGuess();
            }
        }
    });

// TODO: Implement addLetter function
// function addLetter(letter) {
//     // Your code here!
// }

function addLetter(letter)
{
    if(currentTile >= 5) //check to make sure there is another tile to add letters to
    {
        logDebug("Tile index is out of bounds, can't add another letter.");
        return;
    }
    else //changing the value of the current tile and moving to the next
    {
        const rowElement = rows[currentRow];
        const tiles = rowElement.querySelectorAll('.tile');

        tiles[currentTile].textContent = letter;
        tiles[currentTile].classList.add('filled');
        currentTile += 1;

        logDebug("Current row: [" + currentRow + "], Current tile: [" + currentTile + "], Current word: [" + getCurrentWord() + "]");
    }
}

// TODO: Implement deleteLetter function  
// function deleteLetter() {
//     // Your code here!
// }

function deleteLetter()
{
    if(currentTile <= 0) //check if another tile can be deleted
    {
        logDebug("Tile index is too low, can't delete");
        return;
    }
    else //delete the previous tile
    {
        currentTile --;
        const rowElement = rows[currentRow];
        const tiles = rowElement.querySelectorAll('.tile');

        tiles[currentTile].textContent = '';
        tiles[currentTile].classList.remove('filled');

        logDebug("Current row: [" + currentRow + "], Current tile: [" + currentTile + "], Current word: [" + getCurrentWord() + "]");
    }
}

// TODO: Implement submitGuess function
// function submitGuess() {
//     // Your code here!
// }

function submitGuess()
{
    if(currentTile !== 5) //check that five letters have been entered
    {
        logDebug("Can't submit guess, not enough letters");
        setTimeout(() => alert("Please enter 5 letters before trying to submit a guess"), 200);
        return;
    }
    else //evaluate guess and respond based on results
    {
        const rowElement = rows[currentRow];
        const tiles = rowElement.querySelectorAll('.tile');

        let word = '';
        tiles.forEach(tile => {word += tile.textContent;})

        currentRow++;
        currentTile = 0;
        logDebug("Guess was '" + word + "' target word is '" + TARGET_WORD + "'.")

        //checkGuess(); //check guess

        if(word === TARGET_WORD)
        {
            GameOver = true;
            logDebug("Target word hit. Game Over.");
            setTimeout(() => alert("You Win"), 500);
        }
        else if(currentRow >= 6)
        {
            gameOver = true;
            logDebug("No more guesses. Game Over.");
            setTimeout(() => alert("You Lose"), 500);
        }
        else
        {
            logDebug("Guess is incorrect. Continuing game.")
        }
    }
}

// TODO: Implement checkGuess function (the hardest part!)
// function checkGuess(guess, tiles) {
//     // Your code here!
//     // Remember: handle duplicate letters correctly
//     // Return the result array
// }