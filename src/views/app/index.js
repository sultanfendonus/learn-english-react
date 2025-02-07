import React, { Component, Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from '../../layout/AppLayout';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards')
);

const Feedback = React.lazy(() =>
    import('./feedback')
);

const Conversation = React.lazy(() =>
    import('./live-conversation')
);

// const Pages = React.lazy(() =>
//   import(/* webpackChunkName: "pages" */ './pages')
// );
// const Applications = React.lazy(() =>
//   import(/* webpackChunkName: "applications" */ './applications')
// );
// const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ './ui'));
const Menu = React.lazy(() => import(/* webpackChunkName: "menu" */ './menu'));
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './blank-page')
);

class App extends Component {
  render() {
    const { match } = this.props;

    return (
      <AppLayout>
        <div className="dashboard-wrapper">
          <Suspense fallback={<div className="loading" />}>
            <Switch>
              <Redirect
                exact
                from={`${match.url}/`}
                to={`${match.url}/dashboards`}
              />
              <Route
                path={`${match.url}/dashboards`}
                render={props => <Dashboards {...props} />}
              />

              <Route
                  path={`${match.url}/feedback`}
                  render={props => <Feedback {...props} />}
              />

              <Route
                  path={`${match.url}/conversation`}
                  render={props => <Conversation {...props} />}
              />

              {/*<Route*/}
              {/*  path={`${match.url}/applications`}*/}
              {/*  render={props => <Applications {...props} />}*/}
              {/*/>*/}
              {/*<Route*/}
              {/*  path={`${match.url}/pages`}*/}
              {/*  render={props => <Pages {...props} />}*/}
              {/*/>*/}
              {/*<Route*/}
              {/*  path={`${match.url}/ui`}*/}
              {/*  render={props => <Ui {...props} />}*/}
              {/*/>*/}
              <Route
                path={`${match.url}/menu`}
                render={props => <Menu {...props} />}
              />
              <Route
                path={`${match.url}/blank-page`}
                render={props => <BlankPage {...props} />}
              />
              <Redirect to="/error" />
            </Switch>
          </Suspense>
        </div>
      </AppLayout>
    );
  }
}
const mapStateToProps = ({ MenuReducers }) => {
  const { containerClassnames } = MenuReducers;
  return { containerClassnames };
};

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
