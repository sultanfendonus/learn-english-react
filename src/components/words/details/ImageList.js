import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Badge, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Row} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import {Colxx} from "../../common/CustomBootstrap";

function mapStateToProps(state) {
    return {};
}

class ImageList extends Component {
    render() {
        return (
            <Colxx xxs="12">
                <CardTitle >Related Image:</CardTitle>
                <Row>
                    <Colxx xxs="12" xs="6" lg="4">
                        <Card className="mb-4">
                            <div className="position-relative">
                                <CardImg top src="https://images.unsplash.com/photo-1529990131237-cfa5ce9517b6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzMTQ0NX0" alt="Card image cap" />
                                <Badge color="primary" pill className="position-absolute badge-top-left">NEW</Badge>
                                <Badge color="secondary" pill className="position-absolute badge-top-left-2">TRENDING</Badge>
                            </div>
                            <CardBody>
                                <CardSubtitle className="mb-4">Homemade Cheesecake with Fresh Berries and Mint</CardSubtitle>
                                <CardText className="text-muted text-small mb-0 font-weight-light">09.04.2018</CardText>
                            </CardBody>
                        </Card>
                    </Colxx>

                    <Colxx xxs="12" xs="6" lg="4">
                        <Card className="mb-4">
                            <div className="position-relative">
                                <CardImg top src="https://images.unsplash.com/photo-1506362489888-115b3ad74715?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzMTQ0NX0" alt="Card image cap" />
                                <Badge color="primary" pill className="position-absolute badge-top-left">NEW</Badge>
                                <Badge color="secondary" pill className="position-absolute badge-top-left-2">TRENDING</Badge>
                            </div>
                            <CardBody>
                                <CardSubtitle className="mb-4">Homemade Cheesecake with Fresh Berries and Mint</CardSubtitle>
                                <CardText className="text-muted text-small mb-0 font-weight-light">09.04.2018</CardText>
                            </CardBody>
                        </Card>
                    </Colxx>

                    <Colxx xxs="12" xs="6" lg="4">
                        <Card className="mb-4">
                            <div className="position-relative">
                                <CardImg top src="https://images.unsplash.com/photo-1551452133-33924979ebce?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzMTQ0NX0" alt="Card image cap" />
                                <Badge color="primary" pill className="position-absolute badge-top-left">NEW</Badge>
                                <Badge color="secondary" pill className="position-absolute badge-top-left-2">TRENDING</Badge>
                            </div>
                            <CardBody>
                                <CardSubtitle className="mb-4">Homemade Cheesecake with Fresh Berries and Mint</CardSubtitle>
                                <CardText className="text-muted text-small mb-0 font-weight-light">09.04.2018</CardText>
                            </CardBody>
                        </Card>
                    </Colxx>

                    <Colxx xxs="12" xs="6" lg="4">
                        <Card className="mb-4">
                            <div className="position-relative">
                                <CardImg top src="https://images.unsplash.com/photo-1543296086-3da1e00d56e4?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzMTQ0NX0" alt="Card image cap" />
                                <Badge color="primary" pill className="position-absolute badge-top-left">NEW</Badge>
                                <Badge color="secondary" pill className="position-absolute badge-top-left-2">TRENDING</Badge>
                            </div>
                            <CardBody>
                                <CardSubtitle className="mb-4">Homemade Cheesecake with Fresh Berries and Mint</CardSubtitle>
                                <CardText className="text-muted text-small mb-0 font-weight-light">09.04.2018</CardText>
                            </CardBody>
                        </Card>
                    </Colxx>

                    <Colxx xxs="12" xs="6" lg="4">
                        <Card className="mb-4">
                            <div className="position-relative">
                                <CardImg top src="https://images.unsplash.com/photo-1544513341-64ccad5d6bab?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjEzMTQ0NX0" alt="Card image cap" />
                                <Badge color="primary" pill className="position-absolute badge-top-left">NEW</Badge>
                                <Badge color="secondary" pill className="position-absolute badge-top-left-2">TRENDING</Badge>
                            </div>
                            <CardBody>
                                <CardSubtitle className="mb-4">Homemade Cheesecake with Fresh Berries and Mint</CardSubtitle>
                                <CardText className="text-muted text-small mb-0 font-weight-light">09.04.2018</CardText>
                            </CardBody>
                        </Card>
                    </Colxx>
                </Row>
            </Colxx>
        );
    }
}

export default connect(
    mapStateToProps,
)(ImageList);
