import { useRef, useState } from 'react'
import './App.css';
import { Cron } from "croner";
import { Fireworks } from '@fireworks-js/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  IconButton,
  Text, CircularProgress, CircularProgressLabel,
  useDisclosure
} from '@chakra-ui/react'

import { EmailIcon } from '@chakra-ui/icons';
import Countdown from 'react-countdown';

function getDaysInYear(year) {
  // Check if the year is a leap year
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

  // Return 366 for leap years, 365 for common years
  return isLeapYear ? 366 : 365;
}

function isOver10Minutes(diff) {
  return diff / 1000 <= -600;
}

function App() {
  const year = 2026;
  const newYear = new Date(year + "-01-01T00:00:00+07:00");

  const text = `
  🎉 Happy New Year! 🎉

May this year bring you all the luck, love, and joy that you deserve. 

May every day be filled with new opportunities, every challenge be an opportunity for growth, and every moment be a step toward achieving your dreams. 🌟

May you always feel loved, beautiful, and cherished, because you truly are. 💕

Wishing you a year full of peace, health, and success, with every blessing and good fortune coming your way. 🍀

Here's to a year of exciting adventures, wonderful surprises, and making beautiful memories. May your heart be full and your worries be few! 🥂✨

To you, and to all the memories we’ll create together in the coming year 2025 🌸✨!
  `;
  
  var diff =  newYear.getTime() - new Date().getTime();
  const [display, setDisplay] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef(null);
  
  const Completionist = () => {
    startFirework();
    return <IconButton onClick={toggle} size='lg' className='my-button' icon={<EmailIcon boxSize={10}></EmailIcon>}></IconButton>
  };

  const startFirework = () => {
    ref.current.start();
  }

  const stopFirework = () => {
    ref.current.stop();
  }

  const toggle = () => {
    onOpen();
    setDisplay(!display);
  }
  
  const toggleClose = () => {
    onClose();
    setDisplay(false);
  }

  const job = new Cron('*/10 * * * *', () => {
    if (isOver10Minutes(diff)) {
      ref.current.stop();
    }
  });
  
  if (isOver10Minutes(diff)) {
    return (
     <div style={{ display: 'flex', position: 'relative', zIndex: 99999, justifyContent: 'center', top: '50%'}}>
     {!display? 
       <IconButton onClick={toggle} size='lg' className='my-button' icon={<EmailIcon boxSize={10}></EmailIcon>}></IconButton>: <div></div>
     }
     <Modal isOpen={isOpen} onClose={toggleClose} isCentered>
       <ModalOverlay />
       <ModalContent>
         <ModalCloseButton />
         <ModalBody>
         <Text noOfLines={100}>{text}</Text>
         </ModalBody>
       </ModalContent>
     </Modal>
   </div>
    )
 }

  const renderer = ({days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      return (
        <div>
          <CircularProgress value={days*100/getDaysInYear(year)} color='green.400' thickness='3px'size='120px'>
            <CircularProgressLabel><Text className='my-text'>{days} d</Text></CircularProgressLabel>
          </CircularProgress>
          <CircularProgress value={hours*100/24} color='green.400' thickness='3px'size='120px'>
            <CircularProgressLabel><Text className='my-text'>{hours} h</Text></CircularProgressLabel>
          </CircularProgress>
          <CircularProgress value={minutes*100/60} color='green.400' thickness='3px'size='120px'>
            <CircularProgressLabel><Text className='my-text'>{minutes} m</Text></CircularProgressLabel>
          </CircularProgress>
          <CircularProgress value={seconds*100/60} color='green.400' thickness='3px'size='120px'>
            <CircularProgressLabel><Text className='my-text'>{seconds} s</Text></CircularProgressLabel>
          </CircularProgress>
        </div>
      )
    }
  };

  return (
    <>
      <div style={{ display: 'flex', position: 'relative', zIndex: 99999, justifyContent: 'center', top: '40%'}}>
        {!display? diff > 0?         
          <Countdown date={Date.now() + diff} onStart={stopFirework} renderer={renderer}>
            <Completionist/>
          </Countdown> : 
          <IconButton onClick={toggle} size='lg' className='my-button' icon={<EmailIcon boxSize={10}></EmailIcon>}></IconButton>: <div></div>
        }
        <Modal isOpen={isOpen} onClose={toggleClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
            <Text noOfLines={100}>{text}</Text>
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
