'use strict';

import React from 'react';
import {
  Button,
} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

require('../../styles/customer/CustomerLineItem.css');

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
          <Link to={"customer-show/" + this.state.customer.id}>
            {this.state.customer.name}
          </Link>
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
