'use strict';

import React from 'react';
import { Table, Image, Button, Container, Row, Col } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import CustomerLineItemComponent from './CustomerLineItemComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
require('styles/customer/CustomerList.css');


class CustomerListComponent extends React.Component {
  constructor() {
    super();
    this.customerURL = "http://localhost:3000/api/customers";
    this.access_token =
      "T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7";
    this.state = { customers: [] };
  }
  componentDidMount() {
    this.loadCustomers();
  }

  loadCustomers = () => {
    fetch(this.customerURL + "?access_token=" + this.access_token)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({ customers: responseJson });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleAdd = () => {
    this.props.history.push("/customer-add/");
  };

  removeCustomer = id => {
    let headers = { method: "DELETE", headers: { Accept: "application/json", "Content-Type": "application/json" } };
    fetch(this.customerURL + "/" + id + "?access_token=" + this.access_token, headers )
      .then(response => response.json())
      .then(responseJson => {
        this.loadCustomers();
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <div>
        <Container>
          <Button onClick={this.handleAdd}>
            <FontAwesomeIcon icon="plus" />
          </Button>
          <img
            id="preview"
            style={{
              width: 300,
              position: "absolute",
              left: "30%",
              top: "15%"
            }}
          />
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.customers.map( customer => {
                return <tr key={customer.Id} className={"customerlineitem-component"}>
                    <td>
                      <a href={"customer-show/" + customer.id}>
                        {customer.name}
                      </a>
                    </td>
                    <td>{customer.budget}</td>
                    <td>{customer.address}</td>
                    <td>
                      <Button onClick={()=>this.removeCustomer(customer.id)} bsStyle="danger">
                        <FontAwesomeIcon icon="remove" />
                      </Button>
                    </td>
                  </tr>;
              })}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

CustomerListComponent.displayName = 'CustomerCustomerListComponent';

// Uncomment properties you need
// CustomerListComponent.propTypes = {};
// CustomerListComponent.defaultProps = {};

export default withRouter(CustomerListComponent);
