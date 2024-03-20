import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
import IssueInfo from './Component/IssueInfo';
import BookInformation from './Component/BookInformation';
import BookCategory from './Component/BookCategory';
import History from './Component/History';
import Issue from './Component/IssuePage';
import Addbook from './Component/Addbook';
import Addmember from './Component/Addmember';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login></Login>}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/home' element={<Dashboard />}></Route>
        <Route path='/issueinfo' element={<IssueInfo />}></Route>
        <Route path='/issuepage' element={<Issue />}></Route>
        <Route path="/bookinformation" element={<BookInformation />}></Route>
        <Route path="/bookcategory" element={<BookCategory />}></Route>
        <Route path="/history" element={<History></History>}></Route>
        <Route path="/addbook" element={<Addbook></Addbook>}></Route>
        <Route path="/addmember" element={<Addmember></Addmember>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
