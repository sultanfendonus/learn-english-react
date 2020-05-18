import React, {Component} from 'react';
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {};
}

class LiveConversationContainer extends Component {
    render() {
        return (
            <div>
                LiveConversationContainer
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(LiveConversationContainer);