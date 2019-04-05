'use strict';

import React from 'react';
import { withRouter } from 'react-router-dom';
  
import { Button, ButtonToolbar, FormGroup,  FormControl, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/fontawesome-free-solid';


require('../../styles/product/ProductAdd.css');

class ProductAddComponent extends React.Component {
    handleClick = () => {
        var product = {
            name: this.state.name,
            code: this.state.code,
            price: this.state.price,
            description: this.state.description,
            stock: this.state.stock,
            img: this.state.img
        };
        fetch(this.productURL + '?access_token=' + this.access_token, {
                method: 'POST',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
                body: JSON.stringify(product)
            }).then((response) => response.json())
            .then((responseJson) => { this.props.history.push('/product-list'); })
            .catch((error) => { console.error(error); });

    };

    handleGoList = () => {
        this.props.history.push('/product-list');
    };

    constructor() {
        super();
        this.productURL = 'http://localhost:3000/api/products';
        this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
        this.state = { name: '', code: '', price: '', stock: '', description: '', img: '' };
        this.handleChangeCode = this.handleChangeCode.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeImg = this.handleChangeImg.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleChangeStock = this.handleChangeStock.bind(this);
    };

    componentDidMount() {
        
    }

    handleChangeName = (event) => {
        this.setState({ name: event.target.value });
    }

    handleChangeCode = (event) => {
        this.setState({ code: event.target.value });
    }

    handleChangePrice = (event) => {
        this.setState({ price: event.target.value });
    }

    handleChangeStock = (event) => {
        this.setState({ stock: event.target.value });
    }

    handleChangeDescription = (event) => {
        this.setState({ description: event.target.value });
    }

    handleChangeImg = (event) => {
        this.setState({ img: event.target.value });
    }

    render() {
        return (
          <div className = "productadd-component">
            <Container>
                <ButtonToolbar>
                    <Button onClick = { this.handleClick }><FontAwesomeIcon icon={"check"} /></Button>
                    <Button onClick = { this.handleGoList }><FontAwesomeIcon icon="list" /></Button> 
                </ButtonToolbar>
                <FormGroup controlId = "formName">
                    <span> Name </span> <FormControl type = "text"
                    placeholder = "Enter text"
                    value = { this.state.name }
                    onChange = { this.handleChangeName }
                    />
                </FormGroup>
                <FormGroup controlId = "formCode">
                    <span> Code </span> <FormControl type = "text"
                    placeholder = "Enter text"
                    value = { this.state.code }
                    onChange = { this.handleChangeCode }
                    />
                </FormGroup>
                <FormGroup controlId = "formPrice">
                    <span> Price </span><FormControl type = "text"
                    placeholder = "Enter text"
                    value = { this.state.price }
                    onChange = { this.handleChangePrice }
                    />
                </FormGroup>
                <FormGroup controlId = "formImg">
                    <span> Img </span> <FormControl type = "text"
                    placeholder = "Enter text"
                    value = { this.state.img }
                    onChange = { this.handleChangeImg }
                    />
                </FormGroup>
                <FormGroup controlId = "formStock">
                    <span> Stock </span> <FormControl type = "text"
                    placeholder = "Enter text"
                    value = { this.state.stock }
                    onChange = { this.handleChangeStock }
                    />
                </FormGroup>
                <FormGroup controlId = "formDescription">
                    <span> Description </span>
                    <FormControl
                    componentClass="textarea"
                    type = "text"
                    rows= "10"
                    placeholder = "Enter text"
                    value = { this.state.description }
                    onChange = { this.handleChangeDescription }
                    />
                </FormGroup>
                <ButtonToolbar>
                <Button onClick = { this.handleClick }><FontAwesomeIcon icon="check"/> </Button> <Button
                onClick = { this.handleGoList }><FontAwesomeIcon icon="list" /></Button> </ButtonToolbar>
            </Container>
            </div>
        );
    }
}

ProductAddComponent.displayName = 'ProductProductAddComponent';

// Uncomment properties you need
// ProductAddComponent.propTypes = {};
// ProductAddComponent.defaultProps = {};

export default withRouter(ProductAddComponent);
