import React, { Component } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import Summary from "./Summary";
export default class Navi extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      navCollapsed: true,
      showNavbar: false,
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  EmptyCart = () => {
    return <NavItem>EmptyCart</NavItem>;
  };


  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Serpent</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              {this.props.cart.length > 0 ? (
                <Summary
                  addToCart={this.props.addToCart}
                  removeFromCart={this.props.removeFromCart}
                  cart={this.props.cart}
                />
              ) : (
                () => this.EmptyCart()
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
