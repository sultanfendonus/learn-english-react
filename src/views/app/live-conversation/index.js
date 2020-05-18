import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

const LiveConversation = React.lazy(() =>
    import('./live-conversation')
);

const FeedBack = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/new`} />

      <Route
          path={`${match.url}/live`}
          render={props => <LiveConversation {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default FeedBack;
