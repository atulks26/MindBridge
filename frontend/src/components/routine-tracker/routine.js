import React, { useState, useEffect } from "react";
import { firestore, auth } from "../firebase/firebase"; // Update the path to your Firebase configuration
import {
    collection,
    addDoc,
    getDocs,
    query,
    where,
    orderBy,
} from "firebase/firestore";
import "./routine.css";

const RoutineTracker = () => {
    const [habits, setHabits] = useState([]);
    const [newHabit, setNewHabit] = useState("");
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    useEffect(() => {
        const fetchHabits = async () => {
            if (auth.currentUser) {
                try {
                    const habitsCollection = collection(
                        firestore,
                        "user-habits"
                    );
                    const habitsQuery = query(
                        habitsCollection,
                        where("userId", "==", auth.currentUser.uid),
                        orderBy("date", "desc")
                    );
                    const habitsSnapshot = await getDocs(habitsQuery);

                    const habitsData = habitsSnapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    }));

                    setHabits(habitsData);
                } catch (error) {
                    console.error("Error fetching habits:", error);
                }
            }
        };

        fetchHabits();
    }, [firestore, auth]);

    const handleAddHabit = async () => {
        if (newHabit.trim() === "") {
            return;
        }

        try {
            const habitsCollection = collection(firestore, "user-habits");
            const newHabitDoc = await addDoc(habitsCollection, {
                userId: auth.currentUser.uid,
                habit: newHabit,
                date: selectedDate,
            });

            setHabits([
                {
                    id: newHabitDoc.id,
                    userId: auth.currentUser.uid,
                    habit: newHabit,
                    date: selectedDate,
                },
                ...habits,
            ]);

            setNewHabit("");
        } catch (error) {
            console.error("Error adding habit:", error);
        }
    };

    return (
        <div className="habit-tracker">
            <div className="routine-holder">
                <h1>Habit Tracker</h1>
                <div className="habit-form">
                    <input
                        type="text"
                        placeholder="Add a new habit..."
                        value={newHabit}
                        onChange={(e) => setNewHabit(e.target.value)}
                    />
                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                    />
                    <button onClick={handleAddHabit}>Add Habit</button>
                </div>
                <div className="habit-list">
                    <h2>Your Habits</h2>
                    {habits.map((habit, index) => (
                        <div key={index} className="habit-item">
                            <p>{habit.habit}</p>
                            <p>{new Date(habit.date).toDateString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoutineTracker;
