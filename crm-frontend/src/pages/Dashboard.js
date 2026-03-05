import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";


import {
LineChart,
Line,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
ResponsiveContainer,
BarChart,
Bar,
PieChart,
Pie,
Cell,
Legend
} from "recharts";

import "./Dashboard.css";

const API_BASE_URL =
process.env.REACT_APP_API_URL || "http://localhost:8081";

const COLORS = ["#4e73df", "#1cc88a", "#36b9cc", "#e74a3b"];

function Dashboard() {

const token = localStorage.getItem("token");

const [loading,setLoading] = useState(true);

const [stats,setStats] = useState({
customers:0,
leads:0,
tasks:0,
sales:0,
revenue:0
});

const [revenueGraph,setRevenueGraph] = useState([]);
const [leadGraph,setLeadGraph] = useState([]);
const [taskGraph,setTaskGraph] = useState([]);

/* ================================= */
/* Fetch Dashboard Data              */
/* ================================= */

const fetchDashboard = useCallback(async ()=>{

if(!token){
setLoading(false);
return;
}

try{

const headers = {
Authorization:`Bearer ${token}`
};

const [
customersRes,
leadsRes,
tasksRes,
salesRes
] = await Promise.all([
axios.get(`${API_BASE_URL}/api/customers`,{headers}),
axios.get(`${API_BASE_URL}/api/leads`,{headers}),
axios.get(`${API_BASE_URL}/api/tasks`,{headers}),
axios.get(`${API_BASE_URL}/api/sales`,{headers})
]);

const customers = customersRes.data || [];
const leads = leadsRes.data || [];
const tasks = tasksRes.data || [];
const sales = salesRes.data || [];

/* =============================== */
/* Stats                           */
/* =============================== */

const revenueTotal = sales.reduce(
(sum,s)=>sum + Number(s.amount || 0),0
);

setStats({
customers:customers.length,
leads:leads.length,
tasks:tasks.filter(t=>t.status==="Open").length,
sales:sales.length,
revenue:revenueTotal
});

/* =============================== */
/* Revenue Chart                   */
/* =============================== */

const revenueData = sales.map(s=>({
name:s.dealName || "Deal",
revenue:Number(s.amount || 0)
}));

setRevenueGraph(revenueData);

/* =============================== */
/* Lead Conversion Chart           */
/* =============================== */

const leadStatus = {
New:0,
Contacted:0,
Converted:0,
Lost:0
};

leads.forEach(l=>{
if(leadStatus[l.status] !== undefined){
leadStatus[l.status]++;
}
});

setLeadGraph([
{name:"New",value:leadStatus.New},
{name:"Contacted",value:leadStatus.Contacted},
{name:"Converted",value:leadStatus.Converted},
{name:"Lost",value:leadStatus.Lost}
]);

/* =============================== */
/* Task Status Chart               */
/* =============================== */

const taskStatus = {
Open:0,
"In Progress":0,
Completed:0
};

tasks.forEach(t=>{
if(taskStatus[t.status] !== undefined){
taskStatus[t.status]++;
}
});

setTaskGraph([
{name:"Open",tasks:taskStatus.Open},
{name:"In Progress",tasks:taskStatus["In Progress"]},
{name:"Completed",tasks:taskStatus.Completed}
]);

}catch(error){

console.error("Dashboard fetch error:",error);

}

setLoading(false);

},[token]);

/* ================================= */
/* Real Time Refresh                  */
/* ================================= */

useEffect(()=>{

fetchDashboard();

const interval = setInterval(()=>{
fetchDashboard();
},5000); // refresh every 5 sec

return ()=>clearInterval(interval);

},[fetchDashboard]);

/* ================================= */
/* Loading Screen                     */
/* ================================= */

if(loading){
return(
<div className="dashboard-loading">
<h2>Loading CRM Dashboard...</h2>
</div>
);
}

/* ================================= */
/* Dashboard UI                       */
/* ================================= */

return(

<div className="dashboard-layout">

<Sidebar/>

<div className="main-area">



<div className="dashboard-content">

<h2 className="dashboard-title">
CRM Dashboard
</h2>

{/* =============================== */}
{/* Stats Cards                     */}
{/* =============================== */}

<div className="dashboard-cards">

<div className="dashboard-card">
<h3>Customers</h3>
<p>{stats.customers}</p>
</div>

<div className="dashboard-card">
<h3>Leads</h3>
<p>{stats.leads}</p>
</div>

<div className="dashboard-card">
<h3>Open Tasks</h3>
<p>{stats.tasks}</p>
</div>

<div className="dashboard-card">
<h3>Deals</h3>
<p>{stats.sales}</p>
</div>

<div className="dashboard-card revenue">
<h3>Total Revenue</h3>
<p>₹{stats.revenue.toLocaleString()}</p>
</div>

</div>

{/* =============================== */}
{/* Charts Section                  */}
{/* =============================== */}

<div className="dashboard-charts">

{/* Revenue Chart */}

<div className="chart-card">

<h3>Revenue</h3>

<ResponsiveContainer width="100%" height={260}>

<LineChart data={revenueGraph}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Legend/>

<Line
type="monotone"
dataKey="revenue"
stroke="#4e73df"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>

{/* Lead Conversion */}

<div className="chart-card">

<h3>Lead Conversion</h3>

<ResponsiveContainer width="100%" height={260}>

<PieChart>

<Pie
data={leadGraph}
dataKey="value"
outerRadius={90}
label
>

{leadGraph.map((entry,index)=>(
<Cell
key={index}
fill={COLORS[index % COLORS.length]}
/>
))}

</Pie>

<Tooltip/>

<Legend/>

</PieChart>

</ResponsiveContainer>

</div>

{/* Task Status */}

<div className="chart-card">

<h3>Task Status</h3>

<ResponsiveContainer width="100%" height={260}>

<BarChart data={taskGraph}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Legend/>

<Bar
dataKey="tasks"
fill="#f6c23e"
/>

</BarChart>

</ResponsiveContainer>

</div>

</div>

</div>

</div>

</div>

);

}

export default Dashboard;