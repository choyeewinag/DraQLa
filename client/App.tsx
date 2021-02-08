import React, { useReducer } from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import NavBar from './components/navbar';

// import pages for routes;
import HomePage from './pages/homePage';
import AppPage from './pages/appPage';

// import context object
import { GeneralContext } from './state/contexts';
import { initialGeneralState, generalReducer } from './state/reducers';

const App = () => {

  const [generalState, generalDispatch] = useReducer(generalReducer, initialGeneralState);

  return (
    <GeneralContext.Provider 
      value={{
        generalState,
        generalDispatch
      }}>
      <Router>
        <div className='appHeader'> 
          <Link to="/" 
            onClick={() => {
              generalDispatch({type: 'ON_HOME_PAGE'})
            }}
          > 
              <img
                className='logo'
                id='logo'
                src='./assets/bannericon.png'
                alt='DraQLa Logo'
                height='75px'
                width='75px'
              ></img>
              <img
                id='logotext'
                src='./assets/logotext.png'
                alt='DraQLa Text'
                height='65px'
                width='150px'
              ></img>
              
            </Link>       
          <NavBar />
        </div>

        <Switch>
          <Route path='/app' render={() => (
            <AppPage />)} 
          />
          <Route path='/' exact component={HomePage}/>
        </Switch>
      </Router>
    </GeneralContext.Provider>
  )
};

export default App;


/*
! original app link
<Route path='/app' component={AppPage} />
*/


/*
import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Switch, Link } from 'react-router-dom';
import NavBar from './components/navbar';

// import pages for routes;
import HomePage from './pages/homePage';
import AppPage from './pages/appPage';
import URIModal from './modals/URIModal';

const App = () => {
  const [onHomePage, setOnHomePage] = useState(true);
  const [showURIModal, setShowURIModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  
  const handleHomeBtn = () => {
    setOnHomePage(true);
    console.log('handleHome');
  }

  const handlePlayBtn = () => {
    setOnHomePage(false)
    console.log('handlePlay');
  }

  const handleURIModal = () => {
    setShowURIModal(!showURIModal);
    console.log('handleURIModal', showURIModal);
  }

  const handleHelpModal = () => {
    setShowHelpModal(!showHelpModal);
    console.log('handleHelpModal', showHelpModal);
  }

  // let displayURIModal;
  // if (showURIModal){
  //   displayURIModal = <URIModal handleURIModal={handleURIModal}/>
  // } else {
  //   displayURIModal = null;
  // }


  /* 
  !things to do for appHeader:
  - NavBar: pass down onHomePage and event handler to toggle state
  - also create a react router for No Match 404 error
  

 return (
  <>
    <Router>
      <div className='appHeader'> 
        <Link to="/" onClick={handleHomeBtn}> 
            <img
              className='logo'
              id='logo'
              src='./assets/bannericon.png'
              alt='DraQLa Logo'
              height='75px'
              width='75px'
            ></img>
            <img
              id='logotext'
              src='./assets/logotext.png'
              alt='DraQLa Text'
              height='65px'
              width='150px'
            ></img>
            
          </Link>       
        <NavBar 
          onHomePage={onHomePage}
          handleHomeBtn={handleHomeBtn}
          handlePlayBtn={handlePlayBtn}
          handleURIModal={handleURIModal}
          showURIModal={showURIModal}
          />
      </div>

      <Switch>
        <Route path='/app' render={() => (
          <AppPage
          handleHelpModal={handleHelpModal}
          />)} 
        />
        <Route path='/' exact component={HomePage}/>
      </Switch>

        {showURIModal ? <URIModal handleURIModal={handleURIModal}/> : null}
    </Router>
  </>
)
};


*/