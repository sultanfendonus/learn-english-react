import React, {Component} from 'react';
import {connect} from 'react-redux';
import IntroSection from "./IntroSection";

function mapStateToProps(state) {
    return {};
}

class MainContainer extends Component {
    render() {
        return (
            <div>
                <IntroSection />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(MainContainer);