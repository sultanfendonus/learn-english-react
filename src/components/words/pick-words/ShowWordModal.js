import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setWordViewModalVisibility, getASingleWordDetails} from '../../../actions/index'
import { Modal, Button } from 'antd';
import DetailsDesign from "../details/DetailsDesign";

function mapStateToProps(state) {
    return {
        wordModalVisibility: state.SettingReducers.wordModalVisibility,
        detailsWord: state.WordReducers.detailsWord
    };
}

class ShowWordModal extends Component {
    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.wordId !== this.props.wordId){
            this.props.getASingleWordDetails({
                _id: this.props.wordId
            })
        }
    }

    showModal = () => {
        this.props.setWordViewModalVisibility(true)
    };

    handleOk = e => {
        console.log(e);

    };

    handleCancel = e => {
        this.props.setWordViewModalVisibility(false)
    };

    renderImages(images){
        return images.map((image)=>{
            return(
                <img src={image.urls.regular} style={{width: "200px", height: "200px"}} alt=""/>
            )
        })
    }

    renderDetails(){
        if(this.props.detailsWord){
            return(
                // <div>
                //     <p>{this.props.detailsWord._id}</p>
                //     {this.renderImages(this.props.detailsWord.images)}
                // </div>
                <DetailsDesign detailsWord={this.props.detailsWord}/>

            )
        }

        return (
            <p>Loading....</p>
        )
    }
    render() {
        if(!this.props.wordId){
            return null
        }
        return (
            <div>
                <Modal
                    title="Basic Modal"
                    visible={this.props.wordModalVisibility}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={1100}
                >
                    {this.renderDetails()}
                </Modal>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, {setWordViewModalVisibility, getASingleWordDetails}
)(ShowWordModal);
