// src/App.js
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./routine.css";

const App = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const savedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    setHabits(savedHabits);
  }, []);

  const handleAddHabit = () => {
    if (newHabit.trim() === "") {
      return;
    }

    const updatedHabits = [...habits, { habit: newHabit, date: selectedDate }];
    setHabits(updatedHabits);
    localStorage.setItem("habits", JSON.stringify(updatedHabits));

    setNewHabit("");
  };

  return (
    <div className="app">
      <h1>Habit Tracker</h1>
      <div className="habit-form">
        <input
          type="text"
          placeholder="Add a new habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MM/dd/yyyy"
        />
        <button onClick={handleAddHabit}>Add Habit</button>
      </div>
      <div className="habit-list">
        <h2>Your Habits</h2>
        <ul>
          {habits.map((habit, index) => (
            <li key={index}>
              {habit.habit} - {new Date(habit.date).toDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
