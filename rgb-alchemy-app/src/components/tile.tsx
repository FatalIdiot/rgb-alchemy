import { FC, useState } from 'react';
import { Tooltip } from "react-tooltip";
import { GameState, RGBColor } from '../types';

type TileProps = {
    index: number,
    color: RGBColor,
    gameState: GameState,
    isClosest: boolean
}

const Tile: FC<TileProps> = ({ index, color, gameState, isClosest }) => {
    const [isDragged, setIsDragged] = useState<boolean>(false);
    
    const handleDragStart = (e: React.SyntheticEvent & { dataTransfer?: DataTransfer }) => {
        e.dataTransfer?.setData('color', JSON.stringify(color));
        setIsDragged(true);
    }

    const handleDragEnd = () => {
        setIsDragged(false);
    }

    const canBeDragger: boolean = gameState === GameState.TileDragging;
    return <>
        <div id={index.toString()} className={`field-item tile-item ${isDragged ? 'dragged' : ''}`}
            draggable={canBeDragger} onDragStart={handleDragStart} onDragEnd={handleDragEnd}
            style={{ backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`, border: isClosest ? '3px solid darkred' : '',
                cursor: canBeDragger ? 'grab' : 'initial' 
            }}
        />
        <Tooltip style={{ zIndex: 3 }}
            anchorId={index.toString()}
            place="bottom"
            content={`R: ${color.r}, G: ${color.g}, B: ${color.b}`}
        />
    </>
}

export default Tile;