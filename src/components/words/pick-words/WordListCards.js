import React, {Component} from 'react';
import {connect} from 'react-redux';
import IconCardsCarousel from "../../../containers/dashboards/IconCardsCarousel";
import ImageCardList from "../../../containers/ui/ImageCardList";

function mapStateToProps(state) {
    return {};
}

class WordListCards extends Component {
    render() {
        return (
            <div>
                <ImageCardList/>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(WordListCards);
