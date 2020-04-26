import React, { Component, Fragment } from "react";
import { injectIntl } from 'react-intl';


class DashBoardExample extends Component {
    render() {
        const {messages} = this.props.intl;
        return (
            <Fragment>
                <p>This is example page. Thanks</p>
            </Fragment>
        );
    }
}
export default injectIntl(DashBoardExample);
