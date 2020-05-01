import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getASingleWord, updateASingleWord} from '../../../actions/index'
import IntlMessages from "../../../helpers/IntlMessages";
import {Button} from "reactstrap";
import { Modal, Button as AntButton } from 'antd';
import axios from 'axios'

function mapStateToProps(state) {
    return {
        singleWord: state.WordReducers.word
    };
}

class PickWordsButton extends Component {
    state = { visible: false };

    showModal = () => {
        this.props.getASingleWord()
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        this.props.getASingleWord()
        if(!this.props.singleWord.bangla_meaning|| this.props.singleWord.bangla_meaning===undefined || this.props.singleWord.bangla_meaning===""){
            this.getTranslationFromGoogle(this.props.singleWord)
        }else {
            console.log('no need to save the word')
        }
    };

    handleSkip = e => {
        this.props.getASingleWord()
    }

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    getTranslationFromGoogle = word => {
        let text = word.full_word
        axios
            .get(
                `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=bn&hl=en-GB&dt=t&dt=bd&q=${text}`
            )
            .then(result => {
                this.props.updateASingleWord({
                    id: word._id,
                    bangla_meaning: result.data[0][0][0],
                    additional_meaning: result.data
                })
                console.log(result.data);
                console.log(result.data[0][0][0])
            });
    };

    renderWord(){
        return(
            <div>
                <h2 style={{textAlign: 'center'}}>{this.props.singleWord.full_word}</h2>
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                <Button onClick={this.showModal} color="primary" size="lg" className="mb-2">
                    <IntlMessages id="button.add-words" />
                </Button>
               <Modal
                title="Pick the word for learn about it."
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <AntButton key="back" onClick={this.handleSkip}>
                        Skip
                    </AntButton>,
                    <AntButton key="submit" type="primary" onClick={this.handleOk}>
                        Pick for learn
                    </AntButton>,
                ]}
                >
                <p>{this.props.singleWord && this.renderWord()}</p>
            </Modal>
            </React.Fragment>

        );
    }
}

export default connect(
    mapStateToProps, {getASingleWord, updateASingleWord}
)(PickWordsButton);
