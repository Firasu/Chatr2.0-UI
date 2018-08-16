import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Components
import NavBar from "./components/Navigation/NavBar";
import AuthModals from "./components/Modals/AuthModals";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Welcome from "./components/Welcome";
import SuperSecretPage from "./components/SuperSecretPage";
import ChannelMessages from "./components/ChannelMessages";

class App extends Component {
  render() {
    <div>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.2.0/css/all.css"
        integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ"
        crossorigin="anonymous"
      />
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
        crossorigin="anonymous"
      />{" "}
    </div>;
    return (
      <div className="content-wrapper">
        <NavBar />
        <AuthModals />
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <PrivateRoute path="/channels/:id?" component={ChannelMessages} />
          <PrivateRoute path="/private" component={SuperSecretPage} />
          <Redirect to="/welcome" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
