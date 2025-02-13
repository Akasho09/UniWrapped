import { Signup } from './pages/signup'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { Signin } from './pages/signin'
import './App.css'

function App() {

  return (
    <> <BrowserRouter>
    <Routes>
    <Route path="/signup" element={<Signup />} />
    <Route path="/signin" element={<Signin />} />
    </Routes>
    </BrowserRouter>
    </>
    )
}


export default App
