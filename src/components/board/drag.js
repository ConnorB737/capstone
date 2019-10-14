import DIRECTION from "../../types";

const handleOnDrop = (word, value, droppedTileX, droppedTileY, placeTileOnBoard, tempBoardState, placedTiles) => {

    //put the word coords into the temporary board state for comparisons with the game logic
    placedTiles.forEach(tile => {
        tempBoardState[tile['y']][tile['x']] = tile['value']
    });

    function isValidPlacement(direction){
        //checks whether there is a straight line of tiles from the first tile you've placed,
        //to the last tile you've placed
        //i.e. no gaps

        //assumes the first tile has been placed
        let firstTile = placedTiles[0];
        //check that it isn't in the tempCoords
        placedTiles.forEach(tile => {
            if (droppedTileY === tile['y'] && droppedTileX === tile['x']) {
                return false;
            }
        });
        if(direction === DIRECTION.DOWN){ //vertically
            let firstTileOffset = firstTile['y'] - droppedTileY;
            if (firstTileOffset > 0) { //tile is above first tile
                for (let previousTileY = 1; previousTileY < firstTileOffset; previousTileY++){
                    if(tempBoardState[firstTile['y'] - previousTileY][droppedTileX] == null){
                        return false; //is not placable
                    }

                    let isTileInCoords = false; //adds all tiles between clicks to the word
                    for (let previousTileIndex = 0; previousTileIndex < placedTiles.length; previousTileIndex++){
                        if (firstTile['y'] - previousTileIndex === placedTiles[previousTileIndex]['y'] && droppedTileX === placedTiles[previousTileIndex]['x']){
                            isTileInCoords = true;
                        }
                    }
                    if(!isTileInCoords){
                        placeTileOnBoard({
                            y: firstTile['y'] - previousTileY,
                            x: droppedTileX,
                            value: tempBoardState[firstTile['y'] - previousTileY][droppedTileX],
                        });
                    }
                }
            } else if (firstTileOffset < 0) { //tile is below first tile
                for (let previousTileY = 1; previousTileY < -firstTileOffset; previousTileY++){
                    if(tempBoardState[firstTile['y'] + previousTileY][droppedTileX] == null){
                        return false; //is not placable
                    }

                    let isTileInCoords = false; //adds all tiles between clicks to the word
                    for (let previousTileIndex = 0; previousTileIndex < placedTiles.length; previousTileIndex++){
                        if(firstTile['y'] + previousTileIndex === placedTiles[previousTileIndex]['y'] && droppedTileX === placedTiles[previousTileIndex]['x']){
                            isTileInCoords = true;
                        }
                    }
                    if(!isTileInCoords){
                        placeTileOnBoard({
                            y: firstTile['y'] + previousTileY,
                            x: droppedTileX,
                            value: tempBoardState[firstTile['y'] + previousTileY][droppedTileX]
                        });
                    }
                }
            }
        } else if (direction === DIRECTION.RIGHT) { //horizonally
            let firstTileOffset = firstTile['x'] - droppedTileX;
            if(firstTileOffset > 0) { //tile is behind first tile
                for (let previousTileX = 1; previousTileX < firstTileOffset; previousTileX++){
                    if(tempBoardState[droppedTileY][firstTile['x'] - previousTileX] == null){
                        return false; //is not placable
                    }

                    let isTileInCoords = false; //adds all tiles between clicks to the word
                    for (let previousTileIndex = 0; previousTileIndex < placedTiles.length; previousTileIndex++){
                        if(droppedTileY === placedTiles[previousTileIndex]['y'] && firstTile['x'] - previousTileIndex === placedTiles[previousTileIndex]['x']){
                            isTileInCoords = true;
                        }
                    }
                    if(!isTileInCoords){
                        placeTileOnBoard({
                            y: droppedTileY,
                            x: firstTile['x'] - previousTileX,
                            value: tempBoardState[droppedTileY][firstTile['x'] - previousTileX]
                        });
                    }
                }
            } else if (firstTileOffset < 0) { //tile is in front of first tile
                for (let previousTileX = 1; previousTileX < -firstTileOffset; previousTileX++){
                    if(tempBoardState[droppedTileY][firstTile['x'] + previousTileX] == null){
                        return false; //is not placable
                    }

                    let isTileInCoords = false; //adds all tiles between clicks to the word
                    for (let previousTileIndex = 0; previousTileIndex < placedTiles.length; previousTileIndex++){
                        if(droppedTileY === placedTiles[previousTileIndex]['y'] && firstTile['x'] + previousTileIndex === placedTiles[previousTileIndex]['x']){
                            isTileInCoords = true;
                        }
                    }
                    if(!isTileInCoords){
                        placeTileOnBoard({
                            y: droppedTileY,
                            x: firstTile['x'] + previousTileX,
                            value: tempBoardState[droppedTileY][firstTile['x'] + previousTileX]
                        });
                    }
                }
            }
        }
        return true;
    }

    if(placedTiles.length === 0){ //checks whether first tile placed, and whether the spot is free
        if(tempBoardState[droppedTileY][droppedTileX] == null){
            placeTileOnBoard({
                x: droppedTileX,
                y: droppedTileY,
                value: value
            });
            tempBoardState[droppedTileY][droppedTileX] = value;
        }
     } else if (word.direction[0] === DIRECTION.NOT_PLACED){ //if a direction hasn't been set (usually second move)
        if(droppedTileX === placedTiles[0]['x'] && isValidPlacement(DIRECTION.DOWN)){
            if(tempBoardState[droppedTileY][droppedTileX] == null){
                word.direction[0] = DIRECTION.DOWN;
                placeTileOnBoard({
                    x: droppedTileX,
                    y: droppedTileY,
                    value: value
                });
                tempBoardState[droppedTileY][droppedTileX] = value;
            }
        } else if (droppedTileY === placedTiles[0]['y'] && isValidPlacement(DIRECTION.RIGHT)){
            if(tempBoardState[droppedTileY][droppedTileX] == null){
                word.direction[0] = DIRECTION.RIGHT;
                placeTileOnBoard({
                    x: droppedTileX,
                    y: droppedTileY,
                    value: value
                });
                tempBoardState[droppedTileY][droppedTileX] = value;
            }
        }
    } else if (word.direction[0] === DIRECTION.DOWN) { //if going vertically
        if (droppedTileX === placedTiles[0]['x'] && isValidPlacement(DIRECTION.DOWN)){ //and make sure that there is a tiles between either side of the placement
            placeTileOnBoard({
                x: droppedTileX,
                y: droppedTileY,
                value: value
            });
            tempBoardState[droppedTileY][droppedTileX] = value;
        }
    } else if (word.direction[0] === DIRECTION.RIGHT) { //same deal but horizontally
        if (droppedTileY === placedTiles[0]['y'] && isValidPlacement(DIRECTION.RIGHT)){
            placeTileOnBoard({
                x: droppedTileX,
                y: droppedTileY,
                value: value
            });
            tempBoardState[droppedTileY][droppedTileX] = value;
        }
    }

    return {
        lastx: droppedTileX,
        lasty: droppedTileY,
    }

};

export default handleOnDrop;