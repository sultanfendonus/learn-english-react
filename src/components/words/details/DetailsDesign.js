import React, {Component} from 'react';
import {connect} from 'react-redux';
import './DetailsDesign.style.scss'
import WordVariation from "./WordVariation";
import WordDefination from "./WordDefination";
import {Badge, Card, CardBody, CardImg, CardSubtitle, CardText} from "reactstrap";
import ImageList from "./ImageList";
import {
    PlayCircleFilled
} from '@ant-design/icons';

function mapStateToProps(state) {
    return {};
}

class DetailsDesign extends Component {
    renderSyllables(syllables){
        let syllablesWord = "";
        if(!syllables.list && syllables.list.length === 0){
            syllablesWord = ""
        }else {
            syllablesWord = syllables.list.join('-');
        }

        return(
            <p>{syllablesWord}</p>
        )
    }

    renderPronunciation(pronunciation){
        if(pronunciation.all){
            return(
                <p>{pronunciation.all}</p>
            )
        }
    }

    renderBanglaMeanings(moreMeanings){
        let moreMeaningsCommaSeparated = moreMeanings.join(', ');
        return(
            <p>{moreMeaningsCommaSeparated}</p>
        )
    }

    renderTextToSpeech(word){

        return(
            <PlayCircleFilled style={{fontSize: '25px', marginTop: '5px', marginLeft: '5px'}}
                              onClick={()=>speechSynthesis.speak(new SpeechSynthesisUtterance(word))}/>
        )
    }

    render() {
        // console.log(this.props.detailsWord?.additional_meaning[1])
        return (
            <div className="container-details">
                <Card style={{ padding: '15px', marginBottom: '10px'}}>
                    <div>
                        <div style={{display: 'flex'}}>
                            <h2 style={{fontSize: '2rem', fontWeight: 'bolder'}}>{this.props.detailsWord.full_word}</h2>
                            {this.renderTextToSpeech(this.props.detailsWord.full_word)}
                        </div>

                        <div style={{display:"flex"}}>
                            <span className="dot"></span>
                            {this.props.detailsWord.details && this.props.detailsWord.details?.syllables && this.renderSyllables(this.props.detailsWord.details.syllables)}
                            <span className="dot"></span>
                            {this.props.detailsWord.details && this.renderPronunciation(this.props.detailsWord.details.pronunciation)}

                        </div>

                    </div>
                    <div>
                        {this.props.detailsWord?.additional_meaning[1] && this.renderBanglaMeanings(this.props.detailsWord.additional_meaning[1][0][1])}
                    </div>
                </Card>


                <WordVariation variations={this.props.detailsWord?.additional_meaning[1]}/>


                <WordDefination definations={this.props.detailsWord?.details}/>

                <ImageList images={this.props.detailsWord?.images} />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(DetailsDesign);
