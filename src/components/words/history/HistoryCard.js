import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAllHistory} from '../../../actions/index'
import HistoryList from "./HistoryList";

function mapStateToProps(state) {
    return {
        histories: state.HistoryReducers.allHistory
    };
}

class HistoryCard extends Component {
    componentDidMount() {
        this.props.getAllHistory()
    }

    render() {
        return (
            <div>
                <HistoryList histories={this.props.histories}/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, {getAllHistory}
)(HistoryCard);
