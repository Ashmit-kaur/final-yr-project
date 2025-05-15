import React, { useEffect, useState } from "react";
import Widget1 from "./Widget1";
import Widget2 from "./Widget2";
import Widget3 from "./Widget3";
import { toast } from "react-toastify";
import axios from "axios";

const WidgetDialog = ({slug}) => {
  const [selected, setSelected] = useState("widget1");
  const [favourites,setfavourites]=useState([]);

  useEffect(()=>{
    // get all favourite testimonials
    const fetchfavourites=async ()=>{
      try{
        const result=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/review/embed/${slug}`,{
          withCredentials:true
        })
        setfavourites(result.data.favourites)
        toast.success(result.data.message)
      }catch(error){
        console.log(error.message);
      }
    }
    fetchfavourites();
  },[])

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-2xl text-center font-semibold mb-2">Embed a Wall of Love</h2>
        <p className="mb-6 text-gray-700">
          <span className="text-indigo-600 font-medium mr-2">Step 1</span>
          Choose a layout
        </p>

        <div className="flex gap-4 mb-4">
          <button
            className={`px-4 cursor-pointer py-2 rounded ${
              selected === "widget1"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setSelected("widget1")}
          >
            Layout 1
          </button>
          <button
            className={`px-4 py-2 cursor-pointer rounded ${
              selected === "widget2"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setSelected("widget2")}
          >
            Layout 2
          </button>
          <button
            className={`px-4 py-2 cursor-pointer rounded ${
              selected === "widget3"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setSelected("widget3")}
          >
            Layout 3
          </button>
        </div>

        {selected === "widget1" && <Widget1 favourites={favourites}/>}
        {selected === "widget2" && <Widget2 favourites={favourites}/>}
        {selected === "widget3" && <Widget3 favourites={favourites}/>}

      </div>
    </div>
  );
};

export default WidgetDialog;
