import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "./Sales.css";

function Sales() {

  const [sales, setSales] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    dealName: "",
    customer: "",
    amount: "",
    stage: "Prospect",
    closingDate: "",
    salesRep: ""
  });

  useEffect(() => {
    fetchSales();
  }, []);

  // Fetch sales from backend
  const fetchSales = async () => {
    try {
      const res = await axios.get("http://localhost:8081/api/sales");
      setSales(res.data);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or Update sale
  const handleSubmit = async () => {
    try {

      if (editingId) {
        await axios.put(`http://localhost:8081/api/sales/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post("http://localhost:8081/api/sales", form);
      }

      setForm({
        dealName: "",
        customer: "",
        amount: "",
        stage: "Prospect",
        closingDate: "",
        salesRep: ""
      });

      fetchSales();

    } catch (error) {
      console.error("Error saving sale:", error);
    }
  };

  // Edit sale
  const handleEdit = (sale) => {
    setForm(sale);
    setEditingId(sale.id);
  };

  // Delete sale
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/sales/${id}`);
      fetchSales();
    } catch (error) {
      console.error("Error deleting sale:", error);
    }
  };

  return (

    <div className="dashboard-layout">

      <Sidebar />

      <div className="sales-content">

        <h2>Sales Management</h2>

        {/* Form */}
        <div className="sale-form">

          <input
            name="dealName"
            placeholder="Deal Name"
            value={form.dealName}
            onChange={handleChange}
          />

          <input
            name="customer"
            placeholder="Customer"
            value={form.customer}
            onChange={handleChange}
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
          />

          <select
            name="stage"
            value={form.stage}
            onChange={handleChange}
          >
            <option>Prospect</option>
            <option>Negotiation</option>
            <option>Won</option>
            <option>Lost</option>
          </select>

          <input
            type="date"
            name="closingDate"
            value={form.closingDate}
            onChange={handleChange}
          />

          <input
            name="salesRep"
            placeholder="Sales Rep"
            value={form.salesRep}
            onChange={handleChange}
          />

          <button onClick={handleSubmit}>
            {editingId ? "Update Deal" : "Add Deal"}
          </button>

        </div>

        {/* Table */}
        <table className="sales-table">

          <thead>
            <tr>
              <th>Deal</th>
              <th>Customer</th>
              <th>Amount</th>
              <th>Stage</th>
              <th>Closing Date</th>
              <th>Sales Rep</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {sales.map((s) => (
              <tr key={s.id}>

                <td>{s.dealName}</td>

                <td>{s.customer}</td>

                <td style={{ fontWeight: "600", color: "#1cc88a" }}>
                  ${s.amount}
                </td>

                <td>
                  <span className={`stage stage-${s.stage.toLowerCase()}`}>
                    {s.stage}
                  </span>
                </td>

                <td>{s.closingDate}</td>

                <td>{s.salesRep}</td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(s)}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(s.id)}
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
}

export default Sales;