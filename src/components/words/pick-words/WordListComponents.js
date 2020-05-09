import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setWordViewModalVisibility} from '../../../actions/index'
import { Row, Card, CustomInput, CardTitle,FormGroup,Badge } from "reactstrap";
import { NavLink } from "react-router-dom";
import moment from "moment";

import IntlMessages from "../../../helpers/IntlMessages";
import { Colxx } from "../../../components/common/CustomBootstrap";
import ShowWordModal from "./ShowWordModal";
import {renderLocalFromNow} from "../../../helpers/Time";

function mapStateToProps(state) {
    return {};
}

class WordListComponents extends Component {

    state = {wordId: null}

    viewWordDetails(wordId){
        this.props.setWordViewModalVisibility(true)
        this.setState({
            wordId: wordId
        })
    }

    renderList(wordList){
        if(wordList.length > 0){
            return wordList.map((word)=>{
                return(
                    <Row key={word._id}>
                        <Colxx xxs="12">
                            <Card className="d-flex flex-row mb-3" style={{cursor: 'pointer'}} onClick={()=>this.viewWordDetails(word.word_id)} >
                                <div style={{cursor: "pointer"}} className="d-flex">
                                    <img alt="Thumbnail" src={word.image || "/assets/img/chocolate-cake-thumb.jpg"} className="list-thumbnail responsive border-0 card-img-left" />
                                </div>
                                <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                                    <div className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                                        <div to="/app/ui/cards" className="w-40 w-sm-100">
                                            <p className="list-item-heading mb-1 truncate">{word.english_word}</p>
                                        </div>
                                        <p className="mb-1 text-muted text-small w-15 w-sm-100">{word.bangla_meaning}</p>
                                        <p className="mb-1 text-muted text-small w-15 w-sm-100">{renderLocalFromNow(word.createdAt)}</p>
                                        <div className="w-15 w-sm-100">
                                            <Badge color="primary" pill >PROCESSED</Badge>
                                        </div>
                                    </div>
                                    <div className="custom-control custom-checkbox pl-1 align-self-center pr-4">
                                        <FormGroup className="mb-0">
                                            <CustomInput
                                                type="checkbox"
                                                id="check1"
                                                label=""
                                            />
                                        </FormGroup>
                                    </div>
                                </div>
                            </Card>
                        </Colxx>

                    </Row>
                )
            })
        }else {
            return (
                <p>Please pick some word first.</p>
            )
        }



    }
    render() {
        return (
            <div>
                <Row>
                    <Colxx xxs="12">
                        {/*<CardTitle className="mb-4">Word List</CardTitle>*/}
                        {this.props.wordList && this.renderList(this.props.wordList)}
                    </Colxx>
                </Row>
                <ShowWordModal wordId = {this.state.wordId}/>
            </div>

        );
    }
}

export default connect(
    mapStateToProps, {setWordViewModalVisibility}
)(WordListComponents);
