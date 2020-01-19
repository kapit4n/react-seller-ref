'use strict';

import React from 'react';

import { Container, ListGroup, ListGroupItem, Button, ButtonToolbar, Modal, Media, FormControl, Col, FormGroup, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import AddingToShoppingCart from '../AddingToShoppingCart';

require('../../styles/product/ProductShow.css');
class ProductShowComponent extends React.Component {
  constructor(props) {
    super(props);
    this.productURL = 'http://localhost:3000/api/products/';
    this.vendorUrl = "http://localhost:3000/api/vendors";
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.state = { product: {}, show: false, quantity: 0, quantityToCart: 0, showCartDialog: false, vendors: [], customerId: 0 };
  }

  handleClick = () => {
    this.props.history.push('/product-edit/' + this.state.product.id);
  };

  handleAddStock = () => {
    this.setState({ show: true });
  };

  handleAddToCart = () => {
    this.setState({ showCartDialog: true });
  };

  handleUpdateStock = () => {

  };

  handleChangeQuantity = (event) => {
    this.setState({ quantity: event.target.value });
  }

  handleChangeQuantityToCart = (event) => {
    this.setState({ quantityToCart: event.target.value });
  }

  handleRemove = () => {
    fetch(this.productURL + "/" + this.state.product.id + '?access_token=' + this.access_token, {
      method: 'DELETE',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }
    }).then((response) => response.json())
      .then((responseJson) => { this.props.history.push('/product-list'); })
      .catch((error) => { console.error(error); });
  };

  componentDidMount() {
    console.log(this.props.match.params);
    if (!this.props.match.params) {
      return;
    }
    fetch(this.productURL + this.props.match.params.id + '?access_token=' + this.access_token)
      .then((response) => response.json())
      .then((responseJson) => { this.setState({ product: responseJson }); })
      .catch((error) => { console.error(error); });
    fetch(this.vendorUrl + "?access_token=" + this.access_token)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          vendors: responseJson
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleChangeVendorId = (event) => {
    this.setState({ vendorId: event.target.value });
  }

  render() {
    let closeStock = () => {
      this.setState({ show: false });
      this.handleUpdateStock();
    };

    let saveStock = () => {
      this.setState({ show: false });
      this.handleUpdateStock();
    };

    let closeCartDialog = () => {
      this.setState({ showCartDialog: false });
      //this.handleUpdateStock();
    };

    let saveCartDialog = () => {
      this.setState({ showCartDialog: false });
      //this.handleUpdateStock();
    };

    return (
      <div className="productshow-component">
        <Container>
          <Media>
            <Media>
              <img style={{ clip: 'rect(0px,350px,200px,0px)', position: 'relative' }} width={350} src={this.state.product.img} alt="Image" />
            </Media>
            <Media.Body>
              <ButtonToolbar>
                <Button onClick={this.handleClick}><FontAwesomeIcon icon="edit" /></Button>
                <Button onClick={this.handleRemove} variant="danger"><FontAwesomeIcon icon="times" /></Button>
                <Button onClick={this.handleAddStock}><FontAwesomeIcon icon="plus" />Stock</Button>
                <Button onClick={this.handleAddToCart}><FontAwesomeIcon icon="shopping-cart" />Cart</Button>
              </ButtonToolbar>
              <span>Name: {this.state.product.name}</span>
              <ListGroup>
                <ListGroupItem><h4 style={{ display: 'inline' }}>Code: </h4>{this.state.product.code}</ListGroupItem>
                <ListGroupItem><h4 style={{ display: 'inline' }}>Stock: </h4>{this.state.product.stock}</ListGroupItem>
                <ListGroupItem><h4 style={{ display: 'inline' }}>Price: </h4>{this.state.product.price}</ListGroupItem>
              </ListGroup>
              <p>{this.state.product.description}</p>
            </Media.Body>
          </Media>
        </Container>

        <Modal show={this.state.show} onHide={closeStock} container={this} aria-labelledby="contained-modal-title">
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Adding to Inventary</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Media className="show-Container">
                <Col xs={9} sm={9} md={6} height={60}>
                  <h2>{this.state.product.name}</h2><br />
                  <Image width={300} src={this.state.product.img} thumbnail /><br />
                  <lspan> Price: </lspan>${this.state.product.price} <br />
                  <FormGroup controlId="formControlsSelect">
                    <lspan>Select Vendor</lspan>
                    <FormControl componentClass="select" placeholder="select" value={this.state.vendorId}
                      onChange={this.handleChangeVendorId}>
                      {this.state.vendors.map(function (vendor) {
                        return (
                          <option value={vendor.id} key={vendor.id}>{vendor.name}</option>
                        );
                      }, this)}
                    </FormControl>
                  </FormGroup>
                  <lspan> Current Stock: </lspan>{this.state.product.stock} <br />
                  <FormGroup controlId="formCode">
                    <lspan>Quantity</lspan>
                    <FormControl type="text" placeholder="Enter quantity"
                      value={this.state.quantity} onChange={this.handleChangeQuantity} />
                  </FormGroup>
                </Col>
              </Media>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={saveStock}><FontAwesomeIcon icon="ok" /></Button>
          </Modal.Footer>
        </Modal>

        <AddingToShoppingCart closeItemOnCart={closeCartDialog}
          quantity={this.state.quantityToCart} container={this}
          saveItemOnCart={saveCartDialog} product={this.state.product}
          handleChangeQuantity={this.handleChangeQuantityToCart} show={this.state.showCartDialog} />


      </div>
    );
  }
}

ProductShowComponent.displayName = 'ProductProductShowComponent';

// Uncomment properties you need
// ProductShowComponent.propTypes = {};
// ProductShowComponent.defaultProps = {};

export default ProductShowComponent;
