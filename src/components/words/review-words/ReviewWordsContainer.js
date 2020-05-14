import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getReviewWords} from '../../../actions/index'
import ReviewWordList from "./ReviewWordList";

function mapStateToProps(state) {
    return {
        reviewWords: state.HistoryReducers.reviewWords
    };
}

class ReviewWordsContainer extends Component {
    componentDidMount() {
        this.props.getReviewWords()
    }

    render() {
        return (
            <div>
                <ReviewWordList words={this.props.reviewWords} />
            </div>
        );
    }
}

export default connect(
    mapStateToProps, {getReviewWords}
)(ReviewWordsContainer);