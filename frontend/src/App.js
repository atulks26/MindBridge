import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/home/home";
import Signup from "./components/auth/signup";
import Login from "./components/auth/login";
import Profilecreation from "./components/profile/profile-creation";
import Profilepage from "./components/profile/profile";
import Gamepage from "./components/games/main";
import Nav from "./components/navbar/nav";
import Landing from "./components/landing/landing";
import Scan from "./components/live-scan";
import Faq from "./components/faq/faq";
import Routine from "./components/routine-tracker/routine";
// import Blockchain from "./components/storage/main";

//games
import Colormaze from "./components/games/color";
import EmotionGuessingGame from "./components/games/emo";

import { auth } from "./components/firebase/firebase";

function App() {
    // if(!auth.currentUser) {
    //     if()
    // }

    return (
        <div className="App">
            <Router>
                <Nav />
                <Routes>
                    {/* <Route path="/" element={[<Home />]}></Route> */}
                    <Route path="/" element={[<Landing />]} />
                    <Route path="/home" element={[<Home />]} />
                    <Route path="/signup" element={[<Signup />]} />
                    <Route path="/login" element={[<Login />]} />
                    <Route
                        path="/create-profile"
                        element={[<Profilecreation />]}
                    />
                    <Route path="/profile" element={[<Profilepage />]} />
                    <Route path="/games" element={[<Gamepage />]} />
                    <Route path="/games/colormaze" element={[<Colormaze />]} />"
                    <Route
                        path="/games/emoquest"
                        element={[<EmotionGuessingGame />]}
                    />
                    <Route path="/scan" element={[<Scan />]} />
                    <Route path="/faq" element={[<Faq />]} />
                    <Route path="/routine" element={[<Routine />]} />
                    {/* <Route path="/data" element={[<Blockchain />]} /> */}
                </Routes>
            </Router>
        </div>
    );
}

export default App;
