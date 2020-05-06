import React, {Component} from 'react';
import {connect} from 'react-redux';
import './DetailsDesign.style.scss'
import WordVariation from "./WordVariation";
import WordDefination from "./WordDefination";
import {Badge, Card, CardBody, CardImg, CardSubtitle, CardText} from "reactstrap";
import ImageList from "./ImageList";
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
    render() {
        // console.log(this.props.detailsWord?.additional_meaning[1])
        return (
            <div className="container-details">
                <Card style={{ padding: '15px'}}>
                    <div style={{display:"flex"}}>
                        <h3>{this.props.detailsWord.full_word}</h3>
                        <span className="dot"></span>
                        {this.props.detailsWord.details && this.renderSyllables(this.props.detailsWord.details.syllables)}
                        <span className="dot"></span>
                        {this.props.detailsWord.details && this.renderPronunciation(this.props.detailsWord.details.pronunciation)}

                    </div>
                    <div>
                        {this.props.detailsWord?.additional_meaning[1] && this.renderBanglaMeanings(this.props.detailsWord.additional_meaning[1][0][1])}
                    </div>
                </Card>


                <WordVariation variations={this.props.detailsWord?.additional_meaning[1]}/>


                <WordDefination />

                <ImageList />
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(DetailsDesign);
