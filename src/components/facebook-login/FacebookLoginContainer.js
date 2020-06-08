import React, {Component} from 'react';
import {connect} from 'react-redux';
import FacebookLogin from 'react-facebook-login';

function mapStateToProps(state) {
    return {};
}

class FacebookLoginContainer extends Component {
     responseFacebook = (response) => {
        console.log(response);
    }

    render() {
        return (
            <div>
                <FacebookLogin
                    appId="265003644715276"
                    autoLoad = {false}
                    callback={()=>this.responseFacebook()}
                    render={renderProps => (
                        <button onClick={renderProps.onClick}>This is my custom FB button</button>
                    )}
                />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(FacebookLoginContainer);
