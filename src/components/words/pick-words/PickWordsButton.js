import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    getASingleWord, updateASingleWord, pickAWord, updateASingleWordImages,
    getTodaysHistory, pushHistoryToTodayList
} from '../../../actions/index'
import IntlMessages from "../../../helpers/IntlMessages";
import {Button} from "reactstrap";
import {Modal, Button as AntButton} from 'antd';
import axios from 'axios'
import { Loader } from 'rsuite';
import { Button as RButton, Modal as RModal, Paragraph } from 'rsuite';
import './PickWord.style.scss'

function mapStateToProps(state) {
    return {
        singleWord: state.WordReducers.word
    };
}

class PickWordsButton extends Component {
    state = {visible: false};

    showModal = () => {
        this.props.getASingleWord()
        this.setState({
            visible: true,
        });
    };

    componentDidMount() {
        this.props.getTodaysHistory()
    }

    handleOk = e => {
        this.props.getASingleWord()

        if (!this.props.singleWord.bangla_meaning || this.props.singleWord.bangla_meaning === undefined || this.props.singleWord.bangla_meaning === "") {
            this.getTranslationFromGoogle(this.props.singleWord)
        } else {
            console.log('no need to save the word')
            let image = this.props.singleWord.images && this.props.singleWord.images[0].urls.regular;

            this.props.pickAWord({
                english_word: this.props.singleWord.full_word,
                bangla_meaning: this.props.singleWord.bangla_meaning,
                word_id: this.props.singleWord._id,
                image: image || null
            })

        }

        if (!this.props.singleWord.images || this.props.singleWord.images === undefined
            || this.props.singleWord.images === "" || this.props.singleWord.images.length === 0) {
            this.getImagesFromUnsplash(this.props.singleWord)
        } else {
            console.log("No need to save Image.")
        }
    };

    handleSkip = e => {
        this.props.getASingleWord()
    }

    handleCancel = e => {
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

                this.props.pickAWord({
                    english_word: word.full_word,
                    bangla_meaning: result.data[0][0][0],
                    word_id: word._id
                })
            });
    };


    async getImagesFromUnsplash(word) {
        //No need this try catch here. but I put it here only for I am too lazy.
        try {
            this.props.updateASingleWordImages({
                full_word: word.full_word,
                word_id: word._id,
            })
        } catch (e) {
            console.log(e)
        }
    }

    renderWord() {
        return (
            <h2 style={{textAlign: 'center', fontSize: '2.5rem', fontWeight: 'bolder'}}>{this.props.singleWord.full_word}</h2>
        )
    }

    renderLoader(){
        return(
            <div style={{textAlign: 'center'}}>
                <Loader/>
                <p>Loading...</p>
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                <Button onClick={this.showModal} color="primary" size="lg" className="mb-2">
                    Pick Some Words
                </Button>
                <Modal
                    title="Pick the word for learn about it."
                    centered
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={400}
                    footer={[
                        <RButton key="back" appearance="default" onClick={this.handleSkip}>
                            Skip
                        </RButton>,
                        <RButton key="submit" appearance="primary" onClick={this.handleOk}>
                            Pick for learn
                        </RButton>,
                    ]}
                >
                    {this.props.singleWord ? this.renderWord():  this.renderLoader()}
                </Modal>

            </React.Fragment>

        );
    }
}

export default connect(
    mapStateToProps, {
        getASingleWord, updateASingleWord, pickAWord, updateASingleWordImages,
        getTodaysHistory, pushHistoryToTodayList
    }
)(PickWordsButton);
