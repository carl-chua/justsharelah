import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";

function PrivateRoute({ component: RouteComponent, ...rest }) {
  const userToken = useSelector(state => state.userToken)
  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!userToken ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  );
}

export default PrivateRoute;
