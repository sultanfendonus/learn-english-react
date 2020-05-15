import React, {Component} from 'react';
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {};
}

class NewFeedback extends Component {
    render() {
        return (
            <div>
                NewFeedback
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(NewFeedback);