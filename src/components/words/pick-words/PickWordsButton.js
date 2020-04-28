import React, {Component} from 'react';
import {connect} from 'react-redux';
import IntlMessages from "../../../helpers/IntlMessages";
import {Button} from "reactstrap";
import { Modal } from 'antd';

function mapStateToProps(state) {
    return {};
}

class PickWordsButton extends Component {
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <React.Fragment>
                <Button onClick={this.showModal} color="primary" size="lg" className="mb-2">
                    <IntlMessages id="button.add-words" />
                </Button>
               <Modal
                title="Basic Modal"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
            </React.Fragment>

        );
    }
}

export default connect(
    mapStateToProps,
)(PickWordsButton);
