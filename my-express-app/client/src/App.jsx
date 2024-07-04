import { useState} from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'



import Search from './pages/Search'
import DisplayOnMap from './pages/DisplayOnMap'
import AddAReview from './pages/AddAReview'
import Community from './pages/Community'
import Profile from './pages/Profile'
import NavContext from './context/NavContext';



function App() {
  const [currentPage, setCurrentPage] = useState("Search");


  return (
    <>
      <div>
        <h1>FSPT27 Final Project!</h1>
      </div>

      <NavContext.Provider value={{currentPage, setCurrentPage}}>

        <Router>
          <Routes>
            <Route path="/" element={<Search />}/>
            <Route path="/displayonmap" element={<DisplayOnMap />}/>
            <Route path="/addareview" element={<AddAReview />}/>
            <Route path="/community" element={<Community />}/>
            <Route path="/profile" element={<Profile />}/>
          </Routes>
        </Router>

      </NavContext.Provider>
        
      
    </>
  )
}

export default App
