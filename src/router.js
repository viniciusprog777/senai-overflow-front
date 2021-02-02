import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { isSingedIn } from "./services/security";

function PrivateRoute({ children, ...rest }) {
  if (isSingedIn()) {
    return <Route {...rest}>{children}</Route>;
  } else {
    return <Redirect to="/" />;
  }
}

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <PrivateRoute path="/home">
          <Home />
        </PrivateRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
