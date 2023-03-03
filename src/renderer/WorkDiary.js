import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { Link } from 'react-router-dom';
import { Divide, Square } from 'react-feather';
// import Foods from '../images/foods.jpg';

import {
  Container,
  Section,
  Flex,
  FlexItem,
  Text,
  Button,
  Row,
  Grid,
  Image,
  Card,
  Divider,
} from '../components/index';

function WorkDiary() {
  const { imagestore } = useSelector((state) => state.imageReducer);

  return (
    // <div>
    //   workk
    //   {imagestore.map((itm,j)=>(
    //     <div key={`images${j}`}>
    //       <img src={itm.arg}/>
    //       <p>{itm.dateTime}</p>
    //     </div>
    //   ))}

    //   <button>

    //     <Link to='/'>Back</Link>
    //   </button>
    // </div>
    <Container
      style={{
        // border: '1px solid #000000',
        width: '98%',
        padding: '5px',
        margin: '0px 0px 0px 0px',
      }}
    >
      <Section>
        <Flex>
          <FlexItem>
            <Row style={{ justifyContent: 'space-between' }}>
              <Text>Total: 5:00hrs</Text>
              <Square
                style={{ color: '#008000', backgroundColor: ' #008000' }}
              ></Square>
              <Text>Tracked: 5:00hrs</Text>
              <Square
                style={{ color: '#ffff00', backgroundColor: '#ffff00' }}
              ></Square>
              <Text>Manual: 5:00hrs</Text>
            </Row>
          </FlexItem>

          <FlexItem>
            <Row style={{ justifyContent: 'end' }}>
              <Text> With 0:00 selected:</Text>
              <Button
                style={{
                  marginLeft: '10px',
                  color: '#1413125e',
                  fontWeight: 'bolder',
                  backgroundColor: '#00000033',
                  border: '0px solid #54472e',
                }}
              >
                Edit Activities
              </Button>
            </Row>
          </FlexItem>
        </Flex>
      </Section>
      <Section style={{ padding: '0px', borderBottom: ' 1px solid #000000' }}>
        <Flex
          style={{
            marginBottom: '40px',
            padding: '0px',
            flexDirection: 'initial',
          }}
        >
          <FlexItem
            alignSelf="stretch"
            style={{
              // width: '4%',
              padding: '0px',
              backgroundColor: '#00000014',
            }}
          >
            <Text
              style={{
                marginTop: '50px',
                fontSize: '20px',
                marginLeft: '13px',
              }}
            >
              3
            </Text>
            <Text style={{ marginLeft: '7px' }}>pm</Text>
            <Square
              style={{ width: '20px', marginLeft: '7px', marginTop: '2px' }}
            ></Square>
          </FlexItem>

          <FlexItem style={{ width: '96%', padding: '0px' }}>
            <Grid
              className="grid-Container"
              style={{
                gridTemplateColumns: '1fr 1fr  1fr  1fr  1fr  1fr  ',
                gridGap: '2px',
              }}
            >
              {imagestore.map((itm, j) => (
                <Card backgroundColor="unset" key={j}>
                  <Image src={itm.arg} style={{ width: '100%' }} />
                  <Row style={{ marginLeft: '0px' }}>
                    <Square
                      style={{ width: '16px', marginRight: '4px' }}
                    ></Square>
                    <Text>4:00 PM</Text>
                  </Row>
                </Card>
              ))}
            </Grid>
          </FlexItem>
        </Flex>
      </Section>

      {/* <Section
        style={{
          padding: '0px',
          borderBottom: ' 1px solid #000000',
          marginTop: '40px',
        }}
      >
        <Flex
          style={{
            marginBottom: '40px',
            padding: '0px',
            flexDirection: 'initial',
          }}
        >
          <FlexItem
            alignSelf="stretch"
            style={{
              // width: '4%',
              padding: '0px',
              backgroundColor: '#00000014',
            }}
          >
            <Text
              style={{
                marginTop: '50px',
                fontSize: '20px',
                marginLeft: '13px',
              }}
            >
              3
            </Text>
            <Text style={{ marginLeft: '7px' }}>pm</Text>
            <Square
              style={{ width: '20px', marginLeft: '7px', marginTop: '2px' }}
            ></Square>
          </FlexItem>

          <FlexItem style={{ width: '96%', padding: '0px' }}>
            <Grid
              className="grid-Container"
              style={{
                gridTemplateColumns: '1fr 1fr  1fr  1fr  1fr  1fr  ',
                gridGap: '2px',
              }}
            >
              <Card backgroundColor="unset">
                <Image src={Foods} style={{ width: '100%' }} />
                <Row style={{ marginLeft: '0px' }}>
                  <Square
                    style={{ width: '16px', marginRight: '4px' }}
                  ></Square>
                  <Text>4:00 PM</Text>
                </Row>
              </Card>
              <Card backgroundColor="unset">
                <Image src={Foods} style={{ width: '100%' }} />
                <Row style={{ marginLeft: '0px' }}>
                  <Square
                    style={{ width: '16px', marginRight: '4px' }}
                  ></Square>
                  <Text>4:00 PM</Text>
                </Row>
              </Card>
              <Card backgroundColor="unset">
                <Image src={Foods} style={{ width: '100%' }} />
                <Row style={{ marginLeft: '0px' }}>
                  <Square
                    style={{ width: '16px', marginRight: '4px' }}
                  ></Square>
                  <Text>4:00 PM</Text>
                </Row>
              </Card>
              <Card backgroundColor="unset">
                <Image src={Foods} style={{ width: '100%' }} />
                <Row style={{ marginLeft: '0px' }}>
                  <Square
                    style={{ width: '16px', marginRight: '4px' }}
                  ></Square>
                  <Text>4:00 PM</Text>
                </Row>
              </Card>
              <Card backgroundColor="unset">
                <Image src={Foods} style={{ width: '100%' }} />
                <Row style={{ marginLeft: '0px' }}>
                  <Square
                    style={{ width: '16px', marginRight: '4px' }}
                  ></Square>
                  <Text>4:00 PM</Text>
                </Row>
              </Card>
              <Card backgroundColor="unset">
                <Image src={Foods} style={{ width: '100%' }} />
                <Row style={{ marginLeft: '0px' }}>
                  <Square
                    style={{ width: '16px', marginRight: '4px' }}
                  ></Square>
                  <Text>4:00 PM</Text>
                </Row>
              </Card>
            </Grid>
          </FlexItem>
        </Flex>
      </Section> */}
    </Container>
  );
}

export default WorkDiary;
