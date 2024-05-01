import { useState, useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import { Button, Label, TextInput } from "flowbite-react";
import cameraImage from "./cameraImage.jpg"; // Import your camera image

function FaceRecognition_04() {
  const [cameraOn, setCameraOn] = useState(false); // State variable to track camera status
  const [pictureTaken, setPictureTaken] = useState(false); // State variable to track picture taken status
  const videoRef = useRef();
  const canvasRef = useRef();
  const [formData, setFormData] = useState({
    staffName: "",
    email: "",
    phoneNo: "",
    nic: "",
    status: "pending review",
  });
  const { staffName, email, phoneNo, nic, status } = formData;

  useEffect(() => {
    if (cameraOn) {
      startVideo();
      loadModels();
    } else {
      stopVideo();
    }
  }, [cameraOn]);

  const toggleCamera = () => {
    setCameraOn(!cameraOn);
    setPictureTaken(false); // Reset picture taken status when toggling camera
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      const tracks = stream.getTracks();

      tracks.forEach((track) => {
        track.stop();
      });

      videoRef.current.srcObject = null;
    }
  };

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      faceMyDetect();
    });
  };

  const faceMyDetect = () => {
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();

      canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
        videoRef.current
      );
      faceapi.matchDimensions(canvasRef.current, {
        width: 150,
        height: 100,
      });

      const resized = faceapi.resizeResults(detections, {
        width: 150,
        height: 100,
      });

      faceapi.draw.drawDetections(canvasRef.current, resized);
      faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
      faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
    }, 1000);
  };

  const takePicture = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    setPictureTaken(true); // Set picture taken status to true after capturing the picture
  };

  const retryPicture = () => {
    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setPictureTaken(false); // Reset picture taken status when retrying
  };

  return (
    <div className="max-w-5xl mx-auto p-3">
      <h1 className="text-3xl text-center my-7 font-extrabold underline text-blue-950 dark:text-slate-300">
        Staff Registration
      </h1>
      <div className="flex flex-row gap-4">
        <div>
          <div className="flex flex-row items-center mb-6">
            <div className="flex flex-col">
              <Label value="Take picture" />
              {/* Conditional rendering based on cameraOn and pictureTaken state */}
              {cameraOn ? (
                <div className="relative">
                  <video
                    className="h-96 ml-3"
                    crossOrigin="anonymous"
                    ref={videoRef}
                    autoPlay
                  >
                    {pictureTaken && (
                      <img
                        className="absolute bottom-0 left-0 ml-3 mb-3"
                        src={canvasRef.current.toDataURL()}
                        alt={"Taken Picture"}
                      />
                    )}
                  </video>
                </div>
              ) : (
                <img className="h-96 ml-3" src={cameraImage} alt={"Camera"} />
              )}
            </div>
            <canvas className="w-64 h-48" ref={canvasRef}></canvas>
          </div>

          <div className="flex flex-row gap-4">
            <Button onClick={toggleCamera} gradientDuoTone="purpleToBlue">
              {cameraOn ? "Turn Camera Off" : "Turn Camera On"}
            </Button>
            <Button
              onClick={takePicture}
              gradientDuoTone="purpleToBlue"
              disabled={!cameraOn}
            >
              Take Picture
            </Button>
            <Button
              onClick={retryPicture}
              gradientDuoTone="purpleToBlue"
              disabled={!cameraOn || !pictureTaken}
            >
              Retry
            </Button>
          </div>
        </div>
        <form className="flex flex-col gap-4">
          <div>
            <div>
              <Label value="Staff Name" />
              <TextInput
                type="text"
                id="staffName"
                placeholder="Staff Name"
                value={staffName}
                required
              />
            </div>
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                id="email"
                placeholder="example@gmail.com"
                required
                value={email}
              />
            </div>
            <div>
              <Label value="Phone No" />
              <TextInput
                type="text"
                id="phoneNo"
                placeholder="Phone No"
                required
                value={phoneNo}
              />
            </div>

            <div>
              <Label value="NIC" />
              <TextInput id="NIC" placeholder="NIC" required value={nic} />
            </div>
          </div>
          <Button type="submit" gradientDuoTone="pinkToOrange">
            Register
          </Button>
        </form>
      </div>
    </div>
  );
}

export default FaceRecognition_04;
