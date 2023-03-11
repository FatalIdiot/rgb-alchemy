import { FC } from 'react';
import { GameState } from '../types';

type GameOverPopupProps = {
    gameState: GameState,
    colorDelta: number,
    restartGame: Function
}

const GameOverPopup: FC<GameOverPopupProps> = ({ gameState, colorDelta, restartGame }) => {
    const isGameWon = colorDelta < 0.1;
    return <div className='game-over-popup' style={{ transform: `translateX(${gameState === GameState.GameOver ? '0' : '100vw'})` }}>
        <h1 className={`game-over-title ${isGameWon ? 'won' : ''}`}>
            Game Over
        </h1>
        <div>
            { isGameWon ? 'Color picked correctly' : 'Out of moves, color is incorrect' }
        </div>
        <button className='restart-button' onClick={() => restartGame()}>
            Restart Game
        </button>
    </div>;
}

export default GameOverPopup;