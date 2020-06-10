import React, {Component} from 'react';
import {connect} from 'react-redux';
import {setWordViewModalVisibility, removeAWordFromReview} from '../../../actions/index'
import {Card} from "antd";
import {
    SmileOutlined,
    ReadOutlined
} from '@ant-design/icons';
import ShowWordModal from "../pick-words/ShowWordModal";

function mapStateToProps(state) {
    return {};
}

class ReviewWordList extends Component {
    state = {wordId: null}

    viewWordDetails(wordId){
        this.props.setWordViewModalVisibility(true)
        this.setState({
            wordId: wordId
        })
    }

    renderWordList(words){
        return words.map((word,index)=>{
            return(
                <Card key={word._id}
                      title={`Word #${index+1}`}
                      // extra={<a href="#">More</a>}
                      style={{ width: 300, margin: 10 }}>

                    <h2 style={{textAlign: 'center', fontWeight: "bold"}}>{word.english_word}</h2>

                    <div style={{display: 'flex', justifyContent: 'space-between'}}>

                        <div onClick={()=> this.props.removeAWordFromReview(word._id)} style={{padding: 15, background: '#00e078', borderRadius: '10%', cursor: 'pointer'}}>
                            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                                <SmileOutlined style={{fontSize: 25, color: 'white'}}/>
                                <p style={{fontWeight: 'bolder', color: 'white'}}>I Know</p>
                            </div>

                        </div>

                        <div onClick={()=>this.viewWordDetails(word.word_id)} style={{padding: 15, background: '#e01a73', borderRadius: '10%', cursor: 'pointer'}}>
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
            <React.Fragment>
                <div style={{display: 'flex', justifyContent: 'center', flexFlow: 'wrap'}}>
                    {this.props.words && this.renderWordList(this.props.words)}
                </div>

                <ShowWordModal wordId = {this.state.wordId}/>
            </React.Fragment>

        );
    }
}

export default connect(
    mapStateToProps, {setWordViewModalVisibility, removeAWordFromReview}
)(ReviewWordList);