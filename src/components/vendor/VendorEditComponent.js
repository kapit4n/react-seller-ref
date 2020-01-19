'use strict';

import React from 'react';
import { Button, ButtonToolbar, FormGroup, FormControl, Container, Media, Row, Col } from 'react-bootstrap';
import {
  withRouter
} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

require('../../styles/vendor/VendorEdit.css');

/**
 * Component to edit the vendor information
 */
class VendorEditComponent extends React.Component {
  constructor(props) {
    super(props);
    this.vendorURL = 'http://localhost:3000/api/vendors/';
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.props = props;
    this.state = { id: 0, name: '', address: '' };
    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
  }

  /**
   * Sends the new vendor information to API to be updated
   */
  handleOk = () => {
    var vendor = {
      id: this.state.id,
      name: this.state.name,
      budget: this.state.budget,
      address: this.state.address
    };

    fetch(this.vendorURL + this.state.id + '?access_token=' + this.access_token, {
      method: 'PUT',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
      body: JSON.stringify(vendor)
    }).then((response) => response.json())
      .then((responseJson) => { this.props.history.push('/vendor-show/' + this.state.id); })
      .catch((error) => { console.error(error); });
  };

  /**
   * Loads vendor information and set to state
   */
  componentDidMount() {
    fetch(this.vendorURL + this.props.match.params.id + '?access_token=' + this.access_token)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState(responseJson);
        console.log(responseJson);
      })
      .catch((error) => { console.error(error); });
  }

  /** Updates the name property of status */
  handleChangeName = (event) => {
    this.setState({ name: event.target.value });
  }

  /** Updates the address property of status */
  handleChangeAddress = (event) => {
    this.setState({ address: event.target.value });
  }

  /** Renders the vendor edit component */
  render() {
    return (
      <div className="vendoredit-component">
        <Container>
          <h1>Vendor Edit</h1>
          <Row className="show-Container">
            <Col xs={12} sm={12} md={5}>

              <Media>
                <img style={{ clip: 'rect(0px,350px,200px,0px)', position: 'relative' }} width={350} src="https://i1.wp.com/onsunnyslopefarm.com/wp-content/uploads/2016/12/vendor-booth-10x20_4f317de637994db6183bdc59a72cee30.jpeg" alt="Image" />
              </Media>
            </Col>
            <Col>
              <Media>
                <Media.Body>
                  <Container>
                    <ButtonToolbar>
                      <Button onClick={this.handleOk}><FontAwesomeIcon icon="save" /></Button>
                    </ButtonToolbar>
                    <h2>Name: {this.state.name}</h2>
                    <FormGroup controlId="formName">
                      <span> Name </span> <FormControl type="text"
                        placeholder="Enter text"
                        value={this.state.name}
                        onChange={this.handleChangeName}
                      />
                    </FormGroup>
                    <FormGroup controlId="formAddress">
                      <span> Address </span> <FormControl type="text"
                        placeholder="Enter text"
                        value={this.state.address}
                        onChange={this.handleChangeAddress}
                      />
                    </FormGroup>
                    <ButtonToolbar>
                      <Button onClick={this.handleOk}><FontAwesomeIcon icon="save" /></Button>
                    </ButtonToolbar>
                  </Container>
                </Media.Body>
              </Media>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

VendorEditComponent.displayName = 'VendorVendorEditComponent';

// Uncomment properties you need
// VendorEditComponent.propTypes = {};
// VendorEditComponent.defaultProps = {};

export default withRouter(VendorEditComponent);
