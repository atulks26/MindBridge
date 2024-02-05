import React, { useRef, useState } from "react";
import { firestore, auth } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "@firebase/firestore";

function Profilecreation() {
    const nameRef = useRef();
    const ageRef = useRef();
    const dobRef = useRef();
    const contactRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (auth.currentUser) {
            const docRef = doc(firestore, "user-data", auth.currentUser.uid);

            let newData = {
                name: nameRef.current.value,
                age: ageRef.current.value,
                dob: dobRef.current.value,
                contact: contactRef.current.value,
                colormazeLevel: 1,
                emoquestLevel: 1,
                socialsimLevel: 1,
            };

            try {
                const snapshot = await getDoc(docRef);

                if (snapshot.exists()) {
                    const existingData = snapshot.data();

                    const updatedData = { ...existingData, ...newData };
                    await setDoc(docRef, updatedData);

                    console.log("User details saved");

                    window.location.href = "/";
                } else {
                    console.log("Document doesn't exist");
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            console.log("Access denied!");
        }
    };

    return (
        <div className="profile-create">
            <form onSubmit={handleSubmit}>
                {/*Name*/}
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    type="text"
                    required
                    placeholder="Full name"
                    // value={name}
                    // onChange={(e) => setName(e.target.value)}
                    ref={nameRef}
                ></input>

                {/*Age*/}
                <label htmlFor="age">Age</label>
                <input
                    id="age"
                    type="number"
                    required
                    placeholder="How old are you?"
                    // value={age}
                    // onChange={(e) => setAge(e.target.value)}
                    ref={ageRef}
                ></input>

                {/*DOB*/}
                <label htmlFor="dob">Date Of Birth</label>
                <input
                    id="dob"
                    type="date"
                    required
                    // value={dob}
                    // onChange={(e) => setDob(e.target.value)}
                    ref={dobRef}
                ></input>

                {/*Contact*/}
                <label htmlFor="contact">Emergency Contact</label>
                <input
                    id="contact"
                    type="number"
                    minLength={10}
                    maxLength={11}
                    required
                    placeholder="Emergency contact"
                    // value={contact}
                    // onChange={(e) => setContact(e.target.value)}
                    ref={contactRef}
                ></input>

                {/*Submit*/}
                <button type="submit">Update Profile!</button>
            </form>
        </div>
    );
}

export default Profilecreation;
