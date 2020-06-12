import React, {Component} from 'react';
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {};
}

class Landing extends Component {
    render() {
        return (
            <div>
                Landing
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Landing);