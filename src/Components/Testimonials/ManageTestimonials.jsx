import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import TestimonialCard from "./TestimonialCard";
import CreateSpaceDialog from "../Space/CreateSpaceDialog";
import Tabfive from "./Tabfive";
import WidgetDialog from "../Widgets/WidgetDialog";

const ManageTestimonials = () => {
  const [testimonials, settestimonials] = useState([]);
  const { slug } = useParams();
  const [space, setspace] = useState({});

  const [tab, settab] = useState("1");
  const [filteredtestimonials, setfilteredtestimonials] = useState([]);

  const [isedit, setisedit] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (tab === "1") {
      setfilteredtestimonials(testimonials);
    } else if (tab === "2") {
      const filtered = testimonials.filter(
        (testimonial) => testimonial.reviewType === "VIDEO"
      );
      setfilteredtestimonials(filtered);
    } else if (tab === "3") {
      const filtered = testimonials.filter(
        (testimonial) => testimonial.reviewType === "TEXT"
      );
      setfilteredtestimonials(filtered);
    } else if (tab === "4") {
      const filtered = testimonials.filter(
        (testimonial) => testimonial.isfavourite
      );
      setfilteredtestimonials(filtered);
    }
  }, [tab, testimonials]);

  useEffect(() => {
    const fetchSpaceDetails = async () => {
      setloading(true);
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/space/${slug}`,
          {
            withCredentials: true,
          }
        );
        setspace(result.data.space);
        console.log(result.data.message);
      } catch (error) {
        console.log(error.message);
      }
      setloading(false);
    };
    fetchSpaceDetails();
  }, [slug]);

  useEffect(() => {
    const fetchtestimonials = async () => {
      try {
        setloading(true);
        const result = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/review/${slug}`,
          {
            withCredentials: true,
          }
        );
        console.log(result.data);
        settestimonials(result.data.reviews);
      } catch (error) {
        console.log(error.message);
      }
      setloading(false);
    };
    fetchtestimonials();
  }, [slug]);

  return (
    <>
      <div className="min-h-screen bg-black text-white flex flex-col font-sans">
        <nav className="bg-gray-800 flex items-center w-full px-6 h-[100px] justify-between shadow-md">
          <div className="flex items-center gap-4">
            <img
              src={space?.logourl}
              alt="Space"
              className="w-16 h-16 rounded-full border-2 border-blue-400 shadow-lg"
            />
            <h1 className="text-2xl font-bold tracking-wide">{space?.title}</h1>
          </div>
          <button
            className="bg-blue-600 cursor-pointer hover:bg-blue-700 transition-colors px-5 py-2 rounded-lg font-medium shadow-lg"
            onClick={() => setisedit(true)}
          >
            ✏️ Edit Space
          </button>
        </nav>
        <div className="flex flex-1">
          <div className="w-[250px] bg-gray-900 min-h-screen border-r border-gray-700">
            <Sidebar tab={tab} settab={settab} space={space}/>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-black via-gray-900 to-black">
            {loading ? (
              <p className="text-white text-lg animate-pulse">Loading...</p>
            ) : tab === "5" ? (
              <Tabfive slug={space.slug} />
            ) : (
              filteredtestimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))
            )}
          </div>
        </div>
      </div>
      {isedit && (
        <CreateSpaceDialog
          mode="edit"
          spaceData={space}
          setopenDialog={setisedit}
        />
      )}
      {tab === "6" && <WidgetDialog slug={slug} />}
    </>
  );
};

export default ManageTestimonials;
