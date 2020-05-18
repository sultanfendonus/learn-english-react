import React, {Component} from 'react';
import {connect} from 'react-redux';
import LiveConversationContainer from "../../../components/live-conversation/LiveConversationContainer";

function mapStateToProps(state) {
    return {};
}

class LiveConversation extends Component {
    render() {
        return (
            <div>
                <LiveConversationContainer />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(LiveConversation);