'use strict';

import React from 'react';
import {
  Media, Container, ListGroup,
  ListGroupItem, Button,
  ButtonToolbar, Row, Col
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

require('../../styles/customer/CustomerShow.css');

class CustomerShowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.customerURL = 'http://localhost:3000/api/customers/';
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.props = props;
    this.state = { customer: {} };
  }

  handleClick = () => {
    this.props.history.push('/customer-edit/' + this.state.customer.id);
  };

  handleRemove = () => {
    fetch(this.customerURL + "/" + this.state.customer.id + '?access_token=' + this.access_token, {
      method: 'DELETE',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }
    }).then((response) => response.json())
      .then((responseJson) => { this.props.history.push('/customer-list'); })
      .catch((error) => { console.error(error); });
  };

  componentDidMount() {
    fetch(this.customerURL + this.props.match.params.id + '?access_token=' + this.access_token)
      .then((response) => response.json())
      .then((responseJson) => { this.setState({ customer: responseJson }); })
      .catch((error) => { console.error(error); });
  }

  render() {
    return (
      <div className="customershow-component">
        <Container>
          <Row>
            <Col xs={12} sm={12} md={5}>
              <Media style={{ paddingBottom: '1rem' }}>
                <img style={{ clip: 'rect(0px,330px,200px,0px)', position: 'relative' }} width={330} src="https://mindtouch.com/resources/wp-content/uploads/sites/2/2014/08/happy-customers.png" alt="Image" />
              </Media>
            </Col>
            <Col xs={12} sm={12} md={7}>
              <Media>
                <Media.Body>
                  <ButtonToolbar>
                    <Button style={{ marginRight: '0.5rem' }} onClick={this.handleClick}> <FontAwesomeIcon icon="edit" /></Button>
                    <Button style={{ marginRight: '0.5rem' }} onClick={this.handleRemove}><FontAwesomeIcon icon="times" /> </Button>
                  </ButtonToolbar>
                  <span>Name: {this.state.customer.name}</span>
                  <ListGroup>
                    <ListGroupItem><h4 style={{ display: 'inline' }}>Budget: </h4>{this.state.customer.budget}</ListGroupItem>
                    <ListGroupItem><h4 style={{ display: 'inline' }}>Address: </h4>{this.state.customer.address}</ListGroupItem>
                  </ListGroup>
                  <p>{this.state.customer.description}</p>
                </Media.Body>
              </Media>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

CustomerShowComponent.displayName = 'CustomerCustomerShowComponent';

// Uncomment properties you need
// CustomerShowComponent.propTypes = {};
// CustomerShowComponent.defaultProps = {};

export default CustomerShowComponent;
