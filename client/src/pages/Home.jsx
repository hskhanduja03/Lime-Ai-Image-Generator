import React, { useState, useEffect } from "react";
import { Card, Loader, FormField } from "../components";
import ModernLoader from "../components/ModernLoader";

function Home() {
  const [loading, setLoading] = useState(false);
  const [allPosts, setAllPosts] = useState(null);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch("https://lime-ai-image-generator.onrender.com/api/v1/post", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if(response.ok){
            const result = await response.json()
            setAllPosts(result.data)
            setLoading(false)
        }
      } catch (error) {}
    };
    fetchPosts()
  }, []);

  const RenderCards = ({ data, title }) => {
    if (data?.length > 0) {
      return data.map((post) => <Card key={post._id} id={post._id} data={post} />);
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
          images generated from DALL-E AI
        </p>
      </div>
      <div className="mt-12">
        <FormField />
      </div>
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
