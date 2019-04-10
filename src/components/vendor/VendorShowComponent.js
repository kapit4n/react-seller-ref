'use strict';

import React from 'react';
import { Media, Container, ListGroup, ListGroupItem, Button, ButtonToolbar } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

require('../../styles/vendor/VendorShow.css');

class VendorShowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.vendorURL = 'http://localhost:3000/api/vendors/';
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.props = props;
    this.state = { vendor : {}};
  }

  handleClick = () => {
    this.props.history.push('/vendor-edit/' + this.state.vendor.id);
  };

  handleRemove = () => {
    fetch(this.vendorURL + "/" + this.state.vendor.id + '?access_token=' + this.access_token, {
      method: 'DELETE',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }
    }).then((response) => response.json())
    .then((responseJson) => { this.props.history.push('/vendor-list');})
    .catch((error) => { console.error(error);});
  };

  componentDidMount() {
    fetch(this.vendorURL + this.props.match.params.id + '?access_token=' + this.access_token) 
      .then((response) => response.json())
      .then((responseJson) => { this.setState({vendor: responseJson});})
      .catch((error) => { console.error(error); });
  }

  render() {
    return (
      <div className="vendorshow-component">
        <Container>
          <Media>
            <Media>
              <img style={{clip: 'rect(0px,350px,200px,0px)', position: 'relative'}} width={350} src="https://i1.wp.com/onsunnyslopefarm.com/wp-content/uploads/2016/12/vendor-booth-10x20_4f317de637994db6183bdc59a72cee30.jpeg" alt="Image"/>
            </Media>
            <Media.Body>
              <ButtonToolbar>
                <Button onClick = { this.handleClick }><FontAwesomeIcon icon="edit" /></Button>
                <Button onClick = { this.handleRemove }><FontAwesomeIcon icon="window-close" /></Button>
              </ButtonToolbar>
              <span>Name: {this.state.vendor.name}</span>
              <ListGroup>
                <ListGroupItem><h4 style={{display: 'inline'}}>Address: </h4>{this.state.vendor.address}</ListGroupItem>
              </ListGroup>
              <p>{this.state.vendor.description}</p>
            </Media.Body>
          </Media>
        </Container>
      </div>
    );
  }
}

VendorShowComponent.displayName = 'VendorVendorShowComponent';

// Uncomment properties you need
// VendorShowComponent.propTypes = {};
// VendorShowComponent.defaultProps = {};

export default withRouter(VendorShowComponent);
