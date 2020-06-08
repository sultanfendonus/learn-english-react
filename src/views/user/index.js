import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserLayout from '../../layout/UserLayout';
import DetailsDesign from "../../components/words/details/DetailsDesign";

const Login = React.lazy(() =>
  import(/* webpackChunkName: "user-login" */ './login')
);
const Register = React.lazy(() =>
  import(/* webpackChunkName: "user-register" */ './register')
);
const ForgotPassword = React.lazy(() =>
  import(/* webpackChunkName: "user-forgot-password" */ './forgot-password')
);
const ResetPassword = React.lazy(() =>
  import(/* webpackChunkName: "user-reset-password" */ './reset-password')
);
const Facebook = React.lazy(() =>
  import(/* webpackChunkName: "user-reset-password" */ './facebook')
);

const User = ({ match }) => {
  return (
    <UserLayout>
      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/login`} />
          <Route
            path={`${match.url}/login`}
            render={props => <Login {...props} />}
          />
          <Route
            path={`${match.url}/register`}
            render={props => <Register {...props} />}
          />
          <Route
            path={`${match.url}/forgot-password`}
            render={props => <ForgotPassword {...props} />}
          />
          <Route
            path={`${match.url}/reset-password/:uuid?`}
            render={props => <ResetPassword {...props} />}
          />
          <Route
            path={`${match.url}/facebook/:jwt?`}
            render={props => <Facebook {...props} />}
          />
          <Route
              path={`${match.url}/details`}
              render={props => <DetailsDesign {...props} />}
          />
          <Redirect to="/error" />
        </Switch>
      </Suspense>
    </UserLayout>
  );
};

export default User;
