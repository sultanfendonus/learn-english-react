import React, {Component} from 'react';
import {connect} from 'react-redux';
import LiveVideo from "./live-video/LiveVideo";

function mapStateToProps(state) {
    return {
        firstName: state.AuthReducers.firstName
    };
}

class LiveConversationContainer extends Component {
    render() {
        return (
            <div>
                <LiveVideo name={this.props.firstName}/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(LiveConversationContainer);