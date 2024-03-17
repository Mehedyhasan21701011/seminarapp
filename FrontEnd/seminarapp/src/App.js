import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Component/Login';
import SignUp from './Component/SignUp';
import Dashboard from './Component/Dashboard';
import IssueInfo from './Component/IssueInfo';
import Issue from './Component/IssuePage';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/issueinfo' element={<IssueInfo />}></Route>
        <Route path="/issue" element={<Issue />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
