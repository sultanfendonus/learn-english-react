import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getASingleWord, updateASingleWord, pickAWord, updateASingleWordImages,
    getTodaysHistory} from '../../../actions/index'
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.singleWord !== this.props.singleWord){
            this.props.getTodaysHistory()
        }
    }

    handleOk = e => {
        this.props.getASingleWord()

        if(!this.props.singleWord.bangla_meaning|| this.props.singleWord.bangla_meaning===undefined || this.props.singleWord.bangla_meaning===""){
            this.getTranslationFromGoogle(this.props.singleWord)
        }else {
            console.log('no need to save the word')
            let image = this.props.singleWord.images && this.props.singleWord.images[0].urls.regular;

            this.props.pickAWord({
                english_word: this.props.singleWord.full_word,
                bangla_meaning: this.props.singleWord.bangla_meaning,
                word_id: this.props.singleWord._id,
                image: image || 'no-image'
            })

        }

        if(!this.props.singleWord.images|| this.props.singleWord.images===undefined
            || this.props.singleWord.images==="" || this.props.singleWord.images.length === 0){
            this.getImagesFromUnsplash(this.props.singleWord)
        }else {
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

    async getImagesFromUnsplash(word){
        try{
            let text = word.full_word
            const response = await axios.get(`https://api.unsplash.com/search/photos?page=1&per_page=5&query=${text}`,{
                headers: {
                    "Authorization": `Client-ID 9S9GamO838HHwsbUoZ4wTisKYKFSAZjNyzGgbF1EvwM`
                }
            })
            let result = [];
            response.data && response.data.results.map((image)=>{
                result.push({
                    id: image.id,
                    urls: image.urls,
                    user_name: image.user.username,
                    full_name: image.user.name
                })
            });
            response.data && this.props.updateASingleWordImages({
                word_id: word._id,
                images: result
            })
        }catch (e) {
            console.log(e)
        }

    }

    renderWord(){
        return(
                <h2 style={{textAlign: 'center'}}>{this.props.singleWord.full_word}</h2>
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
                centered
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
                {this.props.singleWord && this.renderWord()}
            </Modal>
            </React.Fragment>

        );
    }
}

export default connect(
    mapStateToProps, {getASingleWord, updateASingleWord, pickAWord, updateASingleWordImages,
        getTodaysHistory}
)(PickWordsButton);
