import React, {Component} from 'react';
import {connect} from 'react-redux';
import NewFeedbackContainer from "../../../components/feedback/NewFeedbackContainer";

function mapStateToProps(state) {
    return {};
}

class NewFeedback extends Component {
    render() {
        return (
            <div>
                <NewFeedbackContainer />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(NewFeedback);