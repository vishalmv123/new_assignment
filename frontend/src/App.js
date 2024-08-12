import './App.css';
import ReactDOM from "react-dom/client";
import {  Routes, Route } from "react-router-dom";
import UserForm from './Components/UserForm';
import UserTable from './Components/UserTable';
import UpdateUserForm from './Components/UpdateForm';
function App() {
  return (
    <Routes>
      <Route path="/" element={<UserForm />} />
      <Route path="/showAll" element={<UserTable/>}/>
      <Route path="/update/:name" element={<UpdateUserForm/>}/>
   </Routes>
  );
}

export default App;
