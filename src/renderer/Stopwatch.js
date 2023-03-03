import { Container, Flex, FlexItem, Section, Switch, Text } from 'components';
import React, { useState, useRef, useEffect } from 'react';

function Stopwatch({ startCapture }) {
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [storeTime, setStoreTime] = useState([]);
  const intervalRef = useRef(null);
  const fixedTime = 8 * 3600 * 1000; // 8hr in milliseconds

  const [expiryDate, setExpiryDate] = useState(null);
  const [expTimer, setExpTimer] = useState(null);

  const [expireStoreTime, setExpireStoreTime] = useState(fixedTime);

  const [isToggled, setIsToggled] = useState(false);

  // useEffect(() => {
  //   startTimer();
  //   // eslint-disable-next-line react-hooks/exhaustive-
  // }, []);deps

  // const endTime = new Date()
  // const elapsedTime = endTime.getTime() - startTime.getTime(); // Calculate elapsed time in milliseconds
  // window.electron.ipcRenderer.sendMessage('timer-ended', elapsedTime);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return `${hours}hr :${minutes
      .toString()
      .padStart(2, '0')}min :${seconds.padStart(2, '0')}sec`;
  };

  const formatExpirationTimer =(expTimer)=> {
    const days = Math.floor(expTimer / (1000 * 60 * 60 * 24));
    const hours = Math.floor((expTimer % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((expTimer % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((expTimer % (1000 * 60)) / 1000);
  
    return `Session expires in: ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds.`;
  }


  // expDate---
  useEffect(() => {
    if (expiryDate) {
      const intervalId = setInterval(() => {
        const now = new Date().getTime();

        const distance = expiryDate - now;
        // console.log({expiryDate,now,distance},"nn")
        // console.log(formatTime(distance),"dis--")
        if (distance <= 0) {
          clearInterval(intervalId);
          // console.log(formatTime(expireStoreTime),"ee")
          console.log(expireStoreTime, 'exppp');

          setExpTimer(null);
          setExpiryDate(null);
          stopTimer();

          window.electron.ipcRenderer.sendMessage(
            'timer-ended',
            expireStoreTime
          );

          // alert('Session expired');
        } else {
          // update the timer every second
          setExpTimer(distance);
        }
      }, 1000);

      // clear the timer when the component unmounts
      return () => {
        clearInterval(intervalId);
        setExpTimer(null);
        setExpiryDate(null);
      };
    }
  }, [expiryDate]);

  const startTimer = () => {
    setTimerOn(true);
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime + 10;
        if (newTime >= fixedTime) {
          stopTimer();
          setStoreTime((prevArray) => [...prevArray, fixedTime]);
          return fixedTime;
        } else {
          return newTime;
        }
      });
    }, 10);
  };

  // const saveTime = sessionStore
  // console.log(sessionStore,"save--")

  const stopTimer = () => {
    setTimerOn(false);

    clearInterval(intervalRef.current);

    const consumedTime = time;
    setStoreTime((prevArray) => [...prevArray, consumedTime]);
    setTime(0);
  };

  const sum = storeTime.reduce((pv, cv) => pv + cv, 0);

  // console.log(curr,"s")

  const startSession = () => {
    startCapture();
    // startTimer()
    const now = new Date().getTime();
    const expiryDate = now + 5 * 24 * 60 * 60 * 1000;
    // 5 * 24 * 60 * 60 * 1000
    // console.info(formatTime(expiryDate), 'ererere');
    setExpiryDate(expiryDate);
    setExpTimer(expiryDate - now);
    startTimer();
    setIsToggled(true)
  };

  const stopToggle = () =>{
    if(timerOn){
      setIsToggled(false)
      stopTimer()
    }else{
      return null
    }
  }

  const startToggle = () =>{
    if(!timerOn){
      setIsToggled(true)
      startTimer()
    }else{
      return null
    }
  }
  // console.log(formatTime(expTimer),"exx--")

  // console.log(formatTime(1 * 30 * 1000))

  return (
    <>
    {
      !expTimer &&
      <button onClick={startSession}>Start session</button>
    }
      5days time
      <div>
        {formatExpirationTimer(expTimer)}
      </div>


      <Container
        style={{
          border: '2px solid #000000',
          borderBottom: 'none',
          // width: '50%',
          padding: '5px',
          margin: '0px 0px 0px 0px',
        }}
      >
          <Section>
            <Flex className="wrapper_two" justifyContent="space-between">
              <FlexItem>
                <Text style={{ fontSize: '15px', marginBottom: '5px' }}>
                  Current Session
                </Text>
                <Text
                  style={{
                    fontSize: '40px',
                    marginBottom: '15px',
                    color: 'green',
                  }}
                >
                  {formatTime(time)}
                </Text>
                <Text style={{ fontSize: '18px', marginBottom: '5px' }}>
                  Today (fri UTC)
                </Text>
                <Text
                  style={{
                    fontSize: '22px',
                    fontWeight: 'bolder',
                  }}
                >
                  {formatTime(sum)}
                </Text>
              </FlexItem>

              <FlexItem>
                <Text
                  style={{
                    fontSize: '15px',
                    marginBottom: '5px',
                    textAlign: 'right',
                  }}
                >
                  Online and syncing
                </Text>

                <Switch
                  defaultToggled={isToggled}
                  // onClick={() => {setIsToggled(!isToggled);stopTimer();startTimer()}}
                  onClick={()=>{
                    startToggle();
                    stopToggle()
                  }}
                  size="lg"
                  style={{ width: '100%', justifyContent: 'flex-end' }}
                  styleSwitch={{
                    width: 90,
                    height: 40,
                    marginBottom: '15px',
                    backgroundColor: isToggled && timerOn ? '#008000' : '#fff',
                  }}
                  styleToggle={{
                    width: 30,
                    height: 30,

                    '&[data-toggled-checked="true"]': {
                      left: 'calc(100% - 35px)',
                    },
                    '&[data-toggled-checked="false"]': {
                      background: '#008000',
                    },
                  }}
                />

                <Text
                  style={{
                    fontSize: '18px',
                    marginBottom: '5px',
                    color: 'green',
                    textAlign: 'right',
                  }}
                >
                  This week(UTC)
                </Text>
                <Text
                  style={{
                    fontSize: '22px',
                    fontWeight: 'bolder',
                    textAlign: 'right',
                  }}
                >
                  31:20 of 40 hrs
                </Text>
              </FlexItem>
            </Flex>
            <Flex>
              <FlexItem>
                <Text
                  style={{
                    marginTop: '50px',
                    fontSize: '18px',
                    color: '#00000069',
                    fontWeight: 'bolder',
                  }}
                >
                  Working on:
                </Text>
              </FlexItem>
            </Flex>
          </Section>        

      </Container>
    </>
  );
}

export default Stopwatch;
