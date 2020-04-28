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

                    <Button color="primary" size="lg" className="mb-2">
                        <IntlMessages id="button.add-words" />
                    </Button>
                </div>
                <Separator className="mb-5" />

                <Row>
                    <Colxx lg="12" xl="8">
                        <WordListCards />
                    </Colxx>
                    <Colxx lg="12" xl="4" className="mb-4">
                        <RecentOrders />
                    </Colxx>
                </Row>

            </Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
)(PickWords);
