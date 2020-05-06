import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Badge, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle, Row} from "reactstrap";
import IntlMessages from "../../../helpers/IntlMessages";
import {Colxx} from "../../common/CustomBootstrap";
import moment from 'moment'

function mapStateToProps(state) {
    return {};
}

class ImageList extends Component {
    renderImageList(images){
        return images.map((image,index)=>{
            return(
                <Colxx key={index} xxs="12" xs="6" lg="4">
                    <Card className="mb-4">
                        <div className="position-relative">
                            <CardImg top src={image.urls.regular} alt="Card image cap" />
                            <Badge color="primary" pill className="position-absolute badge-top-left">Unsplash</Badge>
                            {/*<Badge color="secondary" pill className="position-absolute badge-top-left-2">TRENDING</Badge>*/}
                        </div>
                        <CardBody>
                            <CardSubtitle className="mb-4">{image.description}</CardSubtitle>
                            <CardText className="text-muted text-small mb-0 font-weight-light">Photo by - <a target="_blank" style={{color: 'blue'}} href={`https://unsplash.com/@${image.user_name}`}>{`${image.full_name}`}</a></CardText>
                            <CardText className="text-muted text-small mb-0 font-weight-light">{moment(image.created_at).format('MMMM Do YYYY, h:mm:ss a')}</CardText>
                        </CardBody>
                    </Card>
                </Colxx>
            )
        })
    }
    render() {
        return (
            <Colxx xxs="12">
                <CardTitle >{this.props.images && "Related Image:"}</CardTitle>
                <Row>
                    {this.props.images && this.renderImageList(this.props.images)}
                </Row>
            </Colxx>
        );
    }
}

export default connect(
    mapStateToProps,
)(ImageList);
