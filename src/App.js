import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom';
import SignUp from './pages/Authentication/SignUp';
import Login from './pages/Authentication/Login';
import AppHome from './pages/Application/AppHome';
import AppChat from './pages/Application/AppChat';
function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/Signup' element={<SignUp />}></Route>
      <Route path='/' index element={<Login/>}></Route>
      <Route path='/app' element={<AppHome/>}></Route>
      <Route path='/chat' element={<AppChat/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
