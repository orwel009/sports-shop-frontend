import React, { useEffect, useState } from "react";
import adminAPI from '../../services/adminApi'
const ManageOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // ✅ Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await adminAPI.get("/order");
        setOrders(res.data);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        alert("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // ✅ Change order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdating(true);
      await adminAPI.put(`/order/${orderId}/status`, { status: newStatus });
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: newStatus } : o
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Failed to update order status");
    } finally {
      setUpdating(false);
    }
  };

  // ✅ Delete order
  const handleDelete = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await adminAPI.delete(`/order/${orderId}`);
      setOrders((prev) => prev.filter((o) => o._id !== orderId));
    } catch (err) {
      console.error("Failed to delete order:", err);
      alert("Failed to delete order");
    }
  };

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

  return (
    <div className="container py-5">
      <h2 className="mb-4">Manage Orders</h2>
      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Items</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user?.name || "N/A"}</td>
                <td>₹{order.totalAmount}</td>
                <td>
                  <span
                    className={`badge ${getPaymentBadgeColor(
                      order.paymentStatus
                    )}`}
                  >
                    {order.paymentStatus.toUpperCase()}
                  </span>
                </td>
                <td>
                  <select
                    className={`form-select ${getBadgeColor(order.status)}`}
                    value={order.status}
                    disabled={updating}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>
                <td>
                  <ul className="mb-0">
                    {order.items.map((item) => (
                      <li key={item.productId}>
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(order._id)}
                    disabled={updating}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrdersPage;