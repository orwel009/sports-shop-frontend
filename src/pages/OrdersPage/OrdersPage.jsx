// src/pages/Orders/OrdersPage.jsx
import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          alert("Please login to view your orders.");
          navigate("/login");
          return;
        }

        const res = await API.get("/order/my-orders");
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const getBadgeColor = (status) => {
    switch (status) {
      case "processing":
        return "bg-warning text-dark";
      case "shipped":
        return "bg-primary";
      case "delivered":
        return "bg-success";
      default:
        return "bg-secondary";
    }
  };

  const getPaymentBadgeColor = (paymentStatus) => {
    switch (paymentStatus) {
      case "paid":
        return "bg-success";
      case "pending":
        return "bg-warning text-dark";
      case "failed":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  if (loading) return <div className="text-center py-5">Loading orders...</div>;

  if (!orders.length)
    return <div className="text-center py-5">You have no orders yet.</div>;

  return (
    <div className="container py-5">
      <h2 className="mb-4">My Orders</h2>
      <div className="row">
        {orders.map((order) => (
          <div key={order._id} className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-truncate">Order ID: {order._id}</h5>
                
                <p className="mb-2">
                  <strong>Total:</strong> ₹{order.totalAmount}
                </p>
                
                <p className="mb-2">
                  <strong>Payment Method:</strong>{" "}
                  {order.paymentMethod.toUpperCase()}
                </p>
                
                <p className="mb-2">
                  <strong>Payment Status:</strong>{" "}
                  <span className={`badge ${getPaymentBadgeColor(order.paymentStatus)}`}>
                    {order.paymentStatus.toUpperCase()}
                  </span>
                </p>
                
                <p className="mb-2">
                  <strong>Order Status:</strong>{" "}
                  <span className={`badge ${getBadgeColor(order.status)}`}>
                    {order.status.toUpperCase()}
                  </span>
                </p>

                <div className="mt-3">
                  <h6>Items:</h6>
                  <ul className="list-group list-group-flush">
                    {order.items.map((item) => (
                      <li key={item.productId} className="list-group-item">
                        {item.name} x {item.quantity} = ₹{item.price * item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="card-footer text-muted text-end">
                {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;