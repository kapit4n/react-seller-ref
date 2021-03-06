'use strict';

import React from 'react';
import { Table, Button, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom';
require('../../styles/customer/CustomerList.css');


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
    fetch(this.customerURL + "/" + id + "?access_token=" + this.access_token, headers)
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
          <h1>Customer List</h1>
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
          <Table striped bordered condensed="true" hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Address</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.customers.map(customer => {
                return <tr key={customer.id} className={"customerlineitem-component"}>
                  <td>
                    <Link to={"customer-show/" + customer.id}>
                      {customer.name}
                    </Link>
                  </td>
                  <td>{customer.budget}</td>
                  <td>{customer.address}</td>
                  <td>
                    <Button onClick={() => this.removeCustomer(customer.id)} variant="danger">
                      <FontAwesomeIcon icon="times" />
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
