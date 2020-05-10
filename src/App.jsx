import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Feed, AddPost, Profile, ViewPost, NotFound, Followers, Signin } from './pages';
import axios from 'axios';
import './App.css';
import { scrollToBottom } from 'react-scroll/modules/mixins/animate-scroll';
function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [scrollToComments, setScrollToComments] = React.useState(false);
  const [currentPostInfo, setCurrentPostInfo] = React.useState({});

  useEffect(async () => {
    async function isLoggedIn() {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/isLoggedIn`, {
          withCredentials: true
        });

        if (data.id) setIsLoggedIn(true);
        return 1;
      } catch (error) {
        console.log(error);
        return 1;
      }
    }
    isLoggedIn();
  }, []);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/AddPost">
            <AddPost isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/ViewPost">
            <ViewPost isLoggedIn={isLoggedIn}  currentPostInfo={currentPostInfo} scrollToComments={scrollToComments} isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/Profile">
            <Profile isLoggedIn={isLoggedIn} setCurrentPostInfo={setCurrentPostInfo}/>
          </Route>
          <Route path="/Followers">
            <Followers isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="/Signin" component={Signin} />

          <Route path="/" exact>
            <Feed setCurrentPostInfo={setCurrentPostInfo} setScrollToComments={setScrollToComments} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/" component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
