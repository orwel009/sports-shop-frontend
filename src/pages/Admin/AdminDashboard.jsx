import React, { useEffect, useState } from "react";
import { Line, Pie, Bar, Doughnut } from "react-chartjs-2";
import adminAPI from "../../services/adminApi";
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
  const [stats, setStats] = useState({});
  const [charts, setCharts] = useState({});

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await adminAPI.get("/admin/dashboard");
      setStats(res.data.stats);
      setCharts(res.data.charts);
    } catch (err) {
      console.error(err);
    }
  };

  // Chart data using real API response
  const lineData = {
    labels: charts.salesOverTime?.map(d => d.month) || [],
    datasets: [
      {
        label: "Sales ($)",
        data: charts.salesOverTime?.map(d => d.total) || [],
        borderColor: "#007bff",
        backgroundColor: "rgba(0,123,255,0.2)",
        tension: 0.3,
      },
    ],
  };

  const pieData = {
    labels: ["Processing", "Shipped", "Delivered"],
    datasets: [
      {
        data: charts.ordersByStatus
          ? [
              charts.ordersByStatus.processing,
              charts.ordersByStatus.shipped,
              charts.ordersByStatus.delivered,
            ]
          : [],
        backgroundColor: ["#ffc107", "#0d6efd", "#198754"],
      },
    ],
  };

  const barData = {
    labels: charts.bestSelling?.map(p => p.name) || [],
    datasets: [
      {
        label: "Units Sold",
        data: charts.bestSelling?.map(p => p.quantity) || [],
        backgroundColor: "#0d6efd",
      },
    ],
  };

  const doughnutData = {
    labels: charts.revenueByBrand ? Object.keys(charts.revenueByBrand) : [],
    datasets: [
      {
        label: "Revenue by Brand",
        data: charts.revenueByBrand
          ? Object.values(charts.revenueByBrand)
          : [],
        backgroundColor: ["#0d6efd", "#ffc107", "#198754", "#dc3545", "#6f42c1"],
      },
    ],
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4">Admin Dashboard</h2>

      {/* Cards */}
      <div className="row mb-4">
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5>Total Sales</h5>
              <p>${stats.totalSales}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5>Total Orders</h5>
              <p>{stats.totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h5>Pending Orders</h5>
              <p>{stats.pendingOrders}</p>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mb-3">
          <div className="card text-white bg-info">
            <div className="card-body">
              <h5>Total Users</h5>
              <p>{stats.totalUsers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5>Sales Over Time</h5>
              <Line data={lineData} />
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5>Orders by Status</h5>
              <Pie data={pieData} />
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5>Top Products</h5>
              <Bar data={barData} />
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">
              <h5>Revenue by Brand</h5>
              <Doughnut data={doughnutData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;