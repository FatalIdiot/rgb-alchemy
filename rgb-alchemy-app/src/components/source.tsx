import React, { FC, useState } from 'react';
import { GameState, RGBColor } from '../types';

type SourceProps = {
    color: RGBColor,
    index: number,
    style: Object,
    gameState: GameState,
    setSourceColor: Function
}

const Source: FC<SourceProps> = ({ color, index, style, gameState, setSourceColor }) => {
    const [colorSelectorOpen, setSelectorOpen] = useState<boolean>(false);
    const [isDraggedOver, setDraggedOver] = useState<boolean>(false);

    const handleDrop = (e: React.SyntheticEvent & { dataTransfer?: DataTransfer }) => {
        if(gameState !== GameState.TileDragging || !e.dataTransfer)
            return;
        setSourceColor(index, JSON.parse(e.dataTransfer.getData('color')));
        setDraggedOver(false);
    }

    // Fix bug with drop blocked
    const handleDragOver = (e: React.SyntheticEvent<EventTarget>) => {
        e.stopPropagation();
        e.preventDefault();
        setDraggedOver(true);
    }

    const handleDragLeave = () => {
        setDraggedOver(false);
    }

    // Open color selection popup on source click
    const handleSourceClick = (e: React.SyntheticEvent<EventTarget>) => {
        const target = e.target as Element;
        if(gameState !== GameState.SourceColorsSelection || !target.classList.contains('source-item'))
            return;
        setSelectorOpen(true);
    }

    const handleSelectorClick = (e: React.SyntheticEvent<HTMLElement>) => {
        const target = e.currentTarget;
        setSourceColor(index, JSON.parse(target.dataset.color || ''));
        setSelectorOpen(false);
    }

    // Render color selector when source item is clicked
    const renderColorSelector = (): React.ReactNode => {
        return <div className='source-color-selector' onMouseLeave={() => setSelectorOpen(false)}>
            <div className='selector-item red' data-color={'{ "r": 255, "g": 0, "b": 0 }'} onClick={handleSelectorClick} />
            <div className='selector-item green' data-color={'{ "r": 0, "g": 255, "b": 0 }'} onClick={handleSelectorClick} />
            <div className='selector-item blue' data-color={'{ "r": 0, "g": 0, "b": 255 }'} onClick={handleSelectorClick} />
        </div>;
    }

    return <div className={`field-item source-item ${isDraggedOver ? 'dragged-over' : ''}`} 
        style={Object.assign({}, { backgroundColor: `rgb(${color.r}, ${color.g}, ${color.b})`, 
        cursor: gameState === GameState.SourceColorsSelection ? 'pointer' : 'initial'
    }, style)} onClick={handleSourceClick} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}>
        { colorSelectorOpen && renderColorSelector() }
    </div>;
}

export default Source;