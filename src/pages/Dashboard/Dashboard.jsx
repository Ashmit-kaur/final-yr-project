import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";

import axios from "axios";
import CreateSpaceDialog from "../../Components/Space/CreateSpaceDialog";
import Loader from "../../Components/Loader";
import ShareSpaceLinkDialog from "../../Components/Space/ShareSpaceLinkDialog";
import Pagination from "../../utils/Pagination";
import DropdownMenu from "../../Components/Space/DropdownMenu";
import useDebounce from "../../utils/useDebounce";
import PieChart from "../../utils/Graph";
import BarGraph from "../../utils/BarGraph";

const Dashboard = () => {
  const [spaces, setspaces] = useState([]);
  const [slug, setslug] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const [openDialog, setopenDialog] = useState(false);
  const [openshareDialog, setopenshareDialog] = useState(false);

  const [loading, setloading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const filteredSpaces = spaces.filter((space) =>
    space.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const totalPages = Math.ceil(spaces.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSpaces = filteredSpaces.slice(indexOfFirstItem, indexOfLastItem);

  const [spaceCreationData, setCreationData] = useState([]);
  const [reviewtypedata, setreviewtypedata] = useState([]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    async function fetchspaces() {
      try {
        setloading(true);
        const result = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/space`,
          {
            withCredentials: true,
          }
        );
        setspaces(result.data.spaces);
        console.log(result);
      } catch (error) {
        console.log(error.message);
      }
      setloading(false);
    }
    fetchspaces();
  }, []);

  useEffect(() => {
    const getgraphdata = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/review/graph/data`,
          {
            withCredentials: true,
          }
        );
        console.log(result.data);
        const typeMap = result.data.typeCount.reduce(
          (acc, curr) => {
            acc[curr.type.toLowerCase()] = curr.count;
            return acc;
          },
          { text: 0, video: 0 }
        );

        setreviewtypedata(typeMap);
        setCreationData(result.data.spaceData);
      } catch (error) {
        console.log(error.message);
      }
    };
    getgraphdata();
  }, [spaces]);

  const toggleDropdown = (id) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="min-h-screen px-6 py-8 bg-[#f9f9f9] transition-colors duration-300">
            <p className="text-4xl font-extrabold mb-10 text-gray-900">
              📊 Dashboard Overview
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
                <p className="text-2xl text-center font-semibold text-gray-700 mb-2">
                  Testimonials
                </p>

                <div className="mt-10 h-96 w-96 mx-auto text-center">
                  <PieChart data={reviewtypedata} />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all">
                <p className="text-2xl text-center font-semibold text-gray-700 mb-2">
                  Spaces
                </p>
                <p className="text-3xl text-center font-extrabold text-blue-600">
                  {spaces.length}
                </p>

                <div className="mt-4 h-auto w-auto">
                  <BarGraph data={spaceCreationData} />
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
              <h2 className="text-2xl font-semibold text-gray-900">
                🗂️ Spaces
              </h2>
              {spaces.length > 0 && (
                <button
                  className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold shadow-sm transition"
                  onClick={() => setopenDialog(true)}
                >
                  ➕ Create New Space
                </button>
              )}
            </div>

            <div className="mb-8">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="🔍 Search spaces by title"
                className="w-full p-3 bg-white text-gray-900 placeholder-gray-500 rounded-xl shadow-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {spaces.length === 0 ? (
              <div className="text-center mt-20">
                <h2 className="text-2xl font-bold text-gray-800">
                  No spaces yet 😔
                </h2>
                <p className="text-gray-500 mt-2 mb-6">
                  Start by creating your first space to collect testimonials.
                </p>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold transition"
                  onClick={() => setopenDialog(true)}
                >
                  🚀 Create a New Space
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentSpaces.map((space) => (
                  <div
                    key={space.id}
                    className="relative shadow-slate-800 shadow-2xl rounded-lg p-6 bg-white transition hover:shadow-xl"
                  >
                    <img
                      src={space.logourl}
                      alt="Exam"
                      className="w-full h-32 object-cover rounded-md mb-4"
                    />
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-semibold">{space.title}</h2>
                      <div className="relative">
                        <BsThreeDots
                          className="text-xl cursor-pointer"
                          onClick={() => toggleDropdown(space.id)}
                        />
                        {openDropdownId === space.id && (
                          <div className="absolute right-0 top-6 z-10">
                            <DropdownMenu
                              id={openDropdownId}
                              space={space}
                              setspaces={setspaces}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      <strong>Created At:</strong>{" "}
                      {space.createdAt.split("T")[0]}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {spaces.length > 9 && (
              <div className="flex justify-center mt-10">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}

            {openDialog && (
              <CreateSpaceDialog
                mode="create"
                setopenDialog={setopenDialog}
                setopenshareDialog={setopenshareDialog}
                setslug={setslug}
              />
            )}
            {openshareDialog && (
              <ShareSpaceLinkDialog
                setopen={setopenshareDialog}
                spacename={"space"}
                slug={slug}
              />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;
