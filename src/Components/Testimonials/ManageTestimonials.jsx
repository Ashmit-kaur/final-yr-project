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

  // fetch space details
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

  // fetch all testimonials
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
      <div className="min-h-screen bg-black text-white flex flex-col">
        <nav className="bg-gray-800 flex items-center w-full p-4 h-[100px] justify-between">
          <div className="flex items-center">
            <img
              src={space?.logourl}
              alt="Space"
              className="w-16 h-16 rounded-full mr-4"
            />
            <h1 className="text-2xl font-bold">{space?.title}</h1>
          </div>
          <button
            className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => setisedit(true)}
          >
            Edit Space
          </button>
        </nav>
        <div className="flex flex-1">
          <div className="w-[250px] bg-gray-900 min-h-screen">
            <Sidebar tab={tab} settab={settab} />
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {loading ? (
              <p className="text-white">Loading...</p>
            ) : tab==="5"?(<Tabfive slug={space.slug}/>): (
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
      {tab=="6" && <WidgetDialog slug={slug}/>}
    </>
  );
};

export default ManageTestimonials;
