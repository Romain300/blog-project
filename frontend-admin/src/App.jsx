import './App.css'
import NavBar from './components/NavBar';
import Homepage from './components/HomePage';
import SignForm from './components/signForm';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className='main-container'>
      <NavBar />
      
      <Routes>
        <Route path='/' element={
          <Homepage/>
        }/>

        <Route path='/signIn' element={
          <SignForm/>
        }/>
      </Routes>
    </div>
  )
};

export default App;
