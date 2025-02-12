import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setWordViewModalVisibility} from '../../../actions/index'
import {Badge, Card, CardBody, CardTitle} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import PerfectScrollbar from "react-perfect-scrollbar";
import data from "../../../data/products";
import {NavLink} from "react-router-dom";
import moment from "moment";
import ShowWordModal from "../pick-words/ShowWordModal";
import {renderLocalFromNow} from '../../../helpers/Time'
import {wordPracticeIndicator} from "../../../helpers/Word";
import Avatar from '@material-ui/core/Avatar';

function mapStateToProps(state) {
    return {};
}

class HistoryList extends Component {
    state = {wordId: null}

    viewWordDetails(wordId) {
        this.props.setWordViewModalVisibility(true)
        this.setState({
            wordId: wordId
        })
    }



    renderList(histories) {
        if (!histories) {
            return <p>Please pick some word to start lesson.</p>
        }
        return histories.map((history, index) => {
            return (
                <div style={{cursor: 'pointer'}} onClick={()=>this.viewWordDetails(history.word_id)}
                     key={index} className="d-flex flex-row mb-3">
                    <div
                        className="d-block position-relative"
                    >
                        {/*<img*/}
                        {/*    src={history.image || "/assets/img/vocabulary-icon-png-4.png"}*/}
                        {/*    alt={history.english_word}*/}
                        {/*    className="list-thumbnail border-0"*/}
                        {/*/>*/}
                        <Avatar
                            style={{
                                width: 80,
                                height: 80,
                                backgroundColor: 'darkcyan'
                            }}
                        >{history.english_word.charAt(0).toUpperCase()}
                        </Avatar>
                        <Badge
                            key={index}
                            className="position-absolute badge-top-right"
                            color={'primary'}
                            pill
                        >
                            {wordPracticeIndicator(history.hit)}
                        </Badge>
                    </div>

                    <div className="pl-3 pt-2 pr-2 pb-2">
                        <div>
                            <p style={{fontWeight: 'bold'}} className="list-item-heading">{history.english_word}</p>
                            <div className="pr-4">
                                <p className="text-muted mb-1 text-small">
                                    {history.bangla_meaning}
                                </p>
                            </div>
                            <div className="text-primary text-small font-weight-medium d-none d-sm-block">
                                {
                                    renderLocalFromNow(history.updatedAt)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            );
        })
    }

    render() {
        return (
            <div>
                <Card>
                    <div className="position-absolute card-top-buttons">
                        {/*<button className="btn btn-header-light icon-button">*/}
                        {/*    <i className="simple-icon-refresh"/>*/}
                        {/*</button>*/}
                    </div>
                    <CardBody>
                        <CardTitle>
                            Recent History
                        </CardTitle>
                        <div  >
                            {/*<PerfectScrollbar*/}
                            {/*    options={{suppressScrollX: true, wheelPropagation: false}}*/}
                            {/*>*/}
                                {this.renderList(this.props.histories)}
                            {/*</PerfectScrollbar>*/}
                        </div>
                    </CardBody>
                </Card>
                <ShowWordModal wordId={this.state.wordId}/>
            </div>

        );
    }
}

export default connect(
    mapStateToProps, {setWordViewModalVisibility}
)(HistoryList);
