import clsx from "clsx";
import React, { useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const onAddTag = () => {
    const trimmedInput = inputValue.trim();
    if (trimmedInput && !tags.includes(trimmedInput)) {
      setTags((prev) => [...prev, trimmedInput]);
      setInputValue("");
    }
  };

  const onRemoveTag = (currentTag) => {
    setTags(tags.filter((tag) => tag !== currentTag));
  };
  return (
    <div className=" flex gap-4 flex-col overflow-hidden">
      <div
        className={clsx(
          " gap-2 flex w-full",
          tags.length > 0 && "p-1 border-2 overflow-x-auto"
        )}
      >
        {tags.map((tag, index) => (
          <p
            key={index}
            className=" cursor-pointer rounded-full bg-green-700 text-white w-fit px-2 py-1 group flex items-center gap-1"
            onClick={() => onRemoveTag(tag)}
          >
            {tag}

            <RxCrossCircled />
          </p>
        ))}
      </div>
      <div className=" flex gap-2 items-center">
        <input
          type="text"
          placeholder="tags.."
          className=" border-2 outline-none p-2 h-10 w-full"
          value={inputValue}
          onChange={handleChange}
        />
        <CiSquarePlus color="green" size={60} onClick={onAddTag} />
      </div>
    </div>
  );
};

export default TagInput;
