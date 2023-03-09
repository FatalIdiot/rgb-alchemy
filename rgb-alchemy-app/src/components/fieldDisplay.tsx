import { FC, useEffect } from 'react';
import Source from './source';
import Tile from './tile';
import { GameState, RGBColor } from '../types';

// These variables regulate all sizing for rendering in JS and CSS.
// They can be made customizable by user with some kind of a settings screen.
const tileSize = '35px';
const gridGap = '5px';

type FieldDisplayProps = {
    sources: Array<RGBColor>,
    tiles: Array<RGBColor>,
    width: number,
    height: number,
    gameState: GameState,
    setSourceColor: Function,
    closestColorIndex: number
}

const FieldDisplay: FC<FieldDisplayProps> = (props) => {
    const { sources, tiles, width, height, gameState, setSourceColor, closestColorIndex } = props;

    useEffect(() => {
        // Send JS variables to CSS to use them in styling
        const rootEl: HTMLElement | null = document.querySelector(':root');
        if(rootEl === null)
            return;
        rootEl.style.setProperty('--tile-size', tileSize);
        rootEl.style.setProperty('--grid-gap', gridGap);
    }, []);

    const renderTiles = () => {
        return <div className='tiles-grid' style={{ gridTemplateColumns: `repeat(${width}, ${tileSize})`, gridGap: gridGap }}>
            { tiles.map((tile: RGBColor, index: number) => (
                <Tile index={index} color={tile} gameState={gameState} key={index} isClosest={closestColorIndex === index} />
            )) }
        </div>
    }

    const renderSourcesByIndexes = (startIndex: number, endIndex: number, style: Object = {}) => {
        return sources.slice(startIndex, endIndex).map((source: RGBColor, index: number) => (
            <Source color={source} style={style} gameState={gameState}
                index={startIndex + index} key={startIndex + index} setSourceColor={setSourceColor} />
        ));
    }

    return <div className='field-container'>
        <div className='sources-container horizontal top'>
            { renderSourcesByIndexes(0, width, { marginRight: gridGap }) }
        </div>

        <div className='tiles-container'>
            <div className='sources-container vertical'>
                { renderSourcesByIndexes(width * 2, width * 2 + height) }
            </div>
            { renderTiles() }
            <div className='sources-container vertical'>
                { renderSourcesByIndexes(width * 2 + height, width * 2 + height * 2) }
            </div>
        </div>

        <div className='sources-container horizontal bottom'>
            { renderSourcesByIndexes(width, width * 2, { marginRight: gridGap }) }
        </div>
    </div>;
}

export default FieldDisplay;