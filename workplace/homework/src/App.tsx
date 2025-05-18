
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";
import './App.css'
import LandingPage from './pages/landingPage';
import LoginPage from './pages/loginPage';
import NavBar from "./components/navbar";
import RecipesPage from "./pages/recipesPage";
import RegisterPage from "./pages/registerPage";
import EditRecipePage from "./pages/editRecipePage";

function App() {

  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/recipes" element={<RecipesPage/>} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/recipes/:id/edit/" element={<EditRecipePage/>} />
      </Routes>
    </Router>
  );
}

export default App
