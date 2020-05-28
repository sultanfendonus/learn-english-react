import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import LiveConversationContainer from "../../../components/live-conversation/LiveConversationContainer";
import Breadcrumb from "../../../containers/navs/Breadcrumb";
import {Colxx, Separator} from "../../../components/common/CustomBootstrap";
import {Row} from "reactstrap";
import ReviewWordsContainer from "../../../components/words/review-words/ReviewWordsContainer";

function mapStateToProps(state) {
    return {};
}

class LiveConversation extends Component {
    render() {
        return (

            <Fragment>

                <Row>
                    <Colxx lg="12" xl="12">
                        <LiveConversationContainer/>
                    </Colxx>
                </Row>

            </Fragment>
        );
    }
}

export default connect(
    mapStateToProps,
)(LiveConversation);