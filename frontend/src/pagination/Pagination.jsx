import React from "react";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

const Pagination = (props) => {
  const {
    prevPageHandler,
    nextPageHandler,
    pages,
    currentPage,
    setCurrentPage,
  } = props;

  return (
    <div className="flex mt-2 items-center ml-4">
      <span
        className="mr-1 cursor-pointer text-gray-700 bg-transparent p-2 hover:bg-[#ddd]"
        onClick={prevPageHandler}
      >
        <TbPlayerTrackPrev size={20} />
      </span>
      <span className="text-md flex items-center p-2 ">
        {pages.map((page) => (
          <span
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`${
              currentPage === page ? " text-blue-400 text-[16px]" : ""
            } cursor-pointer bg-transparent mr-2 p-[3px] px-2 hover:bg-[#ddd]`}
          >{`${page} `}</span>
        ))}
      </span>
      <span
        className="ml-1 cursor-pointer text-gray-700 bg-transparent p-2 hover:bg-[#ddd]"
        onClick={nextPageHandler}
      >
        <TbPlayerTrackNext size={20} />
      </span>
    </div>
  );
};

export default Pagination;
