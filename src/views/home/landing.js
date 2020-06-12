import React, {Component} from 'react';
import {connect} from 'react-redux';
import MainContainer from "../../components/home/landing/MainContainer";

function mapStateToProps(state) {
    return {};
}

class Landing extends Component {
    render() {
        return (
            <div>
                <MainContainer />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Landing);