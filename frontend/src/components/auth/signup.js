import React, { useRef, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, firestore } from "../firebase/firebase";
import { doc, setDoc } from "@firebase/firestore";
import "./signup.css";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");

    const emailRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (confPassword !== password) {
            console.log("Passwords do not match");
            return;
        }

        try {
            const cred = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const userId = cred.user.uid;
            const docRef = doc(firestore, "user-data", userId);

            let data = {
                email: emailRef.current.value,
            };

            await setDoc(docRef, data);

            await signInWithEmailAndPassword(auth, email, password);

            window.location.href = "/create-profile";
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="signup">
            <form onSubmit={handleSubmit}>
                {/* Email */}
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    ref={emailRef}
                    placeholder="Your email address..."
                    onChange={(e) => setEmail(e.target.value)}
                    required
                ></input>

                {/* Password */}
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Your password..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                ></input>

                {/* Password */}
                <label htmlFor="confPassword">Confirm Password</label>
                <input
                    id="confPassword"
                    type="password"
                    placeholder="Re-enter the password..."
                    value={confPassword}
                    onChange={(e) => setConfPassword(e.target.value)}
                    required
                ></input>

                {/* Submit */}
                <button type="submit">Sign Up</button>

                {/*Login*/}
                <a href="/login">Already have an account?</a>
            </form>
        </div>
    );
}

export default Signup;
