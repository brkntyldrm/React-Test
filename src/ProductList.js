import React, { Component } from "react";
import { Table, Button, Badge, InputGroup, Input } from "reactstrap";

export default class ProductList extends Component {
  state = {
    value: "",
    currentProducts: []
  };

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  };

  renderTable() {
    return (
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Product Name</th>
            <th>Quantity Per Unit</th>
            <th>Unit Price</th>
            <th>Units In Stock</th>
          </tr>
        </thead>
        <tbody>
          {this.props.products.map((product) => (
            <tr key={product.id}>
              <th scope="row">{product.id}</th>
              <td>{product.productName}</td>
              <td>{product.quantityPerUnit}</td>
              <td>{product.unitPrice}</td>
              <td>{product.unitsInStock}</td>
              <td>
                <Button
                  onClick={() => this.props.addToCart(product)}
                  color="success"
                >
                  Add
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
          type="text"
          placeholder="List Products"
          onChange={this.handleChange}
        ></Input>
      </InputGroup>
    );
  }

  render() {
    return (
      <div>
        
        {this.renderInput()}
        <h2>
          {this.props.info.title}{" "}
          <Badge color="success">{this.props.currentCategory}</Badge>
        </h2>
        {this.renderTable()}
      </div>
    );
  }
}
