import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Editprofile from './components/Editprofile';
import Tasks from './components/Tasks';




function App() {
  return (
    <div className="App">
<BrowserRouter>
<Routes>
  <Route path='/' element={<Login></Login>}></Route> 
  <Route path='/Signup' element={<Signup></Signup>}></Route>
  <Route path='/Home' element={<Home/>}></Route>
  <Route path='/Editprofile' element={<Editprofile/>}></Route>
  <Route path='/Tasks' element={<Tasks/>}></Route>
  
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
