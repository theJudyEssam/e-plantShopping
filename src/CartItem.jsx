import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
      let total_cost = 0;
      cart.forEach((item)=>{
        const item_cost = item.cost.slice(1)
        const item_quantity = item.quantity
       // console.log(item.cost.slice(1) , item.quantity)
         total_cost += item_cost * item_quantity
      })
      return total_cost
  };

  const handleContinueShopping = (e) => {
    onContinueShopping(e)
  };



  const handleIncrement = (item) => {
    const quantity = item.quantity + 1;
    console.log(quantity)

    // console.log(item.name)
    dispatch(updateQuantity({ name: item.name, quantity }));

  };

  const handleDecrement = (item) => {
   if(item.quantity === 1){
    removeItem(item);
   }
   else{
    const quantity = item.quantity - 1;
    dispatch(updateQuantity({name:item.name, quantity}));
   }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item))
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const item_cost = item.cost.slice(1); //because the cost is represented as e.g "$12" so one must slice the dollar sign
    return item_cost * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


