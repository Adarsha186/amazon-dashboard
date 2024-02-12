import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Layout from './components/Layout'
import Update from './components/Update'
import Login from './components/Login'
import { useStateValue } from './StateProvider'
import { useEffect } from 'react'
import { auth } from './firebase'
import Create from './components/Create'
function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, [dispatch, user]);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Layout><Home /></Layout>} />
          <Route path='/edit/:id' element={<Layout><Update/></Layout>}/>
          <Route path="/login" element={<Login />} />
          <Route path='/create' element={<Layout><Create/></Layout>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
