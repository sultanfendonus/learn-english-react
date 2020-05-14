import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card} from "antd";
import {
    SmileOutlined,
    ReadOutlined
} from '@ant-design/icons';

function mapStateToProps(state) {
    return {};
}

class ReviewWordList extends Component {

    renderWordList(words){
        return words.map((word,index)=>{
            return(
                <Card key={word._id}
                      title={`Word #${index+1}`}
                      extra={<a href="#">More</a>}
                      style={{ width: 300, margin: 10 }}>

                    <h2 style={{textAlign: 'center'}}>{word.english_word}</h2>

                    <div style={{display: 'flex', justifyContent: 'space-between'}}>

                        <div style={{padding: 15, background: '#00e078', borderRadius: '10%', cursor: 'pointer'}}>
                            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                                <SmileOutlined style={{fontSize: 25, color: 'white'}}/>
                                <p style={{fontWeight: 'bolder', color: 'white'}}>I Know</p>
                            </div>

                        </div>

                        <div style={{padding: 15, background: '#e01a73', borderRadius: '10%', cursor: 'pointer'}}>
                            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                                <ReadOutlined style={{fontSize: 25, color: 'white'}}/>
                                <p style={{fontWeight: 'bolder', color: 'white'}}>Learn it</p>
                            </div>

                        </div>
                    </div>
                </Card>
            )
        })
    }

    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center', flexFlow: 'wrap'}}>
                {this.props.words && this.renderWordList(this.props.words)}
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(ReviewWordList);