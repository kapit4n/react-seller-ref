'use strict';

import React from 'react';
import { Link } from 'react-router-dom';
require('../../styles/vendor/VendorLineItem.css');

class VendorLineItemComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { vendor: this.props.vendor};
  }

  render() {
    return (
      <tr className={'vendorlineitem-component'}>
        <td><Link to={'vendor-show/' + this.state.vendor.id}>{this.state.vendor.name}</Link></td>
        <td>{this.state.vendor.address}</td>
      </tr>
    );
  }
}

VendorLineItemComponent.displayName = 'VendorVendorLineItemComponent';

// Uncomment properties you need
// VendorLineItemComponent.propTypes = {};
// VendorLineItemComponent.defaultProps = {};

export default VendorLineItemComponent;
