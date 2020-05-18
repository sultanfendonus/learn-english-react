import React, {Component} from 'react';
import {connect} from 'react-redux';
import LiveVideo from "./live-video/LiveVideo";

function mapStateToProps(state) {
    return {};
}

class LiveConversationContainer extends Component {
    render() {
        let random = Math.floor(Math.random() * 6) + 1
        return (
            <div>
                <LiveVideo name={`Sultan - ${random}`}/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(LiveConversationContainer);