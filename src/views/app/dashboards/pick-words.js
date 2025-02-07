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
function mapStateToProps(state) {
    return {};
}

class PickWords extends Component {
    render() {
        return (
            <Fragment>
                <div className="breadcrumb-container">
                    <div>
                        <Breadcrumb heading="menu.pick-words" match={this.props.match} />
                    </div>

                    <PickWordsButton />
                </div>
                <Separator className="mb-5" />

                <Row>
                    <Colxx lg="12" xl="8">
                        <WordListCards />
                        <ShouldLearnCard />
                    </Colxx>
                    <Colxx lg="12" xl="4" className="mb-4">
                        <HistoryCard />
                    </Colxx>
                </Row>

            </Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
)(PickWords);
