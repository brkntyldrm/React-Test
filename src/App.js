import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import ProductList from "./ProductList";
import CategoryList from "./CategoryList";
import Navi from "./Navi";
import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";

export default class App extends Component {
  state = {
    products: [],
    currentCategory: "",
    cart: [],
  };

  componentDidMount() {
    this.getProducts();
  }

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }
    fetch(url)
      .then((response) => response.json())
      .then((product) => this.setState({ products: product }));
  };

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  addToCart = (product) => {
    let newCart = this.state.cart;
    let targetItem = newCart.find(
      (cartItem) => cartItem.product.id === product.id
    );
    if (targetItem) {
      this.setState({ quantity: (targetItem.quantity += 1) });
    } else {
      newCart.push({ product: product, quantity: 1 });
      this.setState({ cart: newCart });
    }
  };

  removeFromCart = (product) => {
    console.log(product);
    if (product.quantity > 1) {
      this.setState({ quantity: (product.quantity -= 1) });
    } else {
      let newCart = this.state.cart.filter(
        (c) => c.product.id !== product.product.id
      );
      this.setState({ cart: newCart });
    }
  };

  render() {
    let categoryInfo = { title: "Category List" };
    let productInfo = { title: "Product List" };
    return (
      <div className="App">
        <Container>
          <Row>
            <Navi
              addToCart={this.addToCart}
              removeFromCart={this.removeFromCart}
              cart={this.state.cart}
            ></Navi>
          </Row>
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              ></CategoryList>
            </Col>
            <Col xs="9">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <ProductList
                      {...props}
                      addToCart={this.addToCart}
                      products={this.state.products}
                      currentCategory={this.state.currentCategory}
                      info={productInfo}
                    ></ProductList>
                  )}
                ></Route>
                <Route
                  exact
                  path="/cart"
                  render={(props) => (
                    <CartList
                      {...props}
                      products={this.state.products}
                      cart={this.state.cart}
                      addToCart={this.addToCart}
                      removeFromCart={this.removeFromCart}
                    ></CartList>
                  )}
                ></Route>
                <Route component={NotFound}></Route>
              </Switch>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
