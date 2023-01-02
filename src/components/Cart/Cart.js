import { useContext } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
  const cartCtxt = useContext(CartContext);

  const totalAmount = `$${cartCtxt.totalAmount.toFixed(2)}`;
  const hasItems = cartCtxt.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtxt.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtxt.addItem(item);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtxt.items.map((item) => (
        <CartItem
          key={item.id}
          amount={item.amount}
          name={item.name}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>total amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
