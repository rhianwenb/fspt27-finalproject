import { useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'
import RegisterUser from './components/RegisterUser.jsx';
import Login from './components/Login.jsx';
import './App.css'



import Search from './pages/Search'
import DisplayOnMap from './pages/DisplayOnMap'
import AddAReview from './pages/AddAReview'
import Community from './pages/Community'
import Profile from './pages/Profile'
import NavContext from './context/NavContext';
import Review from './pages/Review.jsx';



function App() {
  const [currentPage, setCurrentPage] = useState("Search");


  return (
    <>
      {/* <RegisterUser />
      <Login /> */}
      

        <h1 style={{margin:"5px auto"}}>NextTenant</h1>



      <NavContext.Provider value={{currentPage, setCurrentPage}}>

        <Router>
          <Routes>
            <Route path="/" element={<Search />}/>
            <Route path="/displayonmap" element={<DisplayOnMap />}/>
            <Route path="/addareview" element={<AddAReview />}/>
            <Route path="/community" element={<Community />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/review/:id" element={<Review />} />
          </Routes>
        </Router>

      </NavContext.Provider>
        
      
    </>
  )
}

export default App
