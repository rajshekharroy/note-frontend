import React from "react";
import { MdDelete } from "react-icons/md";
import { PiPushPinFill, PiPushPinLight } from "react-icons/pi";
import { HiPencilSquare } from "react-icons/hi2";

const NoteCard = ({
  title,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPin,
}) => {
  return (
    <>
      <div className=" flex flex-col justify-between border-2 p-4 rounded-md shadow-lg bg-white relative">
        <div className=" flex sm:flex-row flex-col-reverse gap-4 justify-between">
          <h1 className=" text-lg font-medium pb-4 w-full overflow-y-auto">
            {title}
          </h1>
          <div className=" text-xl w-full sm:w-fit cursor-pointer flex items-center justify-between gap-4 h-fit ">
            <div className=" flex gap-4 text-xl p-1 border-2 rounded-full text-white w-fit">
              <MdDelete
                onClick={onDelete}
                className=" text-red-500 cursor-pointer"
              />
              <HiPencilSquare
                className=" text-green-600 cursor-pointer"
                onClick={() => onEdit()}
              />
            </div>
            <span onClick={onPin}>
              {isPinned ? <PiPushPinFill /> : <PiPushPinLight />}
            </span>
          </div>
        </div>
        <hr className=" border-1 w-full" />
        <div className=" cursor-pointer" onClick={() => onEdit()}>
          <p className=" py-4 break-words overflow-auto max-h-40 cursor-pointer self-start">
            {content}
          </p>
        </div>
        <div className=" flex overflow-x-auto gap-5 py-2 ">
          {tags.map((tag, id) => (
            <p
              key={id}
              className=" border-2 px-2 py-1 h-fit w-fit rounded-xl relative group bg-green-700 text-white"
            >
              {tag}
            </p>
          ))}
        </div>
      </div>
    </>
  );
};

export default NoteCard;
