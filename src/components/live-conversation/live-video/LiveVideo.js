import React, { useEffect, useState, useRef } from "react";
import "./LiveVideo.style.css";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  width: 100%;
`;

// const Video = styled.video`
//   border: 1px solid blue;
//   // width: 50%;
//   // height: 50%;
// `;

function LiveVideo(props) {
    const [yourID, setYourID] = useState("");
    const [users, setUsers] = useState({});
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);

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
            setReceivingCall(true);
            setCaller(data.from);
            setCallerSignal(data.signal);
        });
    }, []);

    function callPeer(id) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        });

        peer.on("signal", data => {
            socket.current.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: yourID
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

    let UserVideo;
    if (stream) {
        UserVideo = <video style={{width:150}} playsInline muted ref={userVideo} autoPlay />;
    }

    let PartnerVideo;
    if (callAccepted) {
        PartnerVideo = <video style={{width: 220}} playsInline ref={partnerVideo} autoPlay />;
    }

    let incomingCall;
    if (receivingCall && callAccepted === false) {
        incomingCall = (
            <div>
                <h1>{caller} is calling you</h1>
                <button onClick={acceptCall}>Accept</button>
            </div>
        );
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
    return (
        <Container>
            <div className="video-container">
                {PartnerVideo}
                {UserVideo}
            </div>


            {/*<p>{`${props.name} = ${yourID}`}</p>*/}

            {renderUserList(users)}

            <Row>{incomingCall}</Row>
        </Container>
    );
}

export default LiveVideo;
