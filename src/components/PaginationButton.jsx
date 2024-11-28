import React from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

const PaginationButton = ({ currentPage, totalPages, fetchNotes }) => {
  return (
    <div className=" w-full flex justify-center items-center my-10 text-black ">
      <button
        className=" disabled:hidden rounded-md border-2 px-4 py-3"
        disabled={currentPage === 1}
        onClick={() => fetchNotes(currentPage - 1)}
      >
        <MdArrowBackIosNew />
      </button>

      <span className=" px-4">
        {currentPage} of {totalPages}
      </span>

      <button
        className=" disabled:hidden rounded-md border-2 px-4 py-3"
        disabled={currentPage === totalPages}
        onClick={() => fetchNotes(currentPage + 1)}
      >
        <MdArrowForwardIos />
      </button>
    </div>
  );
};

export default PaginationButton;
