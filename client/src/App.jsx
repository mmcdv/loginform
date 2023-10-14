import LoginForm from './pages/login'
import SignupForm from './pages/signup'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
      <BrowserRouter>
        <div className="bg-container">
          <div className="page-box">
            <Routes>
              <Route path='/' element={<LoginForm />} />
              <Route path='/signup' element={<SignupForm />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>      
    </>
  )
}

export default App
