import React, { useState, useEffect, useCallback } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(
          `https://pixabay.com/api/?key=${
            import.meta.env.VITE_PIXABAY_API_KEY
          }&q=${term}&image_type=photo&pretty=true&page=${page}&per_page=20&random=${Math.random()}`
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        if (data.hits.length === 0 && page === 1) {
          setError("No images found");
        }
        setImages((prevImages) => [...prevImages, ...data.hits]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [term, page]);

  const handleScroll = useCallback(() => {
    if (
      !isLoading &&
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const uniqueImages = Array.from(
    new Map(images.map((image) => [image.id, image])).values()
  );

  return (
    <div className="container mx-auto px-4">
      <ImageSearch
        searchText={(text) => {
          setTerm(text);
          setImages([]);
          setPage(1);
        }}
      />

      {error && <h1 className="text-5xl text-center mt-32">Error: {error}</h1>}

      {!isLoading && uniqueImages.length === 0 && !error && (
        <h1 className="text-5xl text-center mt-32">No Images Found</h1>
      )}

      {isLoading && page === 1 ? (
        <h1 className="text-6xl text-center mt-32">Loading...</h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {uniqueImages.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}

      {isLoading && page > 1 && (
        <h1 className="text-3xl text-center mt-32">Loading more images...</h1>
      )}
    </div>
  );
}

export default App;
