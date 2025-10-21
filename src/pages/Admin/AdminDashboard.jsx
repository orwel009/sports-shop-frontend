import React, { useEffect, useState } from "react";
import { Line, Pie, Bar, Doughnut } from "react-chartjs-2";
import adminAPI from '../../services/adminApi'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    pendingOrders: 0,
    bestSelling: [],
    totalUsers: 0,
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await adminAPI.get("/dashboard"); // your backend
      setStats(res.data.stats);
    } catch (err) {
      console.error(err);
    }
  };

  // Sample chart data
  const sampleLineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales ($)",
        data: [1200, 1900, 3000, 2500, 4000, 3500],
        borderColor: "#007bff",
        backgroundColor: "rgba(0,123,255,0.2)",
        tension: 0.3,
      },
    ],
  };

  const samplePieData = {
    labels: ["Pending", "Shipped", "Delivered", "Cancelled"],
    datasets: [
      {
        label: "Orders",
        data: [12, 40, 30, 8],
        backgroundColor: ["#ffc107", "#0d6efd", "#198754", "#dc3545"],
      },
    ],
  };

  const sampleBarData = {
    labels: ["Nike Air Zoom", "Adidas Ultraboost", "Puma T-shirt", "Reebok Sneakers", "UA Shorts"],
    datasets: [
      {
        label: "Units Sold",
        data: [120, 90, 75, 60, 50],
        backgroundColor: "#0d6efd",
      },
    ],
  };

  const sampleDoughnutData = {
    labels: ["Nike", "Adidas", "Puma", "Reebok", "UA"],
    datasets: [
      {
        label: "Revenue by Brand",
        data: [5000, 4000, 3000, 2000, 1500],
        backgroundColor: ["#0d6efd", "#ffc107", "#198754", "#dc3545", "#6f42c1"],
      },
    ],
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* Metrics Cards */}
      <div className="row mb-4">
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Total Sales</h5>
              <p className="card-text">${stats.totalSales}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Total Orders</h5>
              <p className="card-text">{stats.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h5 className="card-title">Pending Orders</h5>
              <p className="card-text">{stats.pendingOrders}</p>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card text-white bg-info">
            <div className="card-body">
              <h5 className="card-title">Total Users</h5>
              <p className="card-text">{stats.totalUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Sales Over Time</h5>
              <Line data={sampleLineData} />
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Orders by Status</h5>
              <Pie data={samplePieData} />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Top Products</h5>
              <Bar data={sampleBarData} />
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Revenue by Brand</h5>
              <Doughnut data={sampleDoughnutData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;