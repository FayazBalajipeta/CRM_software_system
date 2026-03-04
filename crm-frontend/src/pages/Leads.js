import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "./Leads.css";

function Leads(){

const [leads,setLeads]=useState([]);
const [editingId,setEditingId]=useState(null);

const [form,setForm]=useState({
name:"",
contactInfo:"",
source:"",
status:"New",
salesRep:""
});

useEffect(()=>{
fetchLeads();
},[]);


const fetchLeads = async()=>{
const res = await axios.get("http://localhost:8081/api/leads");
setLeads(res.data);
};


const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};


const handleSubmit = async()=>{

if(editingId){

await axios.put(`http://localhost:8081/api/leads/${editingId}`,form);
setEditingId(null);

}else{

await axios.post("http://localhost:8081/api/leads",form);

}

setForm({
name:"",
contactInfo:"",
source:"",
status:"New",
salesRep:""
});

fetchLeads();
};


const handleEdit=(lead)=>{
setForm(lead);
setEditingId(lead.id);
};


const handleDelete=async(id)=>{
await axios.delete(`http://localhost:8081/api/leads/${id}`);
fetchLeads();
};


return(

<div className="dashboard-layout">

<Sidebar/>

<div className="leads-content">

<h2>Lead Management</h2>

<div className="lead-form">

<input name="name" placeholder="Name" value={form.name} onChange={handleChange}/>

<input name="contactInfo" placeholder="Contact Info" value={form.contactInfo} onChange={handleChange}/>

<select name="source" value={form.source} onChange={handleChange}>
<option value="">Select Source</option>
<option>Referral</option>
<option>Ads</option>
<option>Web</option>
</select>

<select name="status" value={form.status} onChange={handleChange}>
<option>New</option>
<option>Contacted</option>
<option>Converted</option>
<option>Lost</option>
</select>

<input name="salesRep" placeholder="Assigned Sales Rep" value={form.salesRep} onChange={handleChange}/>

<button onClick={handleSubmit}>
{editingId ? "Update Lead" : "Add Lead"}
</button>

</div>

<table className="leads-table">

<thead>
<tr>
<th>Name</th>
<th>Contact</th>
<th>Source</th>
<th>Status</th>
<th>Sales Rep</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{leads.map((l)=>(
<tr key={l.id}>

<td>{l.name}</td>
<td>{l.contactInfo}</td>
<td>{l.source}</td>
<td>{l.status}</td>
<td>{l.salesRep}</td>

<td>

<button className="edit-btn" onClick={()=>handleEdit(l)}>
Edit
</button>

<button className="delete-btn" onClick={()=>handleDelete(l.id)}>
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

export default Leads;