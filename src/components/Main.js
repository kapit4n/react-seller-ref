
import React from 'react';
import { Nav, Navbar, NavDropdown, Form, Image, Button, Container, Row, Col, FormGroup, FormControl} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/App.css';
import { Route, Link } from 'react-router-dom';

import About from './AboutComponent';
import Contact from './ContactComponent';
import Home from './HomeComponent';
import ProductList from './product/ProductListComponent';
import ProductShow from './product/ProductShowComponent';
import ProductAdd from './product/ProductAddComponent';
import ProductEdit from './product/ProductEditComponent';
import VendorList from './vendor/VendorListComponent';
import VendorShow from './vendor/VendorShowComponent';
import VendorAdd from './vendor/VendorAddComponent';
import VendorEdit from './vendor/VendorEditComponent';
import CartCurrent from './cart/CartCurrentComponent';
import CartList from './cart/CartListComponent';
import CartShow from './cart/CartShowComponent';
import CartAdd from './cart/CartAddComponent';
import CartEdit from './cart/CartEditComponent';
import Login from './user/LoginComponent';
import CustomerAdd from './customer/CustomerAddComponent';
import CustomerList from './customer/CustomerListComponent';
import CustomerEdit from './customer/CustomerEditComponent';
import CustomerShow from './customer/CustomerShowComponent';

require('normalize.css/normalize.css');

class App extends React.Component {
  handleChangeSearchText = (event) => {
    this.setState({ searchText: event.target.value });
  }

  search = () => {
    this.props.router.push('/home?search=' + this.state.searchText);
    window.location.reload();
  };

  constructor() {
    super();
    this.productURL = 'http://localhost:3000/api/products';
    this.orderDetailURL = 'http://localhost:3000/api/orderDetails';
    this.access_token = 'T4SH5NkUULeFPSLEXhycyMvt0HMNINxTdOvYjGzGZkxvMmKZeJbne4TdJfcDLAr7';
    this.state = {products: [], searchText: "", currentTotal: 10};
  }

  componentDidMount() {
    if (this.props.location.query && this.props.location.query.search) {
      this.setState({products: [], searchText: this.props.location.query.search});
    }
  }

  render() {
    return (
      <div className="container">
      <Navbar>
          <Navbar.Brand>
            <a href="/home">React-Seller</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Item> <Nav.Link href={"/home"}>Home</Nav.Link></Nav.Item>
            <NavDropdown title="Products"  id="basic-nav-dropdown">
              <Nav.Item ><Nav.Link href="/product-list">List</Nav.Link></Nav.Item>
              <Nav.Item> <Nav.Link href="/product-add">New </Nav.Link></Nav.Item>
            </NavDropdown>
            <NavDropdown  title="Customers"  id="basic-nav-dropdown">
              <Nav.Item> <Nav.Link href="/customer-list">List</Nav.Link></Nav.Item>
              <Nav.Item> <Nav.Link href="/customer-add">New</Nav.Link></Nav.Item>
            </NavDropdown>
            <NavDropdown  title="Orders"  id="basic-nav-dropdown">
              <Nav.Item> <Nav.Link href="/cart-list">List</Nav.Link></Nav.Item>
            </NavDropdown>
            <NavDropdown  title="Vendor"  id="basic-nav-dropdown">
              <Nav.Item> <Nav.Link href="/vendor-list">List</Nav.Link></Nav.Item>
            </NavDropdown>
          </Nav>
          <Form>
            <FormGroup>
              <FormControl type="text" placeholder="Search" value = { this.state.searchText } onChange = { this.handleChangeSearchText }/>
            </FormGroup>
            {''}
          <Button type="submit" onClick={()=>this.search()} >Search</Button>
          </Form>
          <Nav>
            <Nav.Item> <Nav.Link href="/login">Login</Nav.Link></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
       
      <Route path = "/home" component = {Home} />
      <Route path = "/about" component = {About} />
      <Route path = "/contact" component = {Contact} />
      <Route path = "/customer-list" component = {CustomerList} />
      <Route path = "/customer-show/:id" component = {CustomerShow} />
      <Route path = "/customer-add" component = {CustomerAdd} />
      <Route path = "/customer-edit/:id" component = {CustomerEdit} />
      <Route path = "/product-list" component = {ProductList} />
      <Route path = "/product-show/:id" component = {ProductShow} />
      <Route path = "/product-add" component = {ProductAdd} />
      <Route path = "/product-edit/:id" component = {ProductEdit} />
      <Route path = "/vendor-list" component = {VendorList} />
      <Route path = "/vendor-show/:id" component = {VendorShow} />
      <Route path = "/vendor-add" component = {VendorAdd} />
      <Route path = "/vendor-edit/:id" component = {VendorEdit} />
      <Route path = "/cart-current" component = {CartCurrent} />
      <Route path = "/cart-list" component = {CartList} />
      <Route path = "/cart-show/:id" component = {CartShow} />
      <Route path = "/cart-add" component = {CartAdd} />
      <Route path = "/cart-edit/:id" component = {CartEdit} />
      <Route path = "/login" component = {Login} />

      </div>
      )
  }
}

export default App;
