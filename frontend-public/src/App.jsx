import './App.css';
import HomepagePublic from './components/HomePagePublic.jsx';
import NavBarPublic from './components/NavBarPublic.jsx';
import SignFormPublic from './components/SignInPublic.jsx';
import { Routes, Route } from 'react-router-dom';
import AuthProviderPublic from './components/AuthProviderPublic.jsx';
import PostPagePublic from './components/PostPagePublic.jsx';
import PrivateRoutePublic from './components/PrivateRoutePublic.jsx';
import NotFoundPublic from './components/notFoundPublic.jsx';

function App() {

  return (
    <AuthProviderPublic>
      <div className='main-container'>
        <NavBarPublic />
        <Routes>
          <Route path='/' element={ <HomepagePublic/> }/>
          <Route path='/signIn' element= { <SignFormPublic/> }/>
          <Route path="*" element={<NotFoundPublic />} />
          <Route path="/404NotFound" element={<NotFoundPublic />} />

          <Route element={ <PrivateRoutePublic/> } >
            <Route path='/post/:postId' element={ <PostPagePublic/> }/>
          </Route>
        </Routes>
      </div>
    </AuthProviderPublic>
  )
        
};

export default App;

