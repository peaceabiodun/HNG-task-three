import "./App.css";
import HomePage from "./pages/homePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./pages/auth";
import LoginPage from "./pages/loginpage";
import SearchPage from "./pages/searchPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Signup" element={<Auth />} />
        <Route path="/Dashboard" element={<HomePage />} />
        <Route path="/Search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
