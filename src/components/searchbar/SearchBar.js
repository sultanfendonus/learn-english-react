import React, {Component} from 'react';
import {connect} from 'react-redux';
import {searchAWord, getASingleWord, updateASingleWord, pickAWord, updateASingleWordImages,
    getTodaysHistory, pushHistoryToTodayList, pickWordFromSearchList} from '../../actions/index'
import {Input} from "reactstrap";
import {menuHiddenBreakpoint} from "../../constants/defaultValues";
import { Modal } from 'antd';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import {Loader} from "rsuite";
import axios from "axios";




function mapStateToProps(state) {
    return {
        wordSearchResult: state.WordReducers.wordSearchResult
    };
}

class SearchBar extends Component {
    state = {searchKeyword: '', visible: false}

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleSearchInputChange(e){
        this.setState({searchKeyword: e.target.value})
    }

    handleSearchInputKeyPress(e){
        if (e.key === "Enter") {
            this.search(this.state.searchKeyword)
        }

    }

    search(word){
        this.props.searchAWord(word)
        this.setState({visible: true})
    }

    handleSearchIconClick = e => {
        if (window.innerWidth < menuHiddenBreakpoint) {
            let elem = e.target;
            if (!e.target.classList.contains("search")) {
                if (e.target.parentElement.classList.contains("search")) {
                    elem = e.target.parentElement;
                } else if (
                    e.target.parentElement.parentElement.classList.contains("search")
                ) {
                    elem = e.target.parentElement.parentElement;
                }
            }

            if (elem.classList.contains("mobile-view")) {
                this.search(this.state.searchKeyword)
                elem.classList.remove("mobile-view");
                this.removeEventsSearch();
            } else {
                elem.classList.add("mobile-view");
                this.addEventsSearch();
            }
        } else {
            this.search(this.state.searchKeyword)
        }
    };
    addEventsSearch = () => {
        document.addEventListener("click", this.handleDocumentClickSearch, true);
    };
    removeEventsSearch = () => {
        document.removeEventListener("click", this.handleDocumentClickSearch, true);
    };

    handleDocumentClickSearch = e => {
        let isSearchClick = false;
        if (
            e.target &&
            e.target.classList &&
            (e.target.classList.contains("navbar") ||
                e.target.classList.contains("simple-icon-magnifier"))
        ) {
            isSearchClick = true;
            if (e.target.classList.contains("simple-icon-magnifier")) {
                this.search(this.state.searchKeyword)
            }
        } else if (
            e.target.parentElement &&
            e.target.parentElement.classList &&
            e.target.parentElement.classList.contains("search")
        ) {
            isSearchClick = true;
        }

        if (!isSearchClick) {
            const input = document.querySelector(".mobile-view");
            if (input && input.classList) input.classList.remove("mobile-view");
            this.removeEventsSearch();
            this.setState({
                searchKeyword: ""
            });
        }
    };

    renderLoader(){
        return(
            <div style={{textAlign: 'center'}}>
                <Loader/>
                <p>Loading...</p>
            </div>
        )
    }

    pickWord(word){
        this.props.pickWordFromSearchList(word._id)

        if (!word.bangla_meaning || word.bangla_meaning === undefined || word.bangla_meaning === "") {
            this.getTranslationFromGoogle(word)
        } else {
            console.log('no need to save the word')
            let image = word.images && word.images[0].urls.regular;

            this.props.pickAWord({
                english_word: word.full_word,
                bangla_meaning: word.bangla_meaning,
                word_id: word._id,
                image: image || null
            })

        }

        if (!word.images || word.images === undefined
            || word.images === "" || word.images.length === 0) {
            this.getImagesFromUnsplash(word)
        } else {
            console.log("No need to save Image.")
        }
    }

    getTranslationFromGoogle = word => {
        let text = word.full_word
        axios
            .get(
                `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=bn&hl=en-GB&dt=t&dt=bd&q=${text}`
            )
            .then(result => {
                this.props.updateASingleWord({
                    id: word._id,
                    bangla_meaning: result.data[0][0][0],
                    additional_meaning: result.data
                })

                this.props.pickAWord({
                    english_word: word.full_word,
                    bangla_meaning: result.data[0][0][0],
                    word_id: word._id
                })
            });
    };


    async getImagesFromUnsplash(word) {
        //No need this try catch here. but I put it here only for I am too lazy.
        try {
            this.props.updateASingleWordImages({
                full_word: word.full_word,
                word_id: word._id,
            })
        } catch (e) {
            console.log(e)
        }
    }

    renderSearchList(){
        if(this.props.wordSearchResult.length === 0){
            return (<p>No word found! </p>)
        }
        return this.props.wordSearchResult.map((word)=>{
            return(
                <div key={word._id} style={{display: "flex", justifyContent: 'space-between', marginTop: 10}}>
                    <h3 style={{fontWeight: "bold"}}>{word.full_word}</h3>
                    {word.isPicked ? <p>Picked</p>: <Button
                        onClick={()=>this.pickWord(word)}
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                    >
                        Pick Word
                    </Button>}

                </div>
            )
        })
    }

    render() {
        return (
            <div className="search" data-search-path="/app/pages/search">
                <Input
                    name="searchKeyword"
                    id="searchKeyword"
                    placeholder="Search Word"
                    value={this.state.searchKeyword}
                    onChange={e => this.handleSearchInputChange(e)}
                    onKeyPress={e => this.handleSearchInputKeyPress(e)}
                />
                <span
                    className="search-icon"
                    onClick={e => this.handleSearchIconClick(e)}
                >
              <i className="simple-icon-magnifier" />
            </span>

                <Modal
                    title="Search Result"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer = {null}
                >
                    {this.props.wordSearchResult ? this.renderSearchList(): this.renderLoader()}
                </Modal>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, {searchAWord, getASingleWord, updateASingleWord, pickAWord, updateASingleWordImages,
        getTodaysHistory, pushHistoryToTodayList, pickWordFromSearchList}
)(SearchBar);