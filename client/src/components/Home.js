import React, { Component } from 'react';
import { Grid, Row, Col} from 'react-bootstrap';
import PopularSuburbs from './PopularSuburbs.js'
import Autocomplete from './Autocomplete.js'
import suburber from '../img/suburber.png';

class Home extends Component {

  render () {
    return (
      <Grid>
        <Row>
          <Col lgOffset={3}>
            <img className="centre-block" src={suburber} alt="suburber"/>
          </Col>
        </Row>
        <Row>
          <Col lg={6} lgOffset={3}>
            <Autocomplete />
          </Col>
        </Row>
        <Row>
          <Col lg={6} lgOffset={3}>
            <PopularSuburbs />
          </Col>
        </Row>
      </Grid>
    )
  }

}

export default Home;