import { useRef, useState } from 'react'
import './App.css';

import { Fireworks } from '@fireworks-js/react'
import Countdown from 'react-countdown';

const Completionist = () => <span>You are good to go!</span>;

function App() {
  const [display, setDisplay] = useState(false);
  const ref = useRef(null);
  const toggle = () => {
    // if (ref.current.isRunning) {
    //   ref.current.stop()
    // } else {
    //   ref.current.start()
    // }
    setDisplay(!display);
  }

  return (
    <>
          <div
        style={{ display: 'flex', position: 'relative', zIndex: 99 }}>
        {!display? <button className='button' onClick={() => toggle()}>Toggle</button> : <div></div>}
        {display? <div style={{height: '100vh'}} ><p className='card'>hello</p></div> : <div></div>}
      </div>
    <Fireworks
      ref={ref}
      options={{ 
        acceleration: 1,
        delay: {
          min: 30,
          max: 60
        },
        rocketsPoint: {
          min: 10,
          max: 80
        },
        autoresize: true,
        opacity: 0.5,
        particles: 200,
        intensity: 10,
        flickering: 60,
        sound: {
          enabled: true,
          files: [
            'https://fireworks.js.org/sounds/explosion0.mp3',
            'https://fireworks.js.org/sounds/explosion1.mp3',
            'https://fireworks.js.org/sounds/explosion2.mp3'
          ],
          volume: {
            min: 5,
            max: 10
          }
        }
      }}
      style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: 'fixed',
      }}
    />
  </>
  );
}

export default App;
