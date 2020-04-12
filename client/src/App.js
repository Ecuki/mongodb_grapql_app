import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Container } from "semantic-ui-react";

import { AuthProvider } from "./context/auth";
import { AuthRoute, NoAuthRoute } from "./utils/AuthRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Route exact path="/" component={Home} />
          <NoAuthRoute exact path="/login" component={Login} />
          <NoAuthRoute exact path="/register" component={Register} />
          <AuthRoute exact path="/user/:userId" component={Profile} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
