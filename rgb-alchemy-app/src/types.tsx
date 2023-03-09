export enum GameState {
    SourceColorsSelection,
    TileDragging,
    GameOver
}

export type ServerData = {
    userId: string,
    width: number,
    height: number,
    maxMoves: number,
    target: Array<number>
}

export type RGBColor = {
    r: number,
    g: number,
    b: number
}