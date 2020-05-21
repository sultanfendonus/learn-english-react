import React, { useEffect, useState, useRef } from "react";
import {connect} from 'react-redux';
import "./LiveVideo.style.css";
import io from "socket.io-client";
import Peer from "simple-peer";
import { Modal, Button } from 'antd';

function LiveVideo(props) {
    const [yourID, setYourID] = useState("");
    const [users, setUsers] = useState({});
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [startCalling, setStartCalling] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callerName, setCallerName] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [callRejected, setCallRejected] = useState(false);

    const userVideo = useRef();
    const partnerVideo = useRef();
    const socket = useRef();

    useEffect(() => {
        socket.current = io.connect(process.env.REACT_APP_SOCKET_URL);

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then(stream => {
                setStream(stream);
                if (userVideo.current) {
                    userVideo.current.srcObject = stream;
                }
            });

        socket.current.on("yourID", id => {
            setYourID(id);
            socket.current.emit("setName",{id: id, name: props.name})
        });
        socket.current.on("allUsers", users => {
            console.log(users);
            setUsers(users);
        });

        socket.current.on("hey", data => {
            console.log(data)
            setReceivingCall(true);
            setCaller(data.from);
            setCallerName(data.name)
            setCallerSignal(data.signal);
        });
    }, []);

    function callPeer(id) {
        setStartCalling(true)
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        });

        peer.on("signal", data => {
            socket.current.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: yourID,
                name: props.firstName
            });
        });

        peer.on("stream", stream => {
            if (partnerVideo.current) {
                partnerVideo.current.srcObject = stream;
            }
        });

        socket.current.on("callAccepted", signal => {
            setCallAccepted(true);
            peer.signal(signal);
        });
    }

    function acceptCall() {
        setCallAccepted(true);
        setStartCalling(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            config: {
                iceServers: [
                    {
                        urls: "stun:numb.viagenie.ca",
                        username: "sunnysultan1640@gmail.com",
                        credential: "16407916"
                    },
                    {
                        urls: "turn:numb.viagenie.ca",
                        username: "sunnysultan1640@gmail.com",
                        credential: "16407916"
                    }
                ]
            },
            stream: stream
        });
        peer.on("signal", data => {
            socket.current.emit("acceptCall", {
                signal: data,
                to: caller,
                from: yourID
            });
        });

        peer.on("stream", stream => {
            partnerVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
    }

    function rejectCall(){
        setCallRejected(true)
    }


    let UserVideo;
    if (stream) {
        UserVideo = <video style={{width:150}} playsInline muted ref={userVideo} autoPlay />;
    }

    let PartnerVideo;
    if (callAccepted) {
        PartnerVideo = <video style={{width: '100%'}} playsInline ref={partnerVideo} autoPlay controls={true}/>;
    }


    const renderUserList = (users)=>{
        return(
            <div>
                {Object.values(users).map(key => {
                    if (key.id === yourID) {
                        return null;
                    }
                    return <button style={{marginLeft: "10px"}} onClick={() => callPeer(key.id)}>Call {key.name}</button>;
                })}
            </div>
        )
    }

    const renderUserVideo = ()=>{
        if(callAccepted){
            console.log("current2233",userVideo)
                return(
                    <video style={{width: 150}} playsinline muted ref={userVideo} autoPlay/>
                    )

        }
    }

    return (
        <div>
            <div className="video-container">
                {/*{PartnerVideo}*/}
                {stream && <video style={{width: 150}} playsinline muted ref={userVideo} autoPlay/>}
            </div>
            {renderUserList(users)}


            <Modal
                title="Incoming Video Call"
                visible={receivingCall && callAccepted === false && callRejected === false}
                onOk={acceptCall}
                onCancel={rejectCall}
                okText="Accept"
                onCancelText="Reject"
            >
                <div>
                    <h5 style={{fontWeight: 'bolder'}}>{callerName} want to practice english with you...</h5>
                </div>
            </Modal>

            <Modal
                title="Video Communication"
                visible={startCalling && callRejected === false}
                footer={[]}
                width={720}
            >
                <div>
                    <div className="video-container">
                        {callAccepted===false && <p>Calling..</p>}
                        {PartnerVideo}

                        {/*<video style={{width: 150}} playsinline muted ref={userVideo} autoPlay/>*/}
                        {userVideo && renderUserVideo()}
                    </div>
                </div>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state)=> {
    console.log(state)
    return {
        firstName: state.AuthReducers.firstName
    };
}

export default connect(
    mapStateToProps,
)(LiveVideo);
