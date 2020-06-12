import React, {Component} from 'react';
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {};
}

class Landing extends Component {
    render() {
        return (
            <div>
                This is landing page.
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Landing);