'use strict';

import React from 'react';
import { withRouter } from 'react-router-dom';import {FieldGroup,  FormControl, FormGroup, HelpBlock, Container, ButtonToolbar, Button} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

require('../../styles/vendor/VendorAdd.css');

/**
 * Component to register a new vendor for the application
 */
class VendorAddComponent extends React.Component {
  
  /**
   * Constructor
   */
  constructor() {
      super();
      this.vendorURL = 'http://localhost:3000/api/vendors';
      this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
      this.state = { name: '', budget: '', address: ''};
      this.handleChangeName = this.handleChangeName.bind(this);
      this.handleChangeAddress = this.handleChangeAddress.bind(this);
  }

  /**
   * Sets new value to name property of state with the one entered on the input
   */
  handleChangeName = (event) => {
      this.setState({ name: event.target.value });
  }

  /**
   * Sets new value to address property of state with the one entered on the input
   */
  handleChangeAddress = (event) => {
      this.setState({ address: event.target.value });
  }

  /**
   * Sends the vendor information to API to create a new vendor
   */
  handleOk = () => {
      var product = {
          name: this.state.name,
          address: this.state.address
      };
    
      fetch(this.vendorURL + '?access_token=' + this.access_token, {
              method: 'POST',
              headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
              body: JSON.stringify(product)
          }).then((response) => response.json())
          .then((responseJson) => { 
            this.props.history.push('/vendor-list'); 
          }).catch((error) => { console.error(error); });
  };

  /**
   * Redirects to vendor list page
   */
  handleGoList = () => {
      this.props.history.push('/vendor-list');
  };

  /** Renders the vendor add component */
  render() {
    return (
      <div className="vendoradd-component">
        <Container>
          <ButtonToolbar>
          <Button onClick = { this.handleClick }><FontAwesomeIcon icon="ok" /></Button>
          <Button onClick = { this.handleGoList }><FontAwesomeIcon icon="list" /></Button> 
          </ButtonToolbar>
          <FormGroup controlId = "formName">
              <span> Name </span> <FormControl type = "text"
              placeholder = "Enter Vendor Name"
              value = { this.state.name }
              onChange = { this.handleChangeName }
              />
          </FormGroup>                
          <FormGroup controlId = "formAddress">
              <span> Address </span><FormControl type = "text"
              placeholder = "Enter Address"
              value = { this.state.address }
              onChange = { this.handleChangeAddress }
              />
          </FormGroup>
          <ButtonToolbar>
            <Button onClick = { this.handleOk }><FontAwesomeIcon icon="ok" /> </Button> 
            <Button onClick = { this.handleGoList }><FontAwesomeIcon icon="list" /> </Button>
          </ButtonToolbar>
        </Container>
      </div>
    );
  }
}

VendorAddComponent.displayName = 'VendorVendorAddComponent';

// VendorAddComponent.propTypes = {};
// VendorAddComponent.defaultProps = {};

export default withRouter(VendorAddComponent);
