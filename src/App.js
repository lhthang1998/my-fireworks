import { useRef } from 'react'
import './App.css';

import { Fireworks } from '@fireworks-js/react'

function App() {

  const ref = useRef(null);
  const toggle = () => {
    if (!ref.current) return
    if (ref.current.isRunning) {
      ref.current.stop()
    } else {
      ref.current.start()
    }
  }

  return (
    <>
    <div
      style={{ display: 'flex', gap: '4px', position: 'absolute', zIndex: 1 }}
    >
      <button onClick={() => toggle()}>Toggle</button>
      <button onClick={() => ref.current.clear()}>Clear</button>
    </div>
    <Fireworks
      ref={ref}
      options={{ 
        acceleration: 1.0,
        delay: {
          min: 30,
          max: 60
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
        background: '#000'
      }}
    />
  </>
  );
}

export default App;
