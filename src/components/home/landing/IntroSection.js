import React, {Component} from 'react';
import {connect} from 'react-redux';
import './IntroSection.scss'
import {Button} from "@material-ui/core";
import learnImage from '../../../assets/image/learn-image.jpg'

function mapStateToProps(state) {
    return {};
}

class IntroSection extends Component {
    render() {
        return (
            <div className='intro-container'>
                <div className='intro-container-section1'>
                    <p style={{fontSize: 50, lineHeight: "normal"}}>ইংরেজি শিখুন স্মার্ট পদ্ধতিতে!</p>
                    <p style={{fontSize: 25, lineHeight: "normal"}}>স্মার্ট টুলস দিয়ে ইংরেজি শেখার পাশাপাশি আপনি ইংরেজি প্র্যাক্টিসের জন্য এখানে অন্যদের সাথে ভিডিও কথা বলতে পারবেন বিনামূল্যে। </p>
                    <Button href={'/app'} style={{marginTop: 20}} variant="contained" color="primary">
                        এখনই শুরু করুন
                    </Button>
                </div>

                <div className='intro-container-section2'>
                    <img src={learnImage}  alt=""/>
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
)(IntroSection);