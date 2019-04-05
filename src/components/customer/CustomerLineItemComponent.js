'use strict';

import React from 'react';
import {
  ListGroup,
  ListGroupItem,
  Badge,
  Button,
  Container
} from "react-bootstrap";
import { FontAwesomeIcon } from '@fontawesome/react-fontawesome';

require('styles/customer/CustomerLineItem.css');

class CustomerLineItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { customer: this.props.customer};
    this.handleClick = this.removeCustomer.bind(this);
  }

  render() {
    return <tr className={"customerlineitem-component"}>
        <td>
          <a href={"customer-show/" + this.state.customer.id}>
            {this.state.customer.name}
          </a>
        </td>
        <td>{this.state.customer.budget}</td>
        <td>{this.state.customer.address}</td>
        <td>
          {" "}
        <Button onClick={() => this.props.handleClick(this.order.id)} bsStyle="danger">
            <FontAwesomeIcon icon="remove" />
            {" "}
          </Button>
        </td>
      </tr>;
  }
}

CustomerLineItemComponent.displayName = 'CustomerCustomerLineItemComponent';

// Uncomment properties you need
// CustomerLineItemComponent.propTypes = {};
// CustomerLineItemComponent.defaultProps = {};

export default CustomerLineItemComponent;
