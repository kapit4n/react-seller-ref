'use strict';

import React from 'react';
import $ from 'jquery'
import { Table, Image, Button, Container, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';import ProductLineItemComponent from './ProductLineItemComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
require('../../styles/product/ProductList.css');

class ProductListComponent extends React.Component {
  constructor() {
    super();
    this.productURL = 'http://localhost:3000/api/products';
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.state = { products: []};
    //console.log('product');
    //product.actions().find({});
    //console.log(product);
    //product.map(product => console.log(product));
  }

  componentDidMount() {
    fetch(this.productURL + '?access_token=' + this.access_token) 
      .then((response) => response.json())
      .then((responseJson) => { this.setState({products:responseJson});})
      .catch((error) => { console.error(error); });
    this.addPreviewEvent();
  }

  handleAdd = () => {
    this.props.history.push('/product-add/');
  };

  addPreviewEvent() {
    var preview = $('#preview');
    $('.productRow').hover(function () {
      preview.attr('src', $(this).find('.img-thumbnail').attr('src'));
      preview.show();
    }, function () {
      preview.hide();
    });
  }

  render() {
    return (
      <div>
        <Container>
          <Button onClick = { this.handleAdd }><FontAwesomeIcon icon="plus"/></Button>
          <img id="preview" style={{width: 300, position: 'absolute', left: '30%', top: '15%'}}/>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {this.state.products.map(function (product) {
                return  <ProductLineItemComponent key={product.id} product={product}/>;
                })
              }
            </tbody>
          </Table>
          </Container>
      </div>
    );
  }
}

ProductListComponent.displayName = 'ProductProductListComponent';

// Uncomment properties you need
// ProductListComponent.propTypes = {};
// ProductListComponent.defaultProps = {};

export default withRouter(ProductListComponent);
