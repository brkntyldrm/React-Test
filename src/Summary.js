import React, { Component } from "react";
import {
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";

export default class Summary extends Component {
  handleCart() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle className="mr-auto" nav caret>
          Sepet
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
              {cartItem.product.productName}
              <Badge color="success">{cartItem.quantity}</Badge>
              <Button
                size="sm"
                color="danger"
                onClick={() => this.props.removeFromCart(cartItem)}
              >
                Delete
              </Button>
            </DropdownItem>
          ))}
          ;
          <DropdownItem divider />
          <DropdownItem>
            {
              <NavLink tag={Link} to="/cart">
                To Cart
              </NavLink>
            }
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  render() {
    return <div>{this.handleCart()}</div>;
  }
}
