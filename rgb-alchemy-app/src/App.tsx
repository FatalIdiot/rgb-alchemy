import { useState, useEffect } from 'react';
import LoadingScreen from './components/helpers/loadingScreen';
import GameContainer from './components/gameContainer';
import { ServerData } from './types';

function App() {
  const [serverData, setServerData] = useState<ServerData | null>(null);
  const [requestError, setRequestError] = useState<boolean>(false);

  useEffect(() => {
    // Send init request
    requestData('/init');
  }, []);

  const requestData = (relativeUrl: string) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}${relativeUrl}`)
      .then((response) => {
        return response.json();
      })
      .catch(() => {
        setRequestError(true);
        alert('Server request failed');
      })
      .then((data) => {
        if(!data)
          return;
        setServerData(data);
      });
  }

  const restartGame = () => {
    setServerData(null);
    requestData(`/init/user/${serverData?.userId}`);
  }

  return (
    <div className="app-container">
      { serverData === null ?
        <LoadingScreen />
      :
        <div>
          <h1 className='text-logo'>RGB Alchemy</h1>
          <GameContainer {...serverData} restartGame={restartGame} />
        </div>
      }
    </div>
  );
}

export default App;
