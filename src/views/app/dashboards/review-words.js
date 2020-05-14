import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Button, Row} from "reactstrap";
import {Colxx, Separator} from "../../../components/common/CustomBootstrap";
import Breadcrumb from "../../../containers/navs/Breadcrumb";

import './pick-words.style.scss'
import IntlMessages from "../../../helpers/IntlMessages";
import WordListCards from "../../../components/words/pick-words/WordListCards";
import RecentOrders from "../../../containers/dashboards/RecentOrders";
import IconCardsCarousel from "../../../containers/dashboards/IconCardsCarousel";
import SalesChartCard from "../../../containers/dashboards/SalesChartCard";
import PickWordsButton from "../../../components/words/pick-words/PickWordsButton";
import HistoryCard from "../../../components/words/history/HistoryCard";
import ShouldLearnCard from "../../../components/words/pick-words/should-learn/ShouldLearnCard";
import ReviewWordsContainer from "../../../components/words/review-words/ReviewWordsContainer";
function mapStateToProps(state) {
    return {};
}

class PickWords extends Component {
    render() {
        return (
            <Fragment>
                <div className="breadcrumb-container">
                    <div>
                        <Breadcrumb heading="Review Words" match={this.props.match} />
                    </div>

                </div>
                <Separator className="mb-5" />

                <Row>
                    <Colxx lg="12" xl="12">
                        <ReviewWordsContainer />
                    </Colxx>
                </Row>

            </Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
)(PickWords);
