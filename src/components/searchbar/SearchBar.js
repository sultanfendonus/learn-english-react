import React, {Component} from 'react';
import {connect} from 'react-redux';
import {searchAWord} from '../../actions/index'
import {Input} from "reactstrap";
import {menuHiddenBreakpoint} from "../../constants/defaultValues";

function mapStateToProps(state) {
    return {};
}

class SearchBar extends Component {
    state = {searchKeyword: ''}

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
            </div>
        );
    }
}

export default connect(
    mapStateToProps, {searchAWord}
)(SearchBar);