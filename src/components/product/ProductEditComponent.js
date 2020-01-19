'use strict';

import React from 'react';

import { Button, ButtonToolbar, FormGroup, FormControl, Container, Media, Col, Row } from 'react-bootstrap';
import { withRouter } from 'react-router-dom'; import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
require('../../styles/product/ProductEdit.css');

class ProductEditComponent extends React.Component {

    constructor(props) {
        super(props);
        this.productURL = 'http://localhost:3000/api/products/';
        this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
        this.props = props;
        this.state = { id: 0, name: '', code: '', price: '', stock: '', description: '', img: '' };
        this.handleChangeCode = this.handleChangeCode.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleChangeImg = this.handleChangeImg.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleChangeStock = this.handleChangeStock.bind(this);
    }
    handleClick = () => {
        var product = {
            id: this.state.id,
            name: this.state.name,
            code: this.state.code,
            price: this.state.price,
            description: this.state.description,
            stock: this.state.stock,
            img: this.state.img
        };

        fetch(this.productURL + this.state.id + '?access_token=' + this.access_token, {
            method: 'PUT',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', },
            body: JSON.stringify(product)
        }).then((response) => response.json())
            .then((responseJson) => { this.props.history.push('/product-show/' + this.state.id); })
            .catch((error) => { console.error(error); });
    };

    componentDidMount() {
        fetch(this.productURL + this.props.match.params.id + '?access_token=' + this.access_token)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState(responseJson);
                console.log(responseJson);
            })
            .catch((error) => { console.error(error); });
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
            <div className="productedit-component">
                <Container>
                    <h1>Product Edit</h1>
                    <Row className="show-Container">
                        <Col xs={12} sm={12} md={5}>
                            <Media style={{ paddingBottom: '1rem' }}>
                                <img style={{ clip: 'rect(0px,350px,200px,0px)', position: 'relative' }} width={350} src={this.state.img} alt="Image" />
                            </Media>
                        </Col>
                        <Col>
                            <Media>
                                <Media.Body>
                                    <Container>
                                        <ButtonToolbar>
                                            <Button onClick={this.handleClick}><FontAwesomeIcon icon="save" /></Button>
                                        </ButtonToolbar>
                                        <h2>Name: {this.state.name}</h2>
                                        <FormGroup controlId="formName">
                                            <span> Name </span> <FormControl type="text"
                                                placeholder="Enter text"
                                                value={this.state.name}
                                                onChange={this.handleChangeName}
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="formCode">
                                            <span> Code </span> <FormControl type="text"
                                                placeholder="Enter text"
                                                value={this.state.code}
                                                onChange={this.handleChangeCode}
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="formPrice">
                                            <span> Price </span> <FormControl type="text"
                                                placeholder="Enter text"
                                                value={this.state.price}
                                                onChange={this.handleChangePrice}
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="formImg">
                                            <span> Img </span> <FormControl type="text"
                                                placeholder="Enter text"
                                                value={this.state.img}
                                                onChange={this.handleChangeImg}
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="formStock">
                                            <span> Stock </span> <FormControl type="text"
                                                placeholder="Enter text"
                                                value={this.state.stock}
                                                onChange={this.handleChangeStock}
                                            />
                                        </FormGroup>
                                        <FormGroup controlId="formDescription">
                                            <span> Description </span>
                                            <FormControl type="text"
                                                placeholder="Description" className="textarea"
                                                value={this.state.description}
                                                onChange={this.handleChangeDescription}
                                            />
                                        </FormGroup>
                                        <ButtonToolbar>
                                            <Button onClick={this.handleClick}><FontAwesomeIcon icon="save" /></Button>
                                        </ButtonToolbar>
                                    </Container>
                                </Media.Body>
                            </Media>
                        </Col>
                    </Row>

                </Container>
            </div>
        );
    }
}

ProductEditComponent.displayName = 'ProductProductEditComponent';

// Uncomment properties you need
// ProductEditComponent.propTypes = {};
// ProductEditComponent.defaultProps = {};

export default withRouter(ProductEditComponent);
