import './App.css'
import NavBar from './components/NavBar';
import Homepage from './components/HomePage';
import SignForm from './components/signForm';
import NewPostForm from './components/NewPostForm';
import PostPage from './components/PostPage';
import NotFound from './components/notFound';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import AuthProvider from './components/AuthProvider';

function App() {

  return (
    <AuthProvider>
      <div className='main-container'>
        <NavBar />
        <Routes>

          <Route path='/' element={ <Homepage/> }/>
          <Route path='/signIn' element={ <SignForm/> }/>
          <Route path= '*' element={ <Navigate to='/404NotFound'/> }/>
          <Route path='/404NotFound' element={ <NotFound /> }/>

          <Route element={ <PrivateRoute/> }>
            <Route path='/newPost' element={ <NewPostForm/> }/>
            <Route path='/post/:postId' element={ <PostPage/> }/>
          </Route>
          
        </Routes>
      </div>
    </AuthProvider>
  )
};

export default App;


