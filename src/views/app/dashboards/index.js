import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const DashboardDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-default" */ './default')
);
const ContentDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-content" */ './content')
);
const AnalyticsDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-analytics" */ './analytics')
);
const EcommerceDefault = React.lazy(() =>
  import(/* webpackChunkName: "dashboard-ecommerce" */ './ecommerce')
);

const ExampleDefault = React.lazy(() =>
    import(/* webpackChunkName: "dashboard-ecommerce" */ './example')
);
const PickWords = React.lazy(() =>
    import(/* webpackChunkName: "dashboard-ecommerce" */ './pick-words')
);


const Dashboards = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/pick-words`} />
      <Route
        path={`${match.url}/default`}
        render={props => <DashboardDefault {...props} />}
      />
      <Route
        path={`${match.url}/content`}
        render={props => <ContentDefault {...props} />}
      />
      <Route
        path={`${match.url}/ecommerce`}
        render={props => <EcommerceDefault {...props} />}
      />
      <Route
        path={`${match.url}/analytics`}
        render={props => <AnalyticsDefault {...props} />}
      />
      <Route
          path={`${match.url}/example`}
          render={props => <ExampleDefault {...props} />}
      />
      <Route
          path={`${match.url}/pick-words`}
          render={props => <PickWords {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Dashboards;
