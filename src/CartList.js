import React, { Component } from "react";
import { Table, Button, Input, InputGroup } from "reactstrap";

export default class CartList extends Component {
  state = {
    value: [],
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = () => {
    let boo = true;
    this.props.products.map((product) => {
      if(product.productName === this.state.value){
        boo = false; 
        return this.props.addToCart(product)
      }else {
        return this;
      }});
    if (boo) {
      return alert("Hatalı ürün");
    }
  };

  renderCart() {
    return (
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Quantity Per Unit</th>
            <th>Unit Price</th>
            <th>Units In Stock</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {this.props.cart.map((cartItem) => (
            <tr key={cartItem.product.id}>
              <th scope="row">{cartItem.product.id}</th>
              <td>{cartItem.product.productName}</td>
              <td>{cartItem.product.quantityPerUnit}</td>
              <td>{cartItem.product.unitPrice}</td>
              <td>{cartItem.product.unitsInStock}</td>
              <td>{cartItem.quantity}</td>
              <td>
                <Button
                  onClick={() => this.props.addToCart(cartItem.product)}
                  color="success"
                >
                  Add
                </Button>
              </td>
              <td>
                <Button
                  onClick={() => this.props.removeFromCart(cartItem)}
                  color="danger"
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }

  renderInput() {
    return (
      <InputGroup>
        <Input
          list="products"
          placeholder="Search Product"
          type="text"
          onChange={this.handleChange}
        ></Input>

        <Button
          color="success"
          onClick={() => this.handleSubmit()}
        >
          Add
        </Button>
        <datalist id="products">
          {this.props.products.map((item) => (
            <option value={item.productName} key={item.id} />
          ))}
        </datalist>
      </InputGroup>
    );
  }

  render() {
    return (
      <div>
        {this.renderInput()}
        <h1>Cart</h1>
        {this.renderCart()}
      </div>
    );
  }
}
