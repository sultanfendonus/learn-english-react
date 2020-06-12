import React, {Component} from 'react';
import {connect} from 'react-redux';

function mapStateToProps(state) {
    return {};
}

class Privacy extends Component {
    render() {
        return (
            <div>
             <p>This is privacy policy page</p>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(Privacy);