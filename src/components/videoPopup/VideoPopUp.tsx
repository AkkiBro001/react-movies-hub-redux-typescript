import {Dispatch, SetStateAction} from "react";
import ReactPlayer from "react-player/youtube";
import "./VideoPopUp.scss";

interface Props {
    show: boolean,
    setShow: Dispatch<SetStateAction<boolean>>,
    videoId: string
}

const VideoPopUp = ({ show, setShow, videoId }: Props) => {
    const hidePopup = () => {
        setShow(false);
        
    };
  return (
    <div className={`videoPopup ${show ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                <span className="closeBtn" onClick={hidePopup}>
                    Close
                </span>
                <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${videoId}`}
                    controls
                    width="100%"
                    height="100%"
                    // playing={true}
                />
            </div>
    </div>
  )
}

export default VideoPopUp