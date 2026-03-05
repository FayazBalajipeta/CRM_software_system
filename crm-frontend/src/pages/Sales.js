import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "./Sales.css";

function Sales() {

const [sales,setSales] = useState([]);
const [customers,setCustomers] = useState([]);
const [editingId,setEditingId] = useState(null);

const [form,setForm] = useState({
dealName:"",
customerId:"",
amount:"",
stage:"Prospect",
closingDate:"",
salesRep:""
});

useEffect(()=>{
fetchSales();
fetchCustomers();
},[]);

const fetchSales = async ()=>{
const res = await axios.get("http://localhost:8081/api/sales");
setSales(res.data);
};

const fetchCustomers = async ()=>{
const res = await axios.get("http://localhost:8081/api/customers");
setCustomers(res.data);
};

const handleChange = (e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleSubmit = async ()=>{

const payload = {
...form,
customer:{ id: form.customerId }
};

if(editingId){

await axios.put(`http://localhost:8081/api/sales/${editingId}`,payload);
setEditingId(null);

}else{

await axios.post("http://localhost:8081/api/sales",payload);

}

setForm({
dealName:"",
customerId:"",
amount:"",
stage:"Prospect",
closingDate:"",
salesRep:""
});

fetchSales();
};

const handleEdit=(sale)=>{

setForm({
dealName:sale.dealName,
customerId:sale.customer?.id || "",
amount:sale.amount,
stage:sale.stage,
closingDate:sale.closingDate,
salesRep:sale.salesRep
});

setEditingId(sale.id);

};

const handleDelete=async(id)=>{
await axios.delete(`http://localhost:8081/api/sales/${id}`);
fetchSales();
};

return(

<div className="dashboard-layout">

<Sidebar/>

<div className="sales-content">

<h2>Sales Management</h2>

<div className="sale-form">

<input
name="dealName"
placeholder="Deal Name"
value={form.dealName}
onChange={handleChange}
/>

<select
name="customerId"
value={form.customerId}
onChange={handleChange}
>
<option value="">Select Customer</option>

{customers.map(c=>(
<option key={c.id} value={c.id}>
{c.name}
</option>
))}

</select>

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

{sales.map((s)=>(
<tr key={s.id}>

<td>{s.dealName}</td>

<td>{s.customer?.name}</td>

<td>₹{s.amount}</td>

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
onClick={()=>handleEdit(s)}
>
Edit
</button>

<button
className="delete-btn"
onClick={()=>handleDelete(s.id)}
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