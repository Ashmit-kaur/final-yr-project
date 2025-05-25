import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
import TestimonialCard from "./TestimonialCard";
import CreateSpaceDialog from "../Space/CreateSpaceDialog";
import Tabfive from "./Tabfive";
import WidgetDialog from "../Widgets/WidgetDialog";
import { CiEdit } from "react-icons/ci";

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
      <div className="min-h-screen bg-gray-100 text-gray-900 font-sans flex flex-col">
        <nav className="bg-white px-6 h-[100px] flex items-center justify-between shadow-md border-b border-gray-200">
          <div className="flex items-center gap-4">
            <img
              src={space?.logourl}
              alt="Space"
              className="w-16 h-16 rounded-full border-2 border-blue-500 shadow-md object-cover"
            />
            <h1 className="text-3xl font-bold tracking-wide text-gray-800">
              {space?.title}
            </h1>
          </div>
          <button
            onClick={() => setisedit(true)}
            className=" py-2 cursor-pointer  text-2xl "
          >
            <CiEdit />
          </button>
        </nav>

        <div className="flex flex-1 overflow-hidden">
          <aside className="w-[250px] bg-white border-r border-gray-200 hidden md:block shadow-sm">
            <Sidebar tab={tab} settab={settab} space={space} />
          </aside>

          <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-100 via-white to-gray-100">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-600 text-lg animate-pulse">
                  Loading...
                </p>
              </div>
            ) : tab === "5" ? (
              <Tabfive slug={space.slug} />
            ) : filteredtestimonials.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-600 text-lg">No testimonials found.</p>
              </div>
            ) : (
              <div className="grid gap-6">
                {filteredtestimonials.map((testimonial) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {isedit && (
        <CreateSpaceDialog
          mode="edit"
          spaceData={space}
          setopenDialog={setisedit}
        />
      )}

      {tab === "6" && <WidgetDialog slug={slug} settab={settab} />}
    </>
  );
};

export default ManageTestimonials;
