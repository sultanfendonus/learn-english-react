import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';


const Privacy = React.lazy(() =>
  import('./privacy')
);

const Landing = React.lazy(() =>
    import('./landing')
);


const Home = ({ match }) => {
  return (

      <Suspense fallback={<div className="loading" />}>
        <Switch>
          <Redirect exact from={`${match.url}/`} to={`${match.url}/main`} />
          <Route
              path={`${match.url}/main`}
              render={props => <Landing {...props} />}
          />
          <Route
            path={`${match.url}/privacy-policy`}
            render={props => <Privacy {...props} />}
          />
          <Redirect to="/error" />
        </Switch>
      </Suspense>

  );
};

export default Home;
