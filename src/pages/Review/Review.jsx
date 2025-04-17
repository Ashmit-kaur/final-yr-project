import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../Components/Loader";
import TextReviewDialog from "../../Components/Review/TextReviewDialog";
import VideoReviewDialog from "../../Components/Review/VideoReviewDialog";

const Review = () => {
  const { slug } = useParams();
  const [space, setspace] = useState({
    logourl: "",
    title: "",
    message: "",
  });
  const [loading, setloading] = useState(false);
  const [opentextdialog,setopentextdialog]=useState(false)
  const [openvideodialog,setopenvideodialog]=useState(false)

  useEffect(() => {
    const fetchspace = async () => {
      try {
        setloading(true);
        const result = await axios.get(
          `http://localhost:3000/api/v1/space/${slug}`
        );
        setspace(result.data.space);
        console.log(result.data.space);
      } catch (error) {
        alert(error.message);
      }
      setloading(false);
    };
    fetchspace();
  }, [slug]);

  return loading ? (
    <Loader />
  ) : (
    <div>
      <nav className="w-full bg-blue-600 py-4">
        <p className="text-white ml-3 text-2xl font-semibold">Testimonials</p>
      </nav>

      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-4">
        <img
          src={space.logourl}
          alt="space-logo"
          className="w-80 h-56 mb-6 rounded"
        />
        <h1 className="text-4xl font-bold mb-2">{space.title}</h1>
        <p className="text-gray-600 text-xl mb-6">{space.message}</p>

        <div className="text-left max-w-lg w-full">
          <h2 className="text-xl font-semibold border-b-2 border-indigo-500 inline-block mb-3">
            QUESTIONS
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Who are you / what are you working on?</li>
            <li>How has [our product / service] helped you?</li>
            <li>What is the best thing about [our product / service]</li>
          </ul>
        </div>

        <div className="mt-8 flex gap-4">
          <button className="bg-indigo-600 cursor-pointer text-white px-5 py-2 rounded shadow hover:bg-indigo-700 transition" onClick={()=>setopenvideodialog(true)}>
            🎥 Record a video
          </button>
          <button className="bg-gray-900 cursor-pointer text-white px-5 py-2 rounded shadow hover:bg-gray-800 transition" onClick={()=>setopentextdialog(true)}>
            ✍️ Send in text
          </button>
        </div>
      </div>
      {opentextdialog && <TextReviewDialog space={space} setopen={setopentextdialog}/>}
      {openvideodialog && <VideoReviewDialog space={space} setopen={setopenvideodialog}/>}
    </div>
  );
};

export default Review;
