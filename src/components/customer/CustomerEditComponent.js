'use strict';

import React from 'react';
import { Button, ButtonToolbar, FormGroup,  FormControl, Container, Media } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

require('styles/customer/CustomerEdit.css');

class CustomerEditComponent extends React.Component {
    constructor(props) {
        super(props);
        this.customerURL = 'http://localhost:3000/api/customers/';
        this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
        this.props = props;
        this.state = { id: 0, name: '', budget: '', address: ''};
    }
    handleOk = () => {
        var customer = {
            id: this.state.id,
            name: this.state.name,
            budget: this.state.budget,
            address: this.state.address
        };

        fetch(this.customerURL + this.state.id + '?access_token=' + this.access_token, {
                method: 'PUT',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                body: JSON.stringify(customer)
            }).then((response) => response.json())
            .then((responseJson) => { this.props.history.push('/customer-show/' + this.state.id);})
            .catch((error) => { console.error(error); });
    };

    componentDidMount() {
        fetch(this.customerURL + this.props.params.id + '?access_token=' + this.access_token)
            .then((response) => response.json())
            .then((responseJson) => { this.setState(responseJson);
                console.log(responseJson); })
            .catch((error) => { console.error(error); });
    }

    handleChangeName = (event) => {
        this.setState({ name: event.target.value });
    }

    handleChangeBudget = (event) => {
        this.setState({ budget: event.target.value });
    }

    handleChangeAddress = (event) => {
        this.setState({ address: event.target.value });
    }

    render() {
        return (
      <div className="customeredit-component">
        <Container>
          <Media>
            <Media.Left>
              <img  style={{clip: 'rect(0px,350px,200px,0px)', position: 'relative'}} width={350} src={this.state.img} alt="Image"/>
            </Media.Left>
            <Media.Body>
             <Container>
              <ButtonToolbar>
                <Button onClick = { this.handleOk }><FontAwesomeIcon icon="ok"/></Button>
              </ButtonToolbar>
              <Media.Heading>Name: {this.state.name}</Media.Heading>
                <FormGroup controlId = "formName">
                    <span> Name </span> <FormControl type = "text"
                    placeholder = "Enter text"
                    value = { this.state.name }
                    onChange = { this.handleChangeName }
                    />
                </FormGroup>
                <FormGroup controlId = "formBudget">
                    <span> Budget </span> <FormControl type = "text"
                    placeholder = "Enter text"
                    value = { this.state.budget }
                    onChange = { this.handleChangeBudget }
                    />
                </FormGroup>
                <FormGroup controlId = "formAddress">
                    <span> Address </span> <FormControl type = "text"
                    placeholder = "Enter text"
                    value = { this.state.address }
                    onChange = { this.handleChangeAddress }
                    />
                </FormGroup>
                <ButtonToolbar>
                  <Button onClick = { this.handleOk }><FontAwesomeIcon icon="ok"/></Button>
                </ButtonToolbar>
            </Container>
            </Media.Body>
          </Media>
        </Container>
      </div>
        );
    }
}


CustomerEditComponent.displayName = 'CustomerCustomerEditComponent';

// Uncomment properties you need
// CustomerEditComponent.propTypes = {};
// CustomerEditComponent.defaultProps = {};

export default withRouter(CustomerEditComponent);
