import React, { useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import { Container } from "react-bootstrap";
import Header from "./components/header/Header";
import Sidebar from "./components/sidebar/Sidebar";
import HomeScreen from "./screens/homeScreen/HomeScreen";
import LoginScreen from "./screens/loginScreen/LoginScreen";

import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import "./_app.scss";
import { useSelector } from "react-redux";
import WatchScreen from "./screens/watchScreen/WatchScreen";
import SearchScreen from "./screens/SearchScreen";
import ChannelScreen from "./screens/channelScreen/ChannelScreen";
import SubscriptionsScreen from "./screens/subscriptionsScreen/SubscriptionsScreen";


function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}


const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);

  const handleToggleSidebar = () => {
    toggleSidebar((value) => !value);
  };

  // Small Screen
  const mediaQuery = window.matchMedia("(min-width: 520px)");

  
  useEffect(() => {
    setSmallScreen((value) => !value);
  }, [mediaQuery.matches]);
  
  
  return (
    <div>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className="app__container">
        {!sidebar && (
          <Sidebar
            sidebar={sidebar}
            smallScreen={smallScreen}
            handleToggleSidebar={handleToggleSidebar}
          />
        )}
        <Container fluid className="app__main">
          {children}
        </Container>
      </div>
    </div>
  );
};

const App = () => {
  const { accessToken, loading } = useSelector((state) => state.auth);

  const history = useHistory();


  const [width, ] = useWindowSize();

  const [smallScreen, setSmallScreen] = useState(false);

  const [mediumScreen, setMediumScreen] = useState(false);

  // console.log("Width-> ",typeof(width));


  // Small Screen
  const mediaQuery = width <= 520;

  
  useEffect(() => {
    setSmallScreen((value) => !value);
  }, [mediaQuery]);

  // Medium Screen
  const mediaQuery1 = width <= 1224;
  // console.log("Medium Screen -> ",mediaQuery1,'\n');

  useEffect(() => {
    setMediumScreen((value) => !value);
    // console.log("Medium Screen\n",mediaQuery1);
  }, [mediaQuery1]);


  useEffect(() => {
    if (!loading && !accessToken) {
      history.push("/auth");
    }
  }, [accessToken, loading, history]);

  return (
    <Switch>
      <Route path="/" exact>
        <Layout>
          <HomeScreen />
        </Layout>
      </Route>

      <Route path="/auth">
        <LoginScreen />
      </Route>

      <Route path="/search/:query">
        <Layout>
          <SearchScreen />
        </Layout>
      </Route>
      <Route path="/watch/:id">
        <Layout>
          <WatchScreen mediumScreen={mediumScreen} smallScreen={smallScreen} />
        </Layout>
      </Route>
      <Route path="/feed/subscriptions">
        <Layout>
          <SubscriptionsScreen />
        </Layout>
      </Route>
      <Route path="/channel/:channelId">
        <Layout>
          <ChannelScreen />
        </Layout>
      </Route>

      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default App;
