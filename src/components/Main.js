
import React from 'react';
import ReactDOM from 'react-dom';
import { Nav, Navbar, NavDropdown, Table, Image, Button, Container, Row, Col, FormGroup, FormControl} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

require('normalize.css/normalize.css');
require('styles/App.css');

let yeomanImage = require('../images/yeoman.png');

class AppComponent extends React.Component {
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
    if (this.props.location.query.search) {
      this.setState({products: [], searchText: this.props.location.query.search});
    }
    this.loadCurrentCartTotal();
  }

  loadCurrentCartTotal() {
    fetch(this.orderDetailURL + '/currentTotal?' + 'access_token=' + this.access_token)
      .then((response) => response.json())
      .then((responseJson) => { this.setState({currentTotal:responseJson.total});})
      .catch((error) => { console.error(error); });
  }

  render() {
    return (
      <div>
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/home">React-Seller</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <Nav.Item eventKey={1} href={"/home"}>Home</Nav.Item>
            <NavDropdown eventKey={2} title="Products"  id="basic-nav-dropdown">
              <Nav.Item eventKey={2.1} href="/product-list">List</Nav.Item>
              <Nav.Item eventKey={2.1} href="/product-add">New</Nav.Item>
            </NavDropdown>
            <NavDropdown eventKey={3} title="Customers"  id="basic-nav-dropdown">
              <Nav.Item eventKey={3.1} href="/customer-list">List</Nav.Item>
              <Nav.Item eventKey={3.1} href="/customer-add">New</Nav.Item>
            </NavDropdown>
            <NavDropdown eventKey={4} title="Orders"  id="basic-nav-dropdown">
              <Nav.Item eventKey={4.1} href="/cart-list">List</Nav.Item>
            </NavDropdown>
            <NavDropdown eventKey={5} title="Vendor"  id="basic-nav-dropdown">
              <Nav.Item eventKey={5.1} href="/vendor-list">List</Nav.Item>
            </NavDropdown>

          </Nav>
          <Navbar.Form pullLeft>
            <FormGroup>
              <FormControl type="text" placeholder="Search" value = { this.state.searchText } onChange = { this.handleChangeSearchText }/>
            </FormGroup>
            {''}
          <Button type="submit" onClick={()=>this.search()} >Search</Button>
          </Navbar.Form>
          <Nav pullRight>
            <Nav.Item eventKey={1} href="/cart-current"><FontAwesomeIcon icon="shopping-cart"/>Cart(${this.state.currentTotal})</Nav.Item>
            <Nav.Item eventKey={2} href="/login">Login</Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
       {this.props.children}
      </div>
      )
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
