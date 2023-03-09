import { RGBColor } from '../../types'

type ColorDataItem = {
    color: RGBColor,
    relativeDistance: number
}

const calculateTile = (sources: Array<RGBColor>, tileIndex: number, width: number, height: number): RGBColor => {
    // Get tile coords
    const tileY = Math.floor(tileIndex / width);
    const tileX = tileIndex - (tileY * width);

    // Get relevant sources
    const relevantSources: Array<ColorDataItem> = [];
    relevantSources.push({ // top
        color: sources[tileX],
        relativeDistance: (height + 1 - (tileY + 1)) / (height + 1)
    });
    relevantSources.push({ // bottom
        color: sources[width + tileX],
        relativeDistance: (height + 1 - (height - tileY)) / (height + 1)
    });
    relevantSources.push({ // left
        color: sources[width * 2 + tileY],
        relativeDistance: (width + 1 - tileX + 1) / (width + 1)
    });
    relevantSources.push({ // right
        color: sources[width * 2 + height + tileY],
        relativeDistance: (width + 1 - (width - tileX)) / (width + 1)
    });

    let newColor = { r: 0, g: 0, b: 0 };
    relevantSources.forEach(relevantSource => {
        newColor.r += relevantSource.color.r * relevantSource.relativeDistance;
        newColor.g += relevantSource.color.g * relevantSource.relativeDistance;
        newColor.b += relevantSource.color.b * relevantSource.relativeDistance;
    });

    // Normalize
    const normFactor = 255 / Math.max(newColor.r, newColor.g, newColor.b, 255);
    newColor = { r: Math.round(newColor.r * normFactor), g: Math.round(newColor.g * normFactor), 
        b: Math.round(newColor.b * normFactor) };

    return newColor;
}

export default calculateTile;