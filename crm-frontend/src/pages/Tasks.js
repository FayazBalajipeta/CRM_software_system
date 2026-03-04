import React,{useEffect,useState} from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import "./Tasks.css";

function Tasks(){

const [tasks,setTasks]=useState([]);
const [editingId,setEditingId]=useState(null);

const [form,setForm]=useState({
title:"",
description:"",
dueDate:"",
priority:"Low",
assignedTo:"",
status:"Open"
});

useEffect(()=>{
fetchTasks();
},[]);

const fetchTasks = async()=>{
const res = await axios.get("http://localhost:8081/api/tasks");
setTasks(res.data);
};

const handleChange=(e)=>{
setForm({...form,[e.target.name]:e.target.value});
};

const handleSubmit = async()=>{

if(editingId){

await axios.put(`http://localhost:8081/api/tasks/${editingId}`,form);
setEditingId(null);

}else{

await axios.post("http://localhost:8081/api/tasks",form);

}

setForm({
title:"",
description:"",
dueDate:"",
priority:"Low",
assignedTo:"",
status:"Open"
});

fetchTasks();
};

const handleEdit=(task)=>{
setForm(task);
setEditingId(task.id);
};

const handleDelete=async(id)=>{
await axios.delete(`http://localhost:8081/api/tasks/${id}`);
fetchTasks();
};

return(

<div className="dashboard-layout">

<Sidebar/>

<div className="tasks-content">

<h2>Task Management</h2>

<div className="task-form">

<input name="title" placeholder="Task Title" value={form.title} onChange={handleChange}/>

<input name="description" placeholder="Description" value={form.description} onChange={handleChange}/>

<input type="date" name="dueDate" value={form.dueDate} onChange={handleChange}/>

<select name="priority" value={form.priority} onChange={handleChange}>
<option>Low</option>
<option>Medium</option>
<option>High</option>
</select>

<input name="assignedTo" placeholder="Assigned User ID" value={form.assignedTo} onChange={handleChange}/>

<select name="status" value={form.status} onChange={handleChange}>
<option>Open</option>
<option>In Progress</option>
<option>Completed</option>
</select>

<button onClick={handleSubmit}>
{editingId ? "Update Task" : "Add Task"}
</button>

</div>

<table className="tasks-table">

<thead>
<tr>
<th>Title</th>
<th>Due Date</th>
<th>Priority</th>
<th>Status</th>
<th>Assigned</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{tasks.map((t)=>(
<tr key={t.id}>

<td>{t.title}</td>
<td>{t.dueDate}</td>
<td>{t.priority}</td>
<td>{t.status}</td>
<td>{t.assignedTo}</td>

<td>

<button className="edit-btn" onClick={()=>handleEdit(t)}>
Edit
</button>

<button className="delete-btn" onClick={()=>handleDelete(t.id)}>
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

export default Tasks;