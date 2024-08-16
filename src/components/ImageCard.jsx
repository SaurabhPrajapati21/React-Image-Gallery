import React from "react";

const ImageCard = ({ image }) => {
  const tags = image.tags.split(",");

  return (
    <div className="max-w-full sm:max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img
        src={image.webformatURL}
        alt=""
        className="w-full h-48 object-cover"
      />
      <div className="px-4 py-3">
        <div className="font-bold text-purple-500 text-lg mb-2">
          Photo by {image.user}
        </div>
        <ul className="text-sm text-gray-700">
          <li>
            <strong>Views: </strong>
            {image.views}
          </li>
          <li>
            <strong>Downloads: </strong>
            {image.downloads}
          </li>
          <li>
            <strong>Likes: </strong>
            {image.likes}
          </li>
        </ul>
      </div>
      <div className="px-4 py-3 flex flex-wrap">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ImageCard;
