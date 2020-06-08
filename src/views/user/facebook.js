import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fbLoginValidation} from '../../actions/AuthActions'

function mapStateToProps(state) {
    return {};
}

class Facebook extends Component {
    componentDidMount() {
        let token = this.props.match.params.jwt;
        this.props.fbLoginValidation(token)

    }

    render() {
        return (
            <div>
                <p>Please wait...</p>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, {fbLoginValidation}
)(Facebook);
