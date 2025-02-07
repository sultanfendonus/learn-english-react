import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setWordViewModalVisibility} from '../../../actions/index'
import {Row, Card, CustomInput, CardTitle, FormGroup, Badge} from "reactstrap";
import {NavLink} from "react-router-dom";
import moment from "moment";

import IntlMessages from "../../../helpers/IntlMessages";
import {Colxx} from "../../../components/common/CustomBootstrap";
import ShowWordModal from "./ShowWordModal";
import {renderLocalFromNow} from "../../../helpers/Time";
import {wordPracticeIndicator} from "../../../helpers/Word"
import {Alert} from 'antd';
import FlipMove from 'react-flip-move';
import Avatar from '@material-ui/core/Avatar';
import './WordListComponent.style.scss'


function mapStateToProps(state) {
    return {};
}


class WordListComponents extends Component {

    state = {wordId: null}

    viewWordDetails(wordId) {
        this.props.setWordViewModalVisibility(true)
        this.setState({
            wordId: wordId
        })
    }


    renderList(wordList) {

        if (wordList.length > 0) {
            return wordList.map((word, index) => {
                return (
                    <Row key={word._id}>
                        <Colxx xxs="12">
                            <Card className="d-flex flex-row mb-3"
                                  style={index === 0 && this.props.isHighlightFirstWord ? {
                                      height: '150px',
                                      cursor: 'pointer',
                                      border: 'solid'
                                  } : {cursor: 'pointer'}} onClick={() => this.viewWordDetails(word.word_id)}>
                                <div style={{cursor: "pointer"}} className="d-flex">
                                    {/*<img alt="Thumbnail" src={word.image || "/assets/img/vocabulary-icon-png-4.png"} className="list-thumbnail responsive border-0 card-img-left" style={index === 0 && this.props.isHighlightFirstWord ? {height: '145px'}:null} />*/}
                                    <div className='image-container-list' style={{padding: 10}}>
                                        <Avatar
                                            style={index === 0 && this.props.isHighlightFirstWord ? {
                                                width: 140,
                                                height: 140,
                                                backgroundColor: `${this.props.color}`
                                            } : {width: 80, height: 80, backgroundColor: `${this.props.color}`}}
                                        >{word.english_word.charAt(0).toUpperCase()}
                                        </Avatar>
                                    </div>

                                </div>
                                <div className="pl-2 d-flex flex-grow-1 min-width-zero">
                                    <div
                                        className="card-body align-self-center d-flex flex-column flex-lg-row justify-content-between min-width-zero align-items-lg-center">
                                        <div to="/app/ui/cards" className="w-40 w-sm-100">
                                            <p className="list-item-heading mb-1 truncate"
                                               style={{fontWeight: 'bolder'}}>{word.english_word}</p>
                                        </div>
                                        <p className="mb-1 text-muted text-small w-15 w-sm-100">{word.bangla_meaning}</p>
                                        <p className="mb-1 text-muted text-small w-15 w-sm-100">{renderLocalFromNow(word.createdAt)}</p>
                                        <div className="w-15 w-sm-100">
                                            <Badge color="primary" pill>{wordPracticeIndicator(word.hit)}</Badge>
                                        </div>
                                    </div>
                                    {/*<div className="custom-control custom-checkbox pl-1 align-self-center pr-4">*/}
                                    {/*    <FormGroup className="mb-0">*/}
                                    {/*        <CustomInput*/}
                                    {/*            type="checkbox"*/}
                                    {/*            id="check1"*/}
                                    {/*            label=""*/}
                                    {/*        />*/}
                                    {/*    </FormGroup>*/}
                                    {/*</div>*/}
                                </div>
                            </Card>
                        </Colxx>

                    </Row>


                )
            })
        } else {
            return (
                <Alert message={this.props.emptyMessage} type="error"/>

            )
        }

    }

    render() {
        return (
            <div>

                <Row>
                    <Colxx xxs="12">
                        {/*<CardTitle className="mb-4">Word List</CardTitle>*/}
                        <FlipMove>
                            {this.props.wordList && this.renderList(this.props.wordList)}
                        </FlipMove>
                    </Colxx>
                </Row>

                <ShowWordModal wordId={this.state.wordId}/>
            </div>

        );
    }
}

export default connect(
    mapStateToProps, {setWordViewModalVisibility}
)(WordListComponents);
