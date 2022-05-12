/* eslint-disable react-hooks/exhaustive-deps */

import "./style.scss";
import React from "react";
import Webcam from "react-webcam";

const CameraPage = () => {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  // const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  const [videoUrl, setVideoUrl] = React.useState("");
  const [playState, setPlayState] = React.useState(true);

  const handleStartCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm",
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
    setPlayState(true);
  }, [webcamRef, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    mediaRecorderRef.current.stop();
  }, [mediaRecorderRef, webcamRef]);

  const handlePreview = React.useCallback(() => {
    setPlayState(false);
    const blob = new Blob(recordedChunks, {
      type: "video/webm",
    });
    const url = window.URL.createObjectURL(blob);
    setVideoUrl(url);
  }, [recordedChunks]);
  const urlToFile = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], "image.jpg", { type: blob.type });
    return file;
  };
  const handleDownload = async () => {
    // const blob = new Blob(recordedChunks, {
    //   type: "video/webm",
    // });
    // const url = window.URL.createObjectURL(blob);
    // const a = document.createElement("a");
    // document.body.appendChild(a);
    // a.style = "display: none";
    // a.href = url;
    // a.download = "react-webcam-stream-capture.webm";
    // a.click();
    // window.URL.revokeObjectURL(url);

    // if (navigator.share) {
    //   navigator
    //     .share({
    //       title: "web.dev",
    //       text: "Check out web.dev.",
    //       url: videoUrl,
    //     })
    //     .then(() => alert("Successful share"))
    //     .catch((error) => alert("Error sharing", error));
    // }
    // const filesArray = document.getElementsByClassName(".closeImage");
    // alert(filesArray);
    // alert("filesArray");
    const file = await urlToFile(
      "https://images.unsplash.com/photo-1575535468632-345892291673?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
    );
    const files = [file];
    navigator
      .share({
        files: files,
        title: "Vacation Pictures",
        text: "Photos from September 27 to October 14.",
      })
      .then(() => alert("Share was successful."))
      .catch((error) => alert("Sharing failed", error));

    // if (navigator.share) {
    //   navigator
    //     .share({
    //       files: filesArray,
    //       title: "Vacation Pictures",
    //       text: "Photos from September 27 to October 14.",
    //     })
    //     .then(() => alert("Share was successful."))
    //     .catch((error) => alert("Sharing failed", error));
    // } else {
    //   alert(`Your system doesn't support sharing files.`);
    // }
    // const blob = new Blob(recordedChunks, {
    //   type: "video/webm",
    // });
    // const url = window.URL.createObjectURL(blob);
  };
  const handlePreviewClose = () => {
    setRecordedChunks([]);
    setPlayState(true);
    setVideoUrl("");
  };
  return (
    <div className="cameraPage mainPage">
      <button className="cameraCloseBtn iconBtn">
        <img
          src="/images/other/close_btn.png"
          width="31.5px"
          height="31.5px"
          alt=""
        />
      </button>
      <div className="cameraBox">
        <Webcam audio={false} ref={webcamRef} />
      </div>

      <button
        className="captureBtn iconBtn"
        onTouchStart={() => handleStartCaptureClick()}
        onTouchEnd={() => handleStopCaptureClick()}
        style={{ backgroundImage: "url(/images/other/Camera_Button.png" }}
      >
        {/* <img src="/images/other/Camera_Button.png" alt="" /> */}
      </button>
      {recordedChunks.length > 0 && (
        <div className="videoContainer">
          <div className="videoBox">
            <video
              src={videoUrl}
              width="302px"
              height="390px"
              controls
              autoPlay="true"
              title="video"
              className="preVideo"
            />
            <button
              className={playState ? "btPlay active" : "btPlay"}
              onClick={handlePreview}
            ></button>
            <button className="iconBtn downloadBtn" onClick={handleDownload}>
              <img
                src="/images/other/download.png"
                width="50px"
                height="50px"
                alt=""
              />
            </button>
            <button
              className="previewCloseBtn iconBtn"
              onClick={handlePreviewClose}
            >
              <img
                src="/images/other/close_btn.png"
                alt=""
                width="31px"
                height="31px"
                className="closeImage"
              />
            </button>
          </div>
        </div>
      )}
      {/* <video
        src="blob:https://deluxe-flan-32b73a.netlify.app/fe27e1a6-8e0a-45b2-817d-97851e1bb142"
        width="202px"
        height="190px"
        controls
        autoPlay="true"
        title="video"
      /> */}
    </div>
  );
};
export default CameraPage;
