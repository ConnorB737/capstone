import DIRECTION from "../../types";

const playTile = (placedTiles, direction, board, wordList, placeWord, socket, temp_rack, word, clear) => {
    let allTiles = [];
        
        function checkAdjacentWords(tilesToCheck, dir){
            let returnVal = true;
            if (dir === DIRECTION.RIGHT) { //then the words are going to be going vertically
                tilesToCheck.forEach(t => {
                    let letters = [];
                    let startY = t['y'];
                    while (startY > 0 && board[startY - 1][t['x']] != null){
                        startY -= 1;
                    }

                    let endY = t['y'];
                    while (endY < 14 && board[endY + 1][t['x']] != null){
                        endY += 1;
                    }
                    
                    for (let c = startY; c <= endY; c++){
                        letters.push(board[c][t['x']]);
                    }
                    if (!wordList.includes(letters.join(""))){
                        returnVal = false;
                    }
                });
            } else if (dir === DIRECTION.DOWN) {
                tilesToCheck.forEach(t => {
                    let letters = [];
                    let startX = t['x'];
                    while (startX > 0 && board[t['y']][startX - 1] != null){
                        startX -= 1;
                    }

                    let endX = t['x'];
                    while (endX < 14 && board[t['y']][endX + 1] != null){
                        endX += 1;
                    }
                    
                    for (let c = startX; c <= endX; c++){
                        letters.push(board[t['y']][c]);
                    }
                    if (!wordList.includes(letters.join(""))){
                        returnVal = false;
                    }
                });
            } else { //check both directions -- usually when only one letter has been placed
                tilesToCheck.forEach(t => {
                    let letters = [];
                    let startX = t['x'];
                    while (startX > 0 && board[t['y']][startX - 1] != null){
                        startX -= 1;
                    }

                    let endX = t['x'];
                    while (endX < 14 && board[t['y']][endX + 1] != null){
                        endX += 1;
                    }
                    
                    for (let c = startX; c <= endX; c++){
                        letters.push(board[t['y']][c]);
                    }
                    if (letters.join("").length > 1 && !wordList.includes(letters.join(""))){
                        returnVal = false;
                    }
                });
                tilesToCheck.forEach(t => {
                    let letters = [];
                    let startY = t['y'];
                    while (startY > 0 && board[startY - 1][t['x']] != null){
                        startY -= 1;
                    }

                    let endY = t['y'];
                    while (endY < 14 && board[endY + 1][t['x']] != null){
                        endY += 1;
                    }
                    
                    for (let c = startY; c <= endY; c++){
                        letters.push(board[c][t['x']]);
                    }
                    if (letters.join("").length > 1 && !wordList.includes(letters.join(""))){
                        returnVal = false;
                    }
                });
            }            
            return returnVal;
        }
        
        //sorts the coords in order of their i or j coordinate depending on the direction
        let adjacentTiles = [];
        if(direction === DIRECTION.NOT_PLACED){
             if((placedTiles[0]['y'] - 1 >= 0 && board[placedTiles[0]['y'] - 1][placedTiles[0]['x']] != null) || 
                (placedTiles[0]['y'] + 1 <= 14 && board[placedTiles[0]['y'] + 1][placedTiles[0]['x']] != null)) {
                direction = DIRECTION.DOWN;
                } else {
                    direction = DIRECTION.RIGHT;
                }
        }
         if (direction === DIRECTION.RIGHT) { //horizonal
            placedTiles = placedTiles.sort((a, b) => a['x'] - b['x']);
            let startX = placedTiles[0]['x'];
            while (startX > 0 && board[placedTiles[0]['y']][startX - 1] != null){
                startX -= 1;
            }
            
            let endX = placedTiles[placedTiles.length-1]['x'];
            while (endX < 14 && board[placedTiles[0]['y']][endX + 1] != null){
                endX += 1;
            }

            for (let c = startX; c <= endX; c++){
                allTiles.push({
                                y: placedTiles[0]['y'],
                                x: c,
                                value: board[placedTiles[0]['y']][c]
                            });
                if((placedTiles[0]['y'] - 1 >= 0 && board[placedTiles[0]['y'] - 1][c] != null) || 
                (placedTiles[0]['y'] + 1 <= 14 && board[placedTiles[0]['y'] + 1][c] != null)) { //if there are tiles adjacent to the word
                    adjacentTiles.push({
                                y: placedTiles[0]['y'],
                                x: c,
                                value: board[placedTiles[0]['y']][c]
                            });
                }
            }
            
         } else if (direction === DIRECTION.DOWN) {//vertical
            placedTiles = placedTiles.sort((a, b) => a['y'] - b['y']);
            
            let startY = placedTiles[0]['y'];
            while (startY > 0 && board[startY - 1][placedTiles[0]['x']] != null){
                startY -= 1;
            }

            let endY = placedTiles[placedTiles.length-1]['y'];
            while (endY < 14 && board[endY + 1][placedTiles[0]['x']] != null){
                endY += 1;
            }
            
            for (let c = startY; c <= endY; c++){
                allTiles.push({
                                y: c,
                                x: placedTiles[0]['x'],
                                value: board[c][placedTiles[0]['x']]
                            });
                if((placedTiles[0]['x'] - 1 >= 0 && board[c][placedTiles[0]['x'] - 1] != null) || 
                (placedTiles[0]['x'] + 1 <= 14 && board[c][placedTiles[0]['x'] + 1] != null)) { //if there are tiles adjacent to the word
                    adjacentTiles.push({
                                y: c,
                                x: placedTiles[0]['x'],
                                value: board[placedTiles[0]['y']][c]
                            });
                }
            }
        }
    //as the word is now in order, we can simply take each letter to construct our word
    
    const combinedWord = allTiles.map(tile => tile['value']).join("");
    let centerHasBeenPlayed = false;
    placedTiles.forEach((tile) => {
        if (tile['x'] === 7 && tile['y'] === 7) {
            centerHasBeenPlayed = true;
        }
    });

    if(!centerHasBeenPlayed){
        alert("First word needs to be placed in the center");
    } else if (!allTiles.some(tile => tile["x"] == 7 && tile["y"] == 7) && adjacentTiles.length == 0) { //if not placing the first word, and not adjacent to another word
        alert("Your word must come off another word")
    }
    else if ((combinedWord.length <= 1 || wordList.includes(combinedWord)) && checkAdjacentWords(adjacentTiles, direction)) { //if valid word, place it on the server and reset the state to place your next word
        placeWord(socket, combinedWord, word.direction[0], allTiles, temp_rack);
        alert("Word Placed!");
    } else {
        alert("Invalid word!");
    }
};

export default playTile;
