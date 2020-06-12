import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomeLayout from "../../layout/HomeLayout";


const Privacy = React.lazy(() =>
  import('./privacy')
);

const Landing = React.lazy(() =>
    import('./landing')
);


const Home = ({ match }) => {
  return (
    <HomeLayout>
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
    </HomeLayout>


  );
};

export default Home;
