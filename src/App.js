import { useRef, useState } from 'react'
import './App.css';

import { Fireworks } from '@fireworks-js/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Text,
  useDisclosure
} from '@chakra-ui/react'

import { EmailIcon } from '@chakra-ui/icons'

function App() {
  const [display, setDisplay] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef(null);
  const toggle = () => {
    // if (ref.current.isRunning) {
    //   ref.current.stop()
    // } else {
    //   ref.current.start()
    // }
    onOpen();
    setDisplay(!display);
  }

  return (
    <>
      <div
        style={{ display: 'flex', position: 'relative', zIndex: 99999, justifyContent: 'center'}}>
        {!display? <IconButton onClick={toggle} colorScheme='red' className='my-button' icon={<EmailIcon/>}></IconButton> : <div></div>}
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
            <Text>View a summary of all your customers over the last month.</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
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
