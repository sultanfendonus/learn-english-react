import React, { Component } from "react";
import { Row, Card, CardTitle, Label, FormGroup } from "reactstrap";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Colxx } from "../../components/common/CustomBootstrap";
import IntlMessages from "../../helpers/IntlMessages";
import { forgotPassword } from "../../actions/AuthActions";
import { NotificationManager } from "../../components/common/react-notifications";
import { connect } from "react-redux";
import { Input, Button } from 'antd';

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  onForgotPassword = (email) => {
    if (!this.props.loading) {
      if (email !== "") {
        this.props.forgotPassword(email, this.props.history);
        this.setState({email: ""})
      }
    }
  }

  validateEmail = (value) => {
    let error;
    if (!value) {
      error = "Please enter your email address";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  componentDidUpdate() {
    if (this.props.error) {
      NotificationManager.warning(
        this.props.error,
        "Forgot Password Error",
        3000,
        null,
        null,
        ''
      );
    } else {
      if (!this.props.loading && this.props.forgotUserMail === "success")
        NotificationManager.success(
          "Please check your email.",
          "Forgot Password Success",
          3000,
          null,
          null,
          ''
        );
    }

  }


  render() {

    const { email } = this.state;
    const initialValues = { email };

    return (
      <Row className="h-100">
        <Colxx xxs="12" md="10" className="mx-auto my-auto">
          <Card className="auth-card">
            <div className="position-relative image-side ">
              <p className="text-white h2">Password Reset</p>
              <p className="white mb-0">
                Please use your e-mail to reset your password. <br />
                If you are not a member, please{" "}
                <NavLink to={`/user/register`} className="white">
                  register
                </NavLink>
                .
              </p>
            </div>
            <div className="form-side">
              {/*<NavLink to={`/`} className="white">*/}
              {/*  <span className="logo-single" />*/}
              {/*</NavLink>*/}
              <CardTitle className="mb-4">
                <IntlMessages id="user.forgot-password" />
              </CardTitle>

              <div>
                <Input
                    placeholder="Your Email"
                    value={this.state.email}
                    onChange={(e)=>this.setState({email: e.target.value})}
                />
                <Button onClick={()=>this.onForgotPassword(this.state.email)} style={{marginTop: 5}} type="primary" size='medium'>
                  Reset
                </Button>
              </div>



              <NavLink to={`/user/register`}>
                Don't have an account?
              </NavLink>

            </div>
          </Card>
        </Colxx>
      </Row>
    );
  }
}

const mapStateToProps = ({ AuthReducers }) => {
  const { forgotUserMail, loading, error } = AuthReducers;
  return { forgotUserMail, loading, error };
};

export default connect(
  mapStateToProps,
  {
    forgotPassword
  }
)(ForgotPassword);

