import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CartList.css';

export class CartList extends Component {
  onEditCart(cart, quantity, size, complete) {
    let req = {
      id: cart.id,
      color: cart.color,
      delivery: cart.delivery,
      quantity: quantity ? cart.quantity + quantity : cart.quantity,
      size: size ? size : cart.size,
      detail: cart.detail,
      complete: !complete
    };
    this.props.editCart(req);
  }
  renderSelectSize(sizes) {
    var array = sizes.split(',');
    return array.map((value, i) => {
      return (
        <option value={value} key={i}>
          {value}
        </option>
      );
    });
  }
  renderTable() {
    return this.props.carts.map((cart, i) => {
      return (
        <tr key={i}>
          <td className="collapsing">
            <div className="ui fitted checkbox">
              <input
                type="checkbox"
                onClick={() => this.onEditCart(cart, null, null, cart.complete)}
                defaultChecked={cart.complete}
              />{' '}
              <label />
            </div>
          </td>
          <td>
            <img src={cart.detail.img_0} alt="" style={{ width: '80px' }} />
          </td>
          <td>
            <Link to={`/product/${cart.detail.id}`}>{cart.detail.name}</Link>
          </td>
          <td>
            <select
              defaultValue={cart.size}
              onChange={e => this.onEditCart(cart, null, e.target.value)}
            >
              {this.renderSelectSize(cart.detail.size)}
            </select>
          </td>
          <td>฿{cart.detail.price}</td>
          <td className="test">
            <div className="quantity">
              <button
                className="circular ui basic icon button"
                onClick={() =>
                  cart.quantity <= 1 ? null : this.onEditCart(cart, -1)
                }
              >
                <i className="minus icon" />
              </button>
              <label>{cart.quantity}</label>
              <button
                className="circular ui basic icon button"
                onClick={() =>
                  cart.quantity >= 99 ? null : this.onEditCart(cart, +1)
                }
              >
                <i className="plus icon" />
              </button>
            </div>
          </td>
          <td>฿{cart.detail.price * cart.quantity}</td>
          <td>
            <p>ลบ</p>
          </td>
        </tr>
      );
    });
  }
  render() {
    return (
      <section className="cart">
        <div className="ui container">
          <h3
            className="ui top attached header"
            style={{ margin: '10px 0 0 0' }}
          >
            #Cart
          </h3>
          <div
            className="ui bottom attached segment"
            style={{ overflowX: 'auto' }}
          >
            <table className="ui unstackable compact celled table">
              <thead>
                <tr>
                  <th className="collapsing">
                    <div className="ui fitted checkbox">
                      <input
                        type="checkbox"
                        onClick={() =>
                          this.props.carts.forEach(cart =>
                            this.onEditCart(cart, null, null, cart.complete)
                          )
                        }
                        defaultChecked={
                          this.props.carts.length ===
                          this.props.carts.filter(cart => cart.complete).length
                        }
                      />{' '}
                      <label />
                    </div>
                  </th>
                  <th />
                  <th>Name</th>
                  <th>Size</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>{this.renderTable()}</tbody>
              <tfoot className="full-width">
                <tr>
                  <th />
                  <th colSpan="7">
                    <div className="ui right floated small primary labeled icon button">
                      <i className="user icon" /> Add User
                    </div>
                    <div className="ui small button">Approve</div>
                    <div className="ui small  disabled button">Approve All</div>
                  </th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </section>
    );
  }
}

export default CartList;
