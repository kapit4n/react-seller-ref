
import React from 'react';
import ReactDOM from 'react-dom';
import { Nav, Navbar, NavDropdown, Form, Image, Button, Container, Row, Col, FormGroup, FormControl} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../styles/App.css';
//import { withRouter } from 'react-router-dom'

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
      <Navbar>
          <Navbar.Brand>
            <a href="/home">React-Seller</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <Nav.Item href={"/home"}>Home</Nav.Item>
            <NavDropdown title="Products"  id="basic-nav-dropdown">
              <Nav.Item href="/product-list">List</Nav.Item>
              <Nav.Item href="/product-add">New</Nav.Item>
            </NavDropdown>
            <NavDropdown  title="Customers"  id="basic-nav-dropdown">
              <Nav.Item href="/customer-list">List</Nav.Item>
              <Nav.Item href="/customer-add">New</Nav.Item>
            </NavDropdown>
            <NavDropdown  title="Orders"  id="basic-nav-dropdown">
              <Nav.Item href="/cart-list">List</Nav.Item>
            </NavDropdown>
            <NavDropdown  title="Vendor"  id="basic-nav-dropdown">
              <Nav.Item href="/vendor-list">List</Nav.Item>
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
            <Nav.Item  href="/cart-current"><FontAwesomeIcon icon="shopping-cart"/>Cart(${this.state.currentTotal})</Nav.Item>
            <Nav.Item  href="/login">Login</Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
       {this.props.children}
      </div>
      )
  }
}

export default App;
