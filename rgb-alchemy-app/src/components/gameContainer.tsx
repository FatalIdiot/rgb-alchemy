import { FC, useState, useEffect } from 'react';
import FieldDisplay from './fieldDisplay';
import GameOverPopup from './gameOverPopup';
import { Tooltip } from "react-tooltip";
import { GameState, ServerData, RGBColor } from '../types';
import calculateTile from './helpers/calculateTile';

const GameContainer: FC<ServerData & { restartGame: Function }> = (props) => {
    const { width, height, userId, maxMoves, target, restartGame } = props;
    
    const [movesLeft, setMovesLeft] = useState<number>(maxMoves);
    const [targetColor] = useState<RGBColor>({ r: target[0], g: target[1], b: target[2] });
    const [closestColorTileIndex, setClosestColorTileIndex] = useState<number>(0);
    const [closestColorDelta, setClosestColorDelta] = useState<number>(1);
    const [gameState, setGameState] = useState<GameState>(GameState.SourceColorsSelection);

    const numOfSources = width * 2 + height * 2;
    const numOfTiles = width * height;
    const [sources, setSources] = useState<Array<RGBColor>>( new Array<RGBColor>(numOfSources) );
    const [tiles, setTiles] = useState<Array<RGBColor>>( new Array<RGBColor>(numOfTiles) );

    useEffect(() => {
        // Init game - set starting sources
        const newSourcesData: Array<RGBColor> = [...sources];
        for(let i = 0; i < numOfSources; i++) {
            newSourcesData[i] = { r: 0, g: 0, b: 0 };
        }
        setSources(newSourcesData);
    }, []);

    useEffect(() => {
        // Make sure sources are initialized
        if(sources[0] === undefined)
            return;

        // Calculate tiles on Sources change
        let bestColorIndex = 0;
        let bestColorDelta = 1;
        const newTilesData: Array<RGBColor> = [...tiles];
        for(let i = 0; i < numOfTiles; i++) {
            newTilesData[i] = calculateTile(sources, i, width, height);
            // Check if this tile is the new closest color
            const colorDelta = (1/255) * (1/(Math.sqrt(3))) * 
                Math.sqrt( Math.pow(targetColor.r - newTilesData[i].r, 2) + Math.pow(targetColor.g - newTilesData[i].g, 2) + Math.pow(targetColor.b - newTilesData[i].b, 2)
            );
            if(colorDelta < bestColorDelta) {
                bestColorIndex = i;
                bestColorDelta = colorDelta;
            }
            setClosestColorTileIndex(bestColorIndex);
            setClosestColorDelta(bestColorDelta);
        }
        setTiles(newTilesData);
    }, [sources]);

    useEffect(() => {
        // Check win condition and end game if won
        if(closestColorDelta < 0.1) {
            setGameState(GameState.GameOver);
            return;
        }

        // Check moves and update state
        if(movesLeft < 1) {
            setGameState(GameState.GameOver);
        } else if(movesLeft < maxMoves - 2) {
            setGameState(GameState.TileDragging);
        }
    }, [movesLeft, closestColorDelta]);

    const setSourceColor = (index: number, newColor: RGBColor) => {
        const newSourcesData = [...sources];
        newSourcesData[index] = newColor;
        setSources(newSourcesData);
        const newMoves = movesLeft - 1;
        setMovesLeft(newMoves);
    }

    const getDescriptionText = (): string => {
        switch(gameState) {
            case GameState.SourceColorsSelection:
                return 'Click Source circles to select initial colors';
            case GameState.TileDragging:
                return 'Drag Tiles into Source circles to create new colors (get <10% Difference to win)';
            default:
                return 'Game Over';
        }
    }

    return <div className='game-container'>
        <div className='output-data-container'>
            <div>User ID: { userId }</div>
            <div>Moves left: { movesLeft }</div>
            <div className='colors-data'>
                <div>
                    <span>Target color:</span>
                    <div id='target-color-tile' className='color-display-tile' 
                        style={{ backgroundColor: `rgb(${targetColor.r}, ${targetColor.g}, ${targetColor.b})` }} />
                    <Tooltip
                        anchorId='target-color-tile'
                        place="bottom"
                        content={`R: ${targetColor.r}, G: ${targetColor.g}, B: ${targetColor.b}`}
                    />
                </div>
                <div>
                    <span>Closest color:</span>
                    <div id='closest-color-tile' className='color-display-tile' 
                        style={{ backgroundColor: `rgb(${tiles[closestColorTileIndex]?.r}, 
                            ${tiles[closestColorTileIndex]?.g}, ${tiles[closestColorTileIndex]?.b})` 
                        }} 
                    />
                    <Tooltip
                        anchorId='closest-color-tile'
                        place="bottom"
                        content={`R: ${tiles[closestColorTileIndex]?.r}, G: ${tiles[closestColorTileIndex]?.g}, 
                            B: ${tiles[closestColorTileIndex]?.b}`}
                    />
                </div>
            </div>
            <div>Difference: {Math.floor(closestColorDelta * 100)}%</div>
        </div>

        <FieldDisplay sources={sources} tiles={tiles} width={width} height={height} 
            gameState={gameState} setSourceColor={setSourceColor} closestColorIndex={closestColorTileIndex} />

        <h2 className='game-desc-text'>{ getDescriptionText() }</h2>

        <GameOverPopup gameState={gameState} colorDelta={closestColorDelta} restartGame={restartGame} />
    </div>;
}

export default GameContainer;