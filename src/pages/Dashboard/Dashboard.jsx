import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";

import axios from "axios";
import CreateSpaceDialog from "../../Components/Space/CreateSpaceDialog";

const Dashboard = () => {
  const [spaces, setspaces] = useState([
    {
      id: "1223",
      title: "fsdf",
      videos: "",
      spaces: "",
    },
  ]);
  const [openDialog, setopenDialog] = useState(false);

  useEffect(() => {
    async function fetchspaces() {
      try {
        const result = await axios.get("http://localhost:3000/api/v1/space", {
          withCredentials: true,
        });
        setspaces(result.data.spaces);
        console.log(result);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchspaces();
  }, []);

  // On clicking on create space open dialog for space creation
  //  Implement search filters
  return (
    <>
      <div className="text-white min-h-screen p-6">
        <p className="text-2xl font-bold mb-10">Dashboard Overview</p>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <p className="text-lg font-semibold">Total Videos</p>
            <p className="text-2xl font-bold">2</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-xl shadow-lg">
            <p className="text-lg font-semibold">Total spaces</p>
            <p className="text-2xl font-bold">{spaces.length}</p>
          </div>
        </div>

        <div className="mb-6 flex justify-between">
          <h2 className="text-2xl font-semibold mb-4">Spaces</h2>
          {spaces.length > 0 && (
            <button
              className="m-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
              onClick={() =>{ setopenDialog(true)}}
            >
              Create New Space
            </button>
          )}
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search spaces by title"
            className="w-full bg-gray-900 text-white p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {spaces.length === 0 ? (
          <div className="text-center mt-10">
            <h2 className="text-xl font-semibold">No spaces yet</h2>
            <p className="text-gray-400 mb-4">
              Create your first space to start collecting testimonials.
            </p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            onClick={() =>{ setopenDialog(true)}}
            >
              Create a New Space
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((space) => (
              <div
                key={space.id}
                className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={space.logo}
                      alt="spacelogo"
                      className="w-12 h-12 rounded-full"
                    />
                    <p className="text-lg font-semibold">{space.title}</p>
                  </div>
                  <BsThreeDots className="text-xl cursor-pointer" />
                </div>
                <div className="text-gray-300">
                  <p>
                    📹 Videos: <span className="font-bold">{space.videos}</span>
                  </p>
                  <p>
                    📝 Text: <span className="font-bold">{space.text}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {openDialog && <CreateSpaceDialog setopenDialog={setopenDialog}/>}
    </>
  );
};

export default Dashboard;
