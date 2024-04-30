import { useState, useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import { Button, Label, TextInput } from "flowbite-react";

function FaceRecognition_04() {
  const [cameraOn, setCameraOn] = useState(false); // State variable to track camera status
  const videoRef = useRef();
  const canvasRef = useRef();
  //const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    staffName: "",
    email: "",
    phoneNo: "",
    leaveType: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    nic: "",
    status: "pending review",
  });
  const {
    staffName,
    email,
    phoneNo,
    leaveType,
    startDate,
    endDate,
    startTime,
    endTime,
    nic,
    status,
  } = formData;

  // LOAD FROM USEEFFECT
  useEffect(() => {
    if (cameraOn) {
      startVideo();
      loadModels();
    } else {
      stopVideo();
    }
  }, [cameraOn]); // Reload when camera status changes

  // Function to toggle camera status
  const toggleCamera = () => {
    setCameraOn(!cameraOn);
  };

  // OPEN YOU FACE WEBCAM
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

  // Function to stop the video stream
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

  // LOAD MODELS FROM FACE API
  const loadModels = () => {
    Promise.all([
      // THIS FOR FACE DETECT AND LOAD FROM YOU PUBLIC/MODELS DIRECTORY
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

      // DRAW YOU FACE IN WEBCAM
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

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-3xl text-center my-7 font-extrabold underline text-blue-950 dark:text-slate-300">
        Staff Registration
      </h1>
      <form className="flex flex-col gap-4">
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

        <div className="flex flex-row gap-4 items-center">
          <div className="flex flex-col">
            <Label value="Take picture" />
            <video
              className="w-64 h-48"
              crossOrigin="anonymous"
              ref={videoRef}
              autoPlay
            ></video>
          </div>
          <canvas className="w-64 h-48" ref={canvasRef} />
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex-grow flex flex-col">
            <Button onClick={toggleCamera} gradientDuoTone="purpleToBlue">
              {cameraOn ? "Turn Camera Off" : "Turn Camera On"}
            </Button>
          </div>
          <Button gradientDuoTone="purpleToBlue">Take Picture</Button>
        </div>

        <Button type="submit" gradientDuoTone="pinkToOrange">
          Register
        </Button>
      </form>
    </div>
  );
}

export default FaceRecognition_04;
