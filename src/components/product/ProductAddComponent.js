'use strict';

import React from 'react';
import { browserHistory } from 'react-router';

require('styles/product/ProductAdd.css');
import { Button, ButtonToolbar, FormGroup, Label, FormControl, Grid, Glyphicon} from 'react-bootstrap';

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
            .then((responseJson) => { browserHistory.push('/product-list'); })
            .catch((error) => { console.error(error); });

    };

    handleGoList = () => {
        browserHistory.push('/product-list');
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
            <Grid>
                <ButtonToolbar>
                <Button onClick = { this.handleClick }><Glyphicon glyph="ok"/></Button>
                <Button onClick = { this.handleGoList }><Glyphicon glyph="list"/></Button> 
                </ButtonToolbar>
                <FormGroup controlId = "formName">
                    <Label> Name </Label> <FormControl type = "text"
                    placeholder = "Enter text"
                    value = { this.state.name }
                    onChange = { this.handleChangeName }
                    />
                </FormGroup>
                <FormGroup controlId = "formCode">
                    <Label> Code </Label> <FormControl type = "text"
                    placeholder = "Enter text"
                    value = { this.state.code }
                    onChange = { this.handleChangeCode }
                    />
                </FormGroup>
                <FormGroup controlId = "formPrice">
                    <Label> Price </Label><FormControl type = "text"
                    placeholder = "Enter text"
                    value = { this.state.price }
                    onChange = { this.handleChangePrice }
                    />
                </FormGroup>
                <FormGroup controlId = "formImg">
                    <Label> Img </Label> <FormControl type = "text"
                    placeholder = "Enter text"
                    value = { this.state.img }
                    onChange = { this.handleChangeImg }
                    />
                </FormGroup>
                <FormGroup controlId = "formStock">
                    <Label> Stock </Label> <FormControl type = "text"
                    placeholder = "Enter text"
                    value = { this.state.stock }
                    onChange = { this.handleChangeStock }
                    />
                </FormGroup>
                <FormGroup controlId = "formDescription">
                    <Label> Description </Label>
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
                <Button onClick = { this.handleClick }><Glyphicon glyph="ok"/> </Button> <Button
                onClick = { this.handleGoList }><Glyphicon glyph="list"/></Button> </ButtonToolbar>
            </Grid>
            </div>
        );
    }
}

ProductAddComponent.displayName = 'ProductProductAddComponent';

// Uncomment properties you need
// ProductAddComponent.propTypes = {};
// ProductAddComponent.defaultProps = {};

export default ProductAddComponent;
