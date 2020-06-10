import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Tag } from 'antd';
import { CardText, CardSubtitle, Row, Card, CardBody, CardTitle,CardImg,Badge } from "reactstrap";
import {tagColors} from "../../../constants/defaultValues";
import {Separator} from "../../common/CustomBootstrap";

function mapStateToProps(state) {
    return {};
}

class WordDefination extends Component {

    renderSimilarWord(words){
        return words.map((word,index)=>{
            let color = tagColors[Math.floor(Math.random() * tagColors.length)];
            return(
                <Tag key={index} color={color}>{word}</Tag>
            )
        })
    }

    renderExample(examples){
        return examples.map((example,index)=>{
            return(
                <p key={index}><i>- {example}</i></p>
            )
        })
    }


    renderDefinationList(definations){
        console.log(definations)
        return definations.map((defination,index)=>{
            let color = tagColors[Math.floor(Math.random() * tagColors.length)];
            return(
                <div key={index} style={{display: 'flex', padding: '10px', flexDirection: 'column', marginBottom: '5px', border: `${color} 1px solid`}}>
                    <p style={{fontWeight: 'bold'}}>{index + 1}. ({defination.partOfSpeech}) {defination.definition}</p>

                    <div style={defination.similarTo && {marginBottom: '2px'}}>
                        <span style={defination.similarTo && {marginRight: '5px'}}>{defination.similarTo && `Similar word - `}</span>
                        {defination.similarTo && this.renderSimilarWord(defination.similarTo)}
                    </div>

                    <div style={defination.synonyms &&{ marginBottom: '2px'}}>
                        <span style={ defination.synonyms && {marginRight: '5px'}}>{defination.synonyms && `Synonyms - `}</span>
                        {defination.synonyms && this.renderSimilarWord(defination.synonyms)}
                    </div>

                    <div style={defination.antonyms && {marginBottom: '2px'}}>
                        <span style={defination.antonyms && {marginRight: '5px'}}>{defination.antonyms && `Antonyms - `}</span>
                        {defination.antonyms && this.renderSimilarWord(defination.antonyms)}
                    </div>
                    <p>{defination.examples && `Examples:`}</p>
                    <p style={{fontWeight: 'bold', fontSize: 12}}>{defination.examples && this.renderExample(defination.examples)}</p>

                </div>
            )
        })
    }
    render() {
        return (
            <Card className="mb-2">
                <div className="defination-container">
                    <p><b>Definitions:</b></p>
                    <div>
                        {this.props?.definations?.results && this.renderDefinationList(this.props.definations.results)}
                    </div>
                </div>

            </Card>
        );
    }
}

export default connect(
    mapStateToProps,
)(WordDefination);
