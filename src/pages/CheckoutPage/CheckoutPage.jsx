import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../redux/cartSlice";
import API from "../../services/api";
import { useNavigate, useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [checkoutTotal, setCheckoutTotal] = useState(0);
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { buyNow, product } = location.state || {};

  //Set checkout items (cart or buy now)
  useEffect(() => {
    if (buyNow && product) {
      setCheckoutItems([product]);
      setCheckoutTotal(product.price);
    } else {
      setCheckoutItems(cartItems);
      setCheckoutTotal(totalAmount);
    }
  }, [buyNow, product, cartItems, totalAmount]);

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const validateAddress = () => {
    return Object.values(address).every((val) => val.trim() !== "");
  };

  const handlePayment = async (method) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to proceed.");
      navigate("/login");
      return;
    }

    if (!checkoutItems || checkoutItems.length === 0) {
      alert("No items to checkout!");
      return;
    }

    if (!validateAddress()) {
      alert("Please fill in all address fields.");
      return;
    }

    try {
      if (method === "cod") {
        const res = await API.post("/order/cod", {
          items: checkoutItems.map((item) => ({
            productId: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1,
          })),
          totalAmount: checkoutTotal,
          address,
        });

        if (res.data.success) {
          alert("Order placed successfully (Cash on Delivery)!");
          if (!buyNow) dispatch(clearCart());
          navigate("/orders");
        }
      } else {
        const res = await API.post("/order/create-order", {
          items: checkoutItems.map((item) => ({
            productId: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1,
          })),
          totalAmount: checkoutTotal,
          address,
        });

        const options = {
          key: process.env.REACT_APP_RAZORPAY_KEY,
          amount: res.data.amount,
          currency: res.data.currency,
          name: "My Sports Shop",
          description: "Purchase Order",
          order_id: res.data.orderId,
          handler: async (response) => {
            try {
              const verifyRes = await API.post("/order/verify-payment", {
                ...response,
                items: checkoutItems.map((item) => ({
                  productId: item._id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity || 1,
                })),
                address,
              });

              if (verifyRes.data.success) {
                if (!buyNow) dispatch(clearCart());
                navigate("/orders");
              }
            } catch (err) {
              console.error(err);
              alert("Payment verification failed. Please contact support.");
            }
          },
          modal: {
            ondismiss: function () {
              alert("Payment cancelled by user.");
            },
          },
          prefill: {
            name: address.fullName,
            contact: address.phone,
          },
          theme: { color: "#4CAF50" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container py-5">
      <h2>Checkout</h2>

      {/* 🏠 Address Form */}
      <div className="address-form mt-4 mb-5 p-4 border rounded shadow-sm">
        <h5>Shipping Address</h5>
        <div className="row mt-3">
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              name="fullName"
              placeholder="Full Name"
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="text"
              className="form-control"
              name="phone"
              placeholder="Phone Number"
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className="col-md-12 mb-3">
            <input
              type="text"
              className="form-control"
              name="street"
              placeholder="Street Address"
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <input
              type="text"
              className="form-control"
              name="city"
              placeholder="City"
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <input
              type="text"
              className="form-control"
              name="state"
              placeholder="State"
              onChange={handleAddressChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <input
              type="text"
              className="form-control"
              name="pincode"
              placeholder="Pincode"
              onChange={handleAddressChange}
              required
            />
          </div>
        </div>
      </div>

      {/* 🧾 Order Summary */}
      <h4>Order Summary</h4>
      {checkoutItems.length === 0 ? (
        <p>No items in checkout.</p>
      ) : (
        checkoutItems.map((item) => (
          <div key={item._id} className="mb-2">
            <strong>{item.name}</strong> × {item.quantity || 1} = ₹
            {item.price * (item.quantity || 1)}
          </div>
        ))
      )}

      <h4 className="mt-4">Total: ₹{checkoutTotal}</h4>

      <div className="mt-4 d-flex gap-3">
        <button className="btn btn-success" onClick={() => handlePayment("razorpay")}>
          Pay with Razorpay
        </button>
        <button className="btn btn-secondary" onClick={() => handlePayment("cod")}>
          Cash on Delivery
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;