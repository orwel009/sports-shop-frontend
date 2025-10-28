import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleDecrease = (_id, currentQty) => {
    if (currentQty > 1) {
      dispatch(updateQuantity({ _id, quantity: currentQty - 1 }));
    }
  };

  const handleIncrease = (_id, currentQty) => {
    dispatch(updateQuantity({ _id, quantity: currentQty + 1 }));
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className="d-flex justify-content-between align-items-center mb-3 p-3 border rounded">
              <div className="d-flex align-items-center">
                <img src={item.images[0]} alt={item.name} style={{ width: "80px", marginRight: "20px" }} />
                <div>
                  <h5>{item.name}</h5>
                  <p>₹{item.price}</p>

                  {/* Quantity Control */}
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => handleDecrease(item._id, item.quantity)}
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="form-control text-center mx-2"
                      style={{ width: "50px" }}
                    />
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => handleIncrease(item._id, item.quantity)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                className="btn btn-danger"
                onClick={() => dispatch(removeFromCart(item._id))}
              >
                Remove
              </button>
            </div>
          ))}

          <div className="d-flex justify-content-between align-items-center mt-4">
            <h4>Total: ₹{totalAmount.toFixed(2)}</h4>
            <button className="btn btn-primary" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;