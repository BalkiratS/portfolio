import Main from './components/Main';
import Admin from './components/Admin';
import Login from './components/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from './AuthContext';


function App() {
  const {isAuthenticated} = useAuth();

  return (

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Main />} />
    <Route
      path="/admin"
      element={
        isAuthenticated ? (
          <Admin />
        ) : (
          <Login />
        )
      }
    />
  </Routes>
</BrowserRouter>
  );
}

export default App;
