import React, { useState, useEffect } from "react";
import { Card, Loader, FormField } from "../components";
import ModernLoader from "../components/ModernLoader";

function Home() {
  const [loading, setLoading] = useState(false);
  const [showPhoto, setshowPhoto] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [photoUrl, setphotoUrl] = useState("");
  const handleClick = (url) => {
    setshowPhoto(url);
    setphotoUrl(showPhoto);
  };

  useEffect(()=>{
    setphotoUrl(showPhoto)
  }, [showPhoto, setshowPhoto])

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          "https://lime-ai-image-generator.onrender.com/api/v1/post",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const result = await response.json();
          setAllPosts(result.data);
          setLoading(false);
        }
      } catch (error) {}
    };
    fetchPosts();
  }, []);

  const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return data.map((post) => (
        <Card
          handleClick={handleClick}
          key={post._id}
          id={post._id}
          data={post}
        />
      ));
    }
    return (
      <h2 className="text-lg text-[#6469FF] uppercase font-semibold">
        {title}
      </h2>
    );
  };
  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-2xl">The Community Showcase</h1>
        <p className="text-sm text-gray-400 font-light mt-2">
          Browse through a collection of imaginative and visually stunning
          images generated from LIME AI
        </p>
      </div>

      {showPhoto && (
        <div
          className="absolute inset-0  flex justify-center z-50  items-center bg-gray-500 bg-opacity-60"
          onClick={() => setshowPhoto(null)}
        >
          <div className="bg-white w-1/2 h-3/4 mt-14 rounded-lg overflow-hidden relative">
            <img
              src={photoUrl}
              className="w-full h-full object-cover"
              alt=""
              srcset=""
            />
            <span
              className="absolute right-3 top-2 text-xl font-bold cursor-pointer"
              onClick={() => setshowPhoto(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                class="size-8"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </div>
        </div>
      )}

      <div className="mt-10">
        {loading ? (
          <div className="flex w-full items-center justify-center">
            {/* <Loader/> */}
            <ModernLoader />
          </div>
        ) : (
          <>
            {searchText && (
              <div>
                <h2 className="text-md font-md text-gray-400">
                  Showing results for{" "}
                  <span className="text-gray-600 text-md font-semibold">
                    {searchText}
                  </span>
                </h2>
              </div>
            )}
            <div className="grid sm:grid-cols-3 xs:grid-cols-2 lg:grid-cols-4 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards data={[]} title="No Search Results" />
              ) : (
                <>
                  <RenderCards data={allPosts} title="No posts found" />
                </>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Home;
