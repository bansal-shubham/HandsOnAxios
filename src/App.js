import React, { useState, useEffect } from "react";
import "./App.css";
import { axios } from "./axios";
import {Reminder } from "./reminder";

function App() {
  const [reminders, setReminders] = useState([]);
  const [formData, setFormData] = useState({});

  //console.log("Reminders :", reminders);
  
  const boola = !reminders || reminders.length===0;

  const getReminders = async () => {
  const response = await axios.get("/rf0v6SgN").catch((err) =>{
    console.log("Error:", err);
  });
  console.log("Response:", response);

  if (response){
    setReminders(response.data);
  }
  };

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
  };

  const addReminder = async (event) => {
  event.preventDefault();
  console.log(formData);
  const response = await axios.post("/rf0v6SgN", formData).catch((err) => {
    console.log("Error: ", err);
  });

  if (response) await getReminders();

  setFormData({});
  };

  useEffect(() => {
  getReminders();
  }, []);

  return (
  <div className="App">
  <h3>Reminders</h3>
  {!boola &&
    reminders.map((reminder, idx) => (
    <Reminder key={idx} {...reminder}/>
    ))}
  <br />
  <h3>Add Reminder</h3>
  <form onSubmit={addReminder}>
    <label htmlFor="id">Id</label>
    <input name="id" placeholder="Id" onChange={handleChange} />
    <label htmlFor="reminder">Reminder</label>
    <input name="reminder" placeholder="Reminder" onChange={handleChange} />
    <label htmlFor="time">Time</label>
    <input name="time" placeholder="Time" onChange={handleChange} />
    <button type="submit">Add</button>
  </form>
  </div>
);
}
	
export default App;