import React from 'react';
import { Container, Row, Col, Image, Button, Modal, FormGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function AddingToShoppingCart({ closeItemOnCart, quantity, product, show, handleChangeQuantity, container, saveItemOnCart }) {
    return <Modal show={show} onHide={closeItemOnCart} container={container} aria-labelledby="contained-modal-title">
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Adding to Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
                <Row className="show-Container">
                    <Col xs={9} sm={9} md={6} height={60}>
                        <h2>{product.name}</h2><br />
                        <Image width={300} src={product.img} thumbnail /><br />
                        <span> Price: </span>${product.price} <br />
                        <span> Stock: </span>{product.stock} <br />
                        ${product.description}
                    </Col>
                </Row>
            </Container>
            <FormGroup controlId="formCode">
                <span>Quantity</span>
                <FormControl type="number" placeholder="Enter quantity"
                    value={quantity} onChange={handleChangeQuantity} />
            </FormGroup>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={saveItemOnCart}><FontAwesomeIcon icon="check" /></Button>
        </Modal.Footer>
    </Modal>
}

export default AddingToShoppingCart;