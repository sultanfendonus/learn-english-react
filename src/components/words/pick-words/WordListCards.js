import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getTodaysHistory} from '../../../actions/index'
import IconCardsCarousel from "../../../containers/dashboards/IconCardsCarousel";
import ImageCardList from "../../../containers/ui/ImageCardList";
import WordListComponents from "./WordListComponents";

function mapStateToProps(state) {
    return {
        todaysHistory: state.HistoryReducers.todaysHistory
    };
}

class WordListCards extends Component {
    componentDidMount() {
        this.props.getTodaysHistory()
    }

    render() {
        return (
            <div>
                <WordListComponents wordList={this.props.todaysHistory}/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, {getTodaysHistory}
)(WordListCards);
