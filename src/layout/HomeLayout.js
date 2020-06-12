import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HomeAppBar from "../components/appbar/HomeAppBar";

export default function Landing(props) {

    return (
        <div >
            <HomeAppBar />
            <div style={{padding: 10, background: '#eeeff3'}}>
                {props.children}
            </div>

        </div>
    );
}