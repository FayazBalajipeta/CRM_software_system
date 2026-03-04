import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "./Customers.css";

function Customers() {

const [customers,setCustomers]=useState([]);
const [editingId,setEditingId]=useState(null);

const [form,setForm]=useState({
name:"",
email:"",
phone:"",
company:"",
address:"",
salesRep:"",
notes:""
});


// Fetch customers
const fetchCustomers = async () => {
const res = await axios.get("http://localhost:8081/api/customers");
setCustomers(res.data);
};

useEffect(()=>{
fetchCustomers();
},[]);


// Handle input
const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};


// Add or Update customer
const handleSubmit = async () => {

if(editingId){

await axios.put(`http://localhost:8081/api/customers/${editingId}`,form);

setEditingId(null);

}else{

await axios.post("http://localhost:8081/api/customers",form);

}

setForm({
name:"",
email:"",
phone:"",
company:"",
address:"",
salesRep:"",
notes:""
});

fetchCustomers();
};


// Edit button
const handleEdit=(customer)=>{
setForm(customer);
setEditingId(customer.id);
};


// Delete button
const handleDelete=async(id)=>{
await axios.delete(`http://localhost:8081/api/customers/${id}`);
fetchCustomers();
};


return (

<div className="dashboard-layout">

<Sidebar/>

<div className="customers-content">

<h2>Customer Management</h2>

<div className="customer-form">

<input name="name" placeholder="Name" value={form.name} onChange={handleChange}/>

<input name="email" placeholder="Email" value={form.email} onChange={handleChange}/>

<input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange}/>

<input name="company" placeholder="Company" value={form.company} onChange={handleChange}/>

<input name="address" placeholder="Address" value={form.address} onChange={handleChange}/>

<input name="salesRep" placeholder="Assigned Sales Rep" value={form.salesRep} onChange={handleChange}/>

<textarea name="notes" placeholder="Notes" value={form.notes} onChange={handleChange}/>

<button onClick={handleSubmit}>
{editingId ? "Update Customer" : "Add Customer"}
</button>

</div>


<table className="customers-table">

<thead>
<tr>
<th>Name</th>
<th>Email</th>
<th>Phone</th>
<th>Company</th>
<th>Sales Rep</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{customers.map((c)=>(
<tr key={c.id}>

<td>{c.name}</td>
<td>{c.email}</td>
<td>{c.phone}</td>
<td>{c.company}</td>
<td>{c.salesRep}</td>

<td>

<button
className="edit-btn"
onClick={()=>handleEdit(c)}
>
Edit
</button>

<button
className="delete-btn"
onClick={()=>handleDelete(c.id)}
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

export default Customers;