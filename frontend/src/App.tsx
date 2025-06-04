

import './App.css'
import Dashboard from './pages/dashboard'
import { SigninPage } from './pages/signin'
import { SignupPage } from './pages/Signup'
import { BrowserRouter,Route, Routes ,Navigate} from 'react-router-dom'

function App() {
  return <BrowserRouter>
      <Routes>
           <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="/signup" element={<SignupPage/>}></Route>
        <Route path="/signin" element={<SigninPage/>}></Route>
         <Route path="/dashboard" element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>


}

export default App
