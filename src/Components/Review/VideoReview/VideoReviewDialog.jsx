import React, { useRef, useState } from "react";
import { GoDeviceCameraVideo } from "react-icons/go";
import Webcam from "react-webcam";
import Form from "../Form";
import axios from "axios";
import { toast } from "react-toastify";

const VideoReviewDialog = ({ space, setopen }) => {
  console.log("Video review");

  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [videourl, setvideourl] = useState(null);
  const [recording, setrecording] = useState(false);
  const [timer, settimer] = useState(120);

  const [review,setreview]=useState({
    name:"",
    email:"",
    rating:4,
    // videofile
    file:"",
    // user avatar
    photo:"",
    consent:false
  })

  const [loading,setloading]=useState(false)

  const recordedChunksRef = useRef([]);

  const handleRecord = (e) => {
    // set up a timer for 2 mins
    setrecording(true);
    recordedChunksRef.current = [];
    settimer(120);

    if (navigator.mediaDevices) {
      console.log("getUserMedia supported");
      try {
        const stream = webcamRef.current.stream;
        const mediaRecorder = new MediaRecorder(stream, {
          audioBitsPerSecond: 128000,
          videoBitsPerSecond: 2500000,
          mimeType: "video/mp4",
        });
        console.log("Stream:", stream);
        console.log("MediaRecorder:", mediaRecorder);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            recordedChunksRef.current.push(e.data);
          }
        };

        mediaRecorder.onstop = () => {
          if (recordedChunksRef.current.length > 0) {
            const blob = new Blob(recordedChunksRef.current, {
              type: "video/webm",
            });
            const url = URL.createObjectURL(blob);
            setvideourl(url);
            setreview({...review,file:url})
          } else {
            console.log("RecordedChunks not availaible");
          }
        };
        mediaRecorder.start();
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const handleStopRecord = () => {
    mediaRecorderRef.current.stop();
    setrecording(false);
  };

  const handleRerecord = () => {
    setvideourl(null);
    recordedChunksRef.current = [];
  };

  const handleSubmit=async (e)=>{
    e.preventDefault();
    console.log(review)
    const formData=new FormData()
    if(!consent){
      toast.info("Provide your consent in checkbox")
      return;
    }
    if(!review.name || !review.email || !review.rating || !review.file){
      toast.info("Provide all the fields")
      return;
    }
    try{
      setloading(true)
      const response = await fetch(videourl);
      const blob = await response.blob();
      console.log(blob)
      const file = new File([blob], "video_review.webm", { type: "video/webm" });      
      console.log(file)
      formData.append('name',review.name)
      formData.append('email',review.email)
      formData.append('rating',review.rating)
      formData.append('videoreview',file)
      formData.append('photo',review.photo)
      formData.append("reviewType","VIDEO")
      const result=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/review/${space.slug}/submit`,formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      toast.success(result.data.message)
    }catch(error){
      console.log(error.message)
    }
    setloading(false)
    setopen(false)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
    <div className="max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl space-y-4 text-gray-800">
      
      <div className="flex flex-col items-center space-y-2">
        <div className="text-purple-600 text-4xl">
          <GoDeviceCameraVideo />
        </div>
        <h2 className="text-xl font-semibold">Record Your Video Review</h2>
        <p className="text-center text-sm text-gray-500">
          You have up to <span className="font-medium text-purple-600">120 seconds</span> to record. 
          You can preview and re-record before submitting.
        </p>
      </div>
  
      <div className="rounded-lg overflow-hidden border">
        {videourl && !recording ? (
          <video src={videourl} controls className="w-full h-auto" />
        ) : (
          <Webcam
            audio={true}
            ref={webcamRef}
            muted={recording}
            screenshotFormat="image/jpeg"
            className="w-full h-64 object-cover"
            videoConstraints={{ facingMode: "user" }}
          />
        )}
      </div>
  
      {recording ? (
        <div className="flex justify-between items-center">
          <span className="text-sm text-red-600 font-medium animate-pulse">Recording...</span>
          <button
            onClick={handleStopRecord}
            className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-4 py-2 rounded-md"
          >
            Stop Recording
          </button>
        </div>
      ) : videourl ? (
        <>
          <div className="flex justify-between gap-2">
            <button
              onClick={handleRerecord}
              className="w-1/2 cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
            >
              Re-record
            </button>
            <button
              onClick={() => setopen(false)}
              className="w-1/2 bg-gray-100 cursor-pointer hover:bg-gray-200 text-gray-600 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
          </div>
  
          <Form review={review} setreview={setreview} />

          <button
            onClick={handleSubmit}
            className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-medium"
            disabled={loading}
          >
            {loading?"Submitting...":"Submit Review"}
          </button>
        </>
      ) : (
        <>
          <div>
            <h3 className="text-sm font-semibold mb-1">Suggested Questions</h3>
            <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
              <li>Who are you / what are you working on?</li>
              <li>How has our product/service helped you?</li>
              <li>What's the best thing about it?</li>
            </ul>
          </div>
  
          <button
            onClick={handleRecord}
            className="w-full cursor-pointer bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md font-medium"
          >
            Start Recording
          </button>
        </>
      )}
    </div>
  </div>
  );
};

export default VideoReviewDialog;
