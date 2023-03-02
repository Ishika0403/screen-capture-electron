/* eslint-disable react/self-closing-comp */
// / eslint-disable prefer-template /
// / eslint-disable react-hooks/exhaustive-deps /
// / eslint-disable prettier/prettier /
// / eslint-disable react/button-has-type /
import { getImageList } from '../Action/storeImage';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Stopwatch from './Stopwatch';
import { useDispatch } from 'react-redux';
import {
  Container,
  Divider,
  Flex,
  FlexItem,
  Section,
  Switch,
  Text,
} from 'components/index';
function ScreenCapture() {
  const dispatch = useDispatch();
  const [isToggled, setIsToggled] = useState(false);
  const [screenshot, setScreenshot] = useState(null);
  const [screenShotsStore, setScreenShotsStore] = useState<any>([]);

  const today = new Date();
  const date =
    today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time =
    today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const dateTime = date + ' ' + time;

  // console.log(dateTime,"d--")

  // console.info(dateTime,"datetime90909090909099")
  // console.info(screenShotsStore, 'screenshotstore');

  useEffect(() => {
    dispatch(getImageList(screenShotsStore));
  }, [dispatch, screenShotsStore, screenshot]);

  const getCapturedScreen = () => {
    // console.log('testing');
    window.electron.ipcRenderer.sendMessage('get-screenshot', ['ping']);
    window.electron.ipcRenderer.once('get-screenshot', (arg: any) => {
      // eslint-disable-next-line no-console
      // console.log(arg);
      setScreenshot(arg);
      setScreenShotsStore((prev: any) => [...prev, { arg, dateTime }]);

      // setScreenShotsStore({arg,captureTime} );
      // dispatch(getImageList(screenShotsStore));

      console.info('first');
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getCapturedScreen();
    }, 600000); // 10 minutes
    // dispatch(getImageList(screenShotsStore));

    // console.log(interval, 'inter----');
    return () => clearInterval(interval);
  }, [getCapturedScreen]);

  // console.log(screenShotsStore, 'store---');
  // console.log(screenshot, 'ss---');

  return (
    <>
      <Stopwatch startCapture={getCapturedScreen} />

      {/* <Stopwatch startCapture={undefined} /> */}
      
      <Container
        style={{
          border: '2px solid #000000',
          borderTop:'none',
          // width: '50%',
          padding: '5px',
          margin: '0px 0px 0px 0px',
        }}
      >
        {/* <Section>
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
                0 hr 12 m
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
                2:20 hrs
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
                onClick={() => setIsToggled(!isToggled)}
                size="lg"
                style={{ width: '100%', justifyContent: 'flex-end' }}
                styleSwitch={{
                  width: 90,
                  height: 40,
                  marginBottom: '15px',
                  backgroundColor: isToggled ? '#008000' : '#fff',
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
        </Section> */}
        <Section>
          <Flex>
            <FlexItem>
              <Divider
                id="dir_horizontal"
                orientation="horizontal"
                variant="solid"
                borderWidth="1px"
                style={{
                  borderColor: '#000000',
                }}
              ></Divider>
            </FlexItem>
          </Flex>
        </Section>

        <Section>
          <Flex style={{ marginTop: '40px' }}>
            <FlexItem>
              {' '}
              <Text style={{ fontSize: '18px' }}>Last Screen Capture</Text>
            </FlexItem>
            <FlexItem>
              {' '}
              <Text
                style={{
                  fontSize: '18px',
                  color: '#00000069',
                  fontWeight: 'bolder',
                  textAlign: 'right',
                }}
              >
                3 mint ago
              </Text>
            </FlexItem>
          </Flex>
        </Section>

        <Section>
          <Flex>
            <FlexItem style={{ marginTop: '20px' }}>
              {screenshot ? (
                <img
                  src={screenshot}
                  alt="Last screenshot"
                  // style={{ height: '50px', width: '130px' }}
                />
              ) : (
                <p>No screenshot available</p>
              )}
            </FlexItem>
          </Flex>
        </Section>
        <Section>
          <Flex style={{ marginTop: '20px' }}>
            <FlexItem>
              <Link to="/work-diary">
                <Text style={{ color: '#008000', fontSize: '20px' }}>
                  View work diary
                </Text>
              </Link>
            </FlexItem>
            <FlexItem>
              <Text
                style={{
                  color: '#008000',
                  fontSize: '20px',
                  textAlign: 'right',
                }}
              >
                Add manual time
              </Text>
            </FlexItem>
          </Flex>
        </Section>
      </Container>
    </>
  );
}

export default ScreenCapture;
