import React, {useEffect, useState, useRef} from "react";
import {connect} from 'react-redux';
import "./LiveVideo.style.css";
import io from "socket.io-client";
import Peer from "simple-peer";
import {Modal, Button} from 'antd';
import adapter from 'webrtc-adapter';
import {Card} from 'antd';
import {VideoCameraOutlined} from '@ant-design/icons';
import {Popconfirm, message} from 'antd';
import ringtone from '../../../assets/ringtone.mp3'

let audio;

let peer;

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
        let streamRef;
        audio = new Audio(ringtone)

        socket.current = io.connect(process.env.REACT_APP_SOCKET_URL);

        navigator.mediaDevices
            .getUserMedia({video: true, audio: true})
            .then(stream => {
                setStream(stream);
                streamRef = stream
                if (userVideo.current) {
                    userVideo.current.srcObject = stream;
                }
            });

        socket.current.on("yourID", id => {
            setYourID(id);
            socket.current.emit("setName", {id: id, name: props.name})
        });
        socket.current.on("allUsers", users => {
            console.log(users);
            setUsers(users);
        });

        //I Don't know why hey called twice. thats why I put a breaker here for stop ring tone.
        let heyValue = 0;
        socket.current.on("hey", data => {

            if(heyValue === 0){
                audio.play()
                audio.loop = true
            }
            heyValue =  heyValue + 1;

            setReceivingCall(true);
            setCaller(data.from);
            setCallerName(data.name)
            setCallerSignal(data.signal);
        });

        return () => {
            //This code will turn off the camera and microphone if user leave this page.
            streamRef.getTracks().forEach(function (track) {
                track.stop();
            });

        }
    }, []);

    function callPeer(id) {
        setStartCalling(true)
        peer = new Peer({
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

        audio.pause();
        audio.currentTime = 0;

        setCallAccepted(true);
        setStartCalling(true)
        peer = new Peer({
            initiator: false,
            trickle: false,
            config: {
                iceServers: [
                    {
                        urls: "stun:coturn.en-bn.com:3478",
                        username: "sultan",
                        credential: "123456"
                    },
                    {
                        urls: "turn:coturn.en-bn.com:3478",
                        username: "sultan",
                        credential: "123456"
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

    function rejectCall() {
        audio.pause();
        audio.currentTime = 0;
        setCallRejected(true)
        window.location.reload()
    }

    function endCall() {
        peer.destroy()
        setStartCalling(false)
        // stream.getTracks().forEach(function(track) {
        //     track.stop();
        // });
        window.location.reload()
    }

    let UserVideo;
    if (stream) {
        UserVideo = <video style={{width: 150}} playsInline muted ref={userVideo} autoPlay/>;
    }

    let PartnerVideo;
    if (callAccepted) {
        PartnerVideo = <video style={{width: '100%'}} playsInline ref={partnerVideo} autoPlay controls={true}/>;
    }


    const confirmCall = (id) => {
        callPeer(id)
    }

    const renderUserList = (users) => {
        return (
            <div>
                {Object.values(users).map(key => {
                    if (key.id === yourID) {
                        return null;
                    }
                    return (
                        <Popconfirm placement="topLeft"
                                    title={`Are you sure want to make a video call with ${key.name}?`}
                                    onConfirm={() => confirmCall(key.id)} okText="Yes" cancelText="No">
                            <Button
                                key={key.id}
                                style={{marginRight: 5}}
                                type="primary"
                                shape="round"
                                icon={<VideoCameraOutlined/>}>
                                {key.name}
                            </Button>
                        </Popconfirm>

                    )
                })}
            </div>
        )
    }

    const renderUserVideo = () => {
        if (callAccepted) {
            console.log("current2233", userVideo)
            return (
                <video style={{width: 150}} playsinline muted ref={userVideo} autoPlay/>
            )

        }
    }


    return (
        <div>
            <Card className='fixed-user-video' style={{width: 180}}>
                {stream && <video style={{width: 150}} playsinline muted ref={userVideo} autoPlay/>}
            </Card>

            <Card title="List of users who want to practise english." style={{width: '100%'}}>
                {renderUserList(users)}
            </Card>


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
                onCancel={endCall}
                footer={[
                    <Button key="back" type="primary" danger onClick={endCall}>
                        End Call
                    </Button>,
                ]}
                width={720}
            >
                <div>
                    <div className="video-container">
                        {callAccepted === false && <p>Calling..</p>}
                        {PartnerVideo}

                        {/*<video style={{width: 150}} playsinline muted ref={userVideo} autoPlay/>*/}
                        {/*{userVideo && renderUserVideo()}*/}
                    </div>
                </div>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        firstName: state.AuthReducers.firstName
    };
}

export default connect(
    mapStateToProps,
)(LiveVideo);
