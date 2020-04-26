import React, {Component} from "react";
import {Row, Card, CardTitle, Form, Label, Input, Button} from "reactstrap";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {registerUser, resetError} from "../../actions/index";

import IntlMessages from "../../helpers/IntlMessages";
import {Colxx} from "../../components/common/CustomBootstrap";
import {NotificationManager} from "../../components/common/react-notifications";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            first_name: "",
            last_name: "",
            phone_number: "+880"
        };
    }

    componentDidUpdate() {
        if (this.props.error) {
            NotificationManager.warning(
                this.props.error,
                "Registration Error",
                10000,
                null,
                null,
                ''
            );
            this.props.resetError()
        }
    }

    onUserRegister() {
        if (this.state.email !== "" && this.state.password !== "" &&
            this.state.first_name !== "" && this.state.last_name !== "" && this.state.phone_number !== "") {
            this.props.registerUser({
                email: this.state.email,
                password: this.state.password,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                phone_number: this.state.phone_number
            }, this.props.history)
        }
    }

    render() {
        return (
            <Row className="h-100">
                <Colxx xxs="12" md="10" className="mx-auto my-auto">
                    <Card className="auth-card">
                        <div className="position-relative image-side ">
                            <p className="text-white h2">MAGIC IS IN THE DETAILS</p>
                            <p className="white mb-0">
                                Please use this form to register. <br/>
                                If you are a member, please{" "}
                                <NavLink to={`/user/login`} className="white">
                                    login
                                </NavLink>
                                .
                            </p>
                        </div>
                        <div className="form-side">
                            <NavLink to={`/`} className="white">
                                <span className="logo-single"/>
                            </NavLink>
                            <CardTitle className="mb-4">
                                <IntlMessages id="user.register"/>
                            </CardTitle>
                            <Form>

                                <Label className="form-group has-float-label mb-4">
                                    <Input id="first_name"
                                           type="name"
                                           defaultValue={this.state.first_name}
                                           onChange={(e) => this.setState({first_name: e.target.value})}
                                    />
                                    <IntlMessages id="user.first_name"/>
                                </Label>

                                <Label className="form-group has-float-label mb-4">
                                    <Input id="last_name"
                                           type="name"
                                           defaultValue={this.state.last_name}
                                           onChange={(e) => this.setState({last_name: e.target.value})}
                                    />
                                    <IntlMessages id="user.last_name"/>
                                </Label>

                                <Label className="form-group has-float-label mb-4">
                                    <Input id="email"
                                           type="email"
                                           defaultValue={this.state.email}
                                           onChange={(e)=>this.setState({email: e.target.value})}
                                    />
                                    <IntlMessages id="user.email"/>
                                </Label>

                                <Label className="form-group has-float-label mb-4">
                                    <Input
                                        id="password"
                                        type="password"
                                        onChange={(e)=>this.setState({password: e.target.value})}
                                    />
                                    <IntlMessages id="user.password"/>
                                </Label>

                                <Label className="form-group has-float-label mb-4">
                                    <Input id="phone_number" type="phone_number"
                                           defaultValue={this.state.phone_number}
                                           onChange={(e)=>this.setState({phone_number: e.target.value})}
                                    />
                                    <IntlMessages id="user.mobile_number"/>
                                </Label>

                                <div className="d-flex justify-content-end align-items-center">
                                    <Button
                                        color="primary"
                                        className="btn-shadow"
                                        size="lg"
                                        onClick={() => this.onUserRegister()}
                                    >
                                        <IntlMessages id="user.register-button"/>
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </Card>
                </Colxx>
            </Row>
        );
    }
}

const mapStateToProps = ({AuthReducers}) => {
    const {user, loading, error} = AuthReducers;
    return {user, loading, error};
};

export default connect(
    mapStateToProps,
    {
        registerUser, resetError
    }
)(Register);
