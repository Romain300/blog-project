import './App.css'
import NavBar from './components/NavBar';
import Homepage from './components/HomePage';
import SignForm from './components/signForm';
import NewPostForm from './components/NewPostForm';
import PostPage from './components/PostPage';
import { Routes, Route } from 'react-router-dom';
import AuthProvider from './components/AuthProvider';

function App() {

  return (
    <AuthProvider>
      <div className='main-container'>
        <NavBar />
        <Routes>

          <Route path='/' element={ <Homepage/> }/>
          <Route path='/signIn' element={ <SignForm/> }/>
          <Route path='/newPost' element={ <NewPostForm/> }/>
          <Route path='/post/:postId' element={ <PostPage/> }/>

        </Routes>
      </div>
    </AuthProvider>
  )
};

export default App;
