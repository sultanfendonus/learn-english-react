import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Tag } from 'antd';
import { CardText, CardSubtitle, Row, Card, CardBody, CardTitle,CardImg,Badge } from "reactstrap";


function mapStateToProps(state) {
    return {};
}

class WordDefination extends Component {
    render() {
        return (
            <Card className="mb-2">
                <div className="defination-container">
                    <p>Defination:</p>
                    <div>
                        <div style={{display: 'flex', flexDirection: 'column'}}>
                            <p>1. (Noun) a single distinct meaningful element of speech or writing, used with others (or sometimes alone) form a sentence and typically shown wit on either side when written or printed. “I don’t like the word ‘unofficial’”</p>
                            <div>
                                <span style={{marginRight: '5px'}}>Similar Word</span>
                                <Tag color="magenta">magenta</Tag>
                                <Tag color="red">red</Tag>
                                <Tag color="volcano">volcano</Tag>
                                <Tag color="orange">orange</Tag>
                                <Tag color="gold">gold</Tag>
                            </div>
                        </div>

                        <div style={{display: 'flex', flexDirection: 'column', marginTop: '5px'}}>
                            <p>2. (Noun) a single distinct meaningful element of speech or writing, used with others (or sometimes alone) form a sentence and typically shown wit on either side when written or printed. “I don’t like the word ‘unofficial’”</p>
                            <div>
                                <span style={{marginRight: '5px'}}>Similar Word</span>
                                <Tag color="magenta">magenta</Tag>
                                <Tag color="red">red</Tag>
                                <Tag color="volcano">volcano</Tag>
                                <Tag color="orange">orange</Tag>
                                <Tag color="gold">gold</Tag>
                            </div>
                        </div>

                    </div>
                </div>

            </Card>
        );
    }
}

export default connect(
    mapStateToProps,
)(WordDefination);
