import './App.css';
import Main from './components/Main';
import Admin from './components/Admin';
import Login from './components/Login';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';


function App() {

  const isAuthenticated = () => {
    return localStorage.getItem("isLoggedIn") === "true";
  }
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}  />
        <Route path="/login" element={<Login />} />
        <Route exact path="/admin" element={
          isAuthenticated() ? (
            <Admin />
          ) : (
            <Navigate replace to={"/login"} />
          )
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
