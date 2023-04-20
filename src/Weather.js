import React from 'react';
 import { Card, Button } from 'react-bootstrap';

 class CityWeather extends React.Component {
     constructor(props) {
         super(props);
         this.state = {};
     }

     render() {
         const { forecasts } = this.props;
         return (
             <div>
                 {forecasts.map((forecast, index) => (
                     <Card key={index} style={{ marginBottom: '1rem' }}>
                         <Card.Header>
                             {forecast.date}
                             <Button
                                 variant='link'
                                 onClick={() =>
                                     this.setState((prevState) => ({
                                         [index]: !prevState[index],
                                     }))
                                 }
                             >
                                 Show/Hide Details
                             </Button>
                         </Card.Header>
                         {this.state[index] && (
                             <Card.Body>
                                 <Card.Text>
                                     Description: {forecast.description}
                                 </Card.Text>
                                 <Card.Text>
                                     High Temperature: {forecast.maxTemp} °F
                                 </Card.Text>
                                 <Card.Text>
                                     Low Temperature: {forecast.minTemp} °F
                                 </Card.Text>
                             </Card.Body>
                         )}
                     </Card>
                 ))}
             </div>
         );
     }
}
export default CityWeather;