import { FC, useEffect, useState, useRef } from 'react';

const LoadingScreen: FC = () => {
    // Store count in a Ref for it to persist between state changes
    const dotsCountRef = useRef<number>(0);
    // Update the value in state for a render refresh
    const [dotsNumber, setDotsNumber] = useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            dotsCountRef.current += 1;
            if(dotsCountRef.current > 3)
                dotsCountRef.current = 0;
            setDotsNumber(dotsCountRef.current);
        }, 1000);
        return () => {
            clearInterval(interval);
        }
    }, []);

    const renderDots = (): string => {
        let dotsString = '';
        for(let i = 0; i < dotsNumber; i++) {
            dotsString += '.';
        }
        return dotsString;
    }

    return <div className='loading-screen'>
        <h1>Loading{ renderDots() }</h1>
    </div>;
}

export default LoadingScreen;