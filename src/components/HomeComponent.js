'use strict';

import React from 'react';
import { 
  Container, OverlayTrigger, Tooltip, 
  Row, Col, Image, Button, ButtonToolbar, 
  Nav, Form, FormGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';

import AddingToShoppingCart from './AddingToShoppingCart'

require('../styles/Home.css');

/**
 * Component that displays the shopping products
 */
class HomeComponent extends React.Component {
  sendProductToCart = () => {
    let item = {
      quantity: this.state.quantity,
      price: this.state.product.price,
      totalPrice: this.state.product.price * this.state.quantity,
      discount: 0,
      product: { id: this.state.product.id }
    };

    fetch(this.orderURL + '?access_token=' + this.access_token, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
      body: JSON.stringify(item)
    }).then((response) => {
      this.loadCurrentCartTotal();
      return response.json()
    })
      .then((responseJson) => { this.eventSubscriptors(); })
      .catch((error) => { console.error(error); });
  };

  /**
   * Shows modal to add/send product to shopping cart
   */
  setProductForModal = (product: any) => {
    this.setState({ show: true });
    this.setState({ product: product });
  };

  eventSubscriptors = () => {
    console.log("Throw event to subscriptors");
  }

  /**
   * Constructor that initialize the state and the API urls
   */
  constructor() {
    super();
    this.productURL = 'http://localhost:3000/api/products';
    this.orderURL = 'http://localhost:3000/api/orderDetails';

    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.state = { products: [], quantity: 0, show: false, product: {} };
  }

  /**
   * Loads the products from API and set the state
   */
  componentDidMount() {
    var filter = "";
    if (this.props.location.query && this.props.location.query.search) {
      filter = 'filter[where][or][0][name][regexp]=/' + this.props.location.query.search + '/i&';
    }
    fetch(this.productURL + '?' + filter + 'access_token=' + this.access_token)
      .then((response) => response.json())
      .then((responseJson) => { this.setState({ products: responseJson }); })
      .catch((error) => { console.error(error); });
    this.loadCurrentCartTotal();
  }

  loadCurrentCartTotal = () => {
    fetch(this.orderURL + '/currentTotal?' + 'access_token=' + this.access_token)
      .then((response) => {
        return response.json();
      })
      .then((responseJson) => { this.setState({ currentTotal: responseJson.total }); })
      .catch((error) => { console.error(error); });
  }

  handleChangeQuantity = (event) => {
    this.setState({ quantity: event.target.value });
  }

  /** Render the component */
  render() {

    // close item on cart
    let closeItemOnCart = () => {
      this.setState({ show: false });
    };

    // Save item on cart
    let saveItemOnCart = () => {
      this.setState({ show: false });
      this.sendProductToCart();
    }
    // Image properties
    const cartImageContainer = {
      height: 180, width: 300, overflow: 'hidden'
    };

    // Prices style
    const priceStyle = {
      fontSize: 25
    };

    // shopping card Container padding
    const cartContainerPadding = {
      paddingBottom: 10, paddingTop: 10
    };

    return (
      <div className="home-component">
        <Container>
          <Form style={{ display: 'flex' }}>
            <FormGroup style={{width: '100%'}}>
              <FormControl type="text" placeholder="Search" value={this.state.searchText} onChange={this.handleChangeSearchText} />
            </FormGroup>
            <button class="btn" onClick={() => this.search()}><i class="fa fa-search"></i></button>
          </Form>
          <Nav>
            <Nav.Item> <Link to="/cart-current"><FontAwesomeIcon icon="shopping-cart" />Cart(${this.state.currentTotal})</Link></Nav.Item>
          </Nav>
          <Row className="show-Container">
            {this.state.products.map(function (product) {
              return <Col key={product.id} xs={12} md={4} height={350} style={cartContainerPadding}>
                <div style={cartImageContainer}>
                  <OverlayTrigger
                    placement="right-start"
                    delay={{ show: 250, hide: 400 }}
                    overlay={
                      <Tooltip id={`tooltip-top`}>
                        On stock <strong>{product.stock}</strong>.
                    </Tooltip>
                    }
                  >
                    <Image src={product.img} thumbnail style={{ height: '180px', width: '19rem' }} />
                  </OverlayTrigger>
                </div>
                <Link to={'product-show/' + product.id}>{product.name}</Link><br />
                <span style={priceStyle}>${product.price}</span>
                <ButtonToolbar>
                  <Button onClick={() => this.setProductForModal(product)} style={{ width: 250, marginLeft: 25 }}><FontAwesomeIcon icon={"shopping-cart"} /> Add to Cart </Button>
                </ButtonToolbar>
              </Col>;
            }, this)}
          </Row>
        </Container>

        <AddingToShoppingCart closeItemOnCart={closeItemOnCart} quantity={this.state.quantity}
          container={this} loadCurrentCartTotal={this.loadCurrentCartTotal} product={this.state.product}
          handleChangeQuantity={this.handleChangeQuantity} show={this.state.show} eventSubscriptors={this.eventSubscriptors}
        />

      </div>
    );
  }
}

HomeComponent.displayName = 'HomeComponent';

// Uncomment properties you need
// HomeComponent.propTypes = {};
// HomeComponent.defaultProps = {};

export default HomeComponent;
