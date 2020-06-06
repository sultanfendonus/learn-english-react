import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getShouldLearnHistory} from '../../../../actions/index'
import IconCardsCarousel from "../../../../containers/dashboards/IconCardsCarousel";
import ImageCardList from "../../../../containers/ui/ImageCardList";
import WordListComponents from "./../WordListComponents";

function mapStateToProps(state) {
    return {
        shouldLearnHistory: state.HistoryReducers.shouldLearnHistory
    };
}

class ShouldLearnCard extends Component {
    componentDidMount() {
        this.props.getShouldLearnHistory()
    }

    render() {
        return (
            <div style={{marginTop: '10px'}}>
                <h2>You should practice -</h2>
                <WordListComponents color={'#5674b9'} wordList={this.props.shouldLearnHistory} emptyMessage="This feature will enable soon."/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, {getShouldLearnHistory}
)(ShouldLearnCard);
