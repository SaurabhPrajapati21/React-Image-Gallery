import React, { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";
import ImageSearch from "./components/ImageSearch";

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchImages = () => {
      setIsLoading(true);
      fetch(
        `https://pixabay.com/api/?key=${
          import.meta.env.VITE_PIXABAY_API_KEY
        }&q=${term}&image_type=photo&pretty=true&page=${page}&per_page=20&random=${Math.random()}`
      )
        .then((res) => res.json())
        .then((data) => {
          setImages((prevImages) => [...prevImages, ...data.hits]);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    };

    fetchImages();
  }, [term, page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 500
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="container mx-auto px-4">
      <ImageSearch
        searchText={(text) => {
          setTerm(text);
          setImages([]);
          setPage(1);
        }}
      />

      {!isLoading && images.length === 0 && (
        <h1 className="text-5xl text-center mt-32">No Images Found</h1>
      )}

      {isLoading && page === 1 ? (
        <h1 className="text-6xl text-center mt-32">Loading...</h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}

      {isLoading && page > 1 && (
        <h1 className="text-3xl text-center mt-32">
          Loading more images...
        </h1>
      )}
    </div>
  );
}

export default App;
