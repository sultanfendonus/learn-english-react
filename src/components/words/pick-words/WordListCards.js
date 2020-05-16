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
                <h2>Today's lesson-</h2>
                <WordListComponents isHighlightFirstWord={true} wordList={this.props.todaysHistory} emptyMessage="Please pick some words to enable this feature."/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, {getTodaysHistory}
)(WordListCards);
