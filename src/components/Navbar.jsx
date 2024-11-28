import React, { useState } from "react";
import { TfiSearch } from "react-icons/tfi";
import Section from "./Section";
import { RxCross1 } from "react-icons/rx";
import clsx from "clsx";

const Navbar = ({ fetchNotes }) => {
  const [isClearInput, setClearInput] = useState("");
  const handleInputChange = (e) => {
    setClearInput(e.target.value);
    fetchNotes(1, e.target.value);
  };
  return (
    <div className=" w-full shadow-lg py-2 sticky top-0 bg-white z-10">
      <Section className="flex gap-6 items-center">
        <div className=" relative w-full sm:w-96 flex items-center">
          <input
            type="text"
            placeholder="Search"
            className=" w-full border-2 rounded-md shadow-md px-12 py-2 outline-none text-base"
            value={isClearInput}
            onChange={handleInputChange}
          />
          <TfiSearch className=" absolute top-1/2 left-4 -translate-y-1/2" />
          <RxCross1
            className={clsx(
              " absolute top-1/2 right-5 -translate-y-1/2 cursor-pointer ",
              !isClearInput && "hidden"
            )}
            onClick={() => {
              setClearInput("");
              fetchNotes();
            }}
          />
        </div>
      </Section>
    </div>
  );
};

export default Navbar;
