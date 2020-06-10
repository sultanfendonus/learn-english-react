import React, {Component} from 'react';
import {connect} from 'react-redux';
import { CardText, CardSubtitle, Row, Card, CardBody, CardTitle,CardImg,Badge } from "reactstrap";
import './DetailsDesign.style.scss'
import {Tag} from "antd";
import {tagColors} from "../../../constants/defaultValues";

function mapStateToProps(state) {
    return {};
}

class WordVariation extends Component {
    renderEnglishMeaning(words){
        return words.map((word,index)=>{
            var color = tagColors[Math.floor(Math.random() * tagColors.length)];
            return(
                <Tag key={index} color={color}>{word}</Tag>
            )
        })
    }
    renderVariant(variant){
        return variant.map((v, index)=>{
            return(
                <div key={index} style={{display: 'flex', marginBottom: '5px'}}>
                    <div>
                        <span style={{fontWeight: 'bold'}}>{v[0]}</span>
                        <span style={{marginLeft: '5px', marginRight: '5px'}}> - </span>
                        {this.renderEnglishMeaning(v[1])}
                    </div>
                </div>
            )
        })
    }
    renderVariations(variations){
        return variations.map((variant,index)=>{
            return(
                <React.Fragment key={index}>
                    <Card key={index} className="mb-3">
                        <div className="defination-container">
                            <p style={{fontWeight: 'bold', fontSize: 18}}>{variant[0]}</p>
                            <div>
                                {this.renderVariant(variant[2])}
                            </div>
                        </div>
                    </Card>

                </React.Fragment>
            )
        })
    }
    render() {
        return (
            <React.Fragment>
                {this.props.variations && this.renderVariations(this.props.variations)}
            </React.Fragment>

        );
    }
}

export default connect(
    mapStateToProps,
)(WordVariation);
