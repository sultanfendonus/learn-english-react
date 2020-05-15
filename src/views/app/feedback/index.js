import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const NewFeedback = React.lazy(() =>
    import('./new-feedback')
);

const FeedBack = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/new`} />

      <Route
          path={`${match.url}/new`}
          render={props => <NewFeedback {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default FeedBack;
