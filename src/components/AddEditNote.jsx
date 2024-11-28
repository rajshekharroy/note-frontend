import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import TagInput from "./TagInput";
import axios from "axios";

const AddEditNote = ({
  noteData,
  setAddNoteOpen,
  setNoteToEdit,
  fetchNotes,
  successToast,
  failedToast,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState("");

  const addNewNote = () => {
    const note = { title, content, tags };
    axios
      .post("http://localhost:3000/api/add", note)
      .then((res) => {
        if (res.data) {
          fetchNotes();
          setAddNoteOpen(false);
          successToast(res.data.msg);
        }
      })
      .catch((error) => {
        console.log(error.response.data.msg);
        setError(error.response.data.msg);
        failedToast(error.response.data.msg);
      });
  };

  const editNote = async () => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/edit/${noteData._id}`,
        {
          title,
          content,
          tags,
        }
      );
      if (res.data) {
        fetchNotes();
        setAddNoteOpen(false);
        setNoteToEdit(null);
        successToast(res.data.msg);
      }
    } catch (error) {
      console.log(error.response?.data?.msg || error.message);
    }
  };

  const handleSubmit = () => {
    if (noteData) {
      editNote();
    } else {
      addNewNote();
    }
  };

  const handleCross = () => {
    setAddNoteOpen(false);
    setNoteToEdit(null);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
    e.target.value.trim().length > 0 ? setError("") : setError(error);
  };

  return (
    <div className="w-full max-w-96 border-2 shadow-lg flex flex-col gap-4 relative bg-white rounded-lg pt-10 pb-6 px-4 ">
      <RxCross1
        className=" absolute top-3 right-3 cursor-pointer"
        onClick={handleCross}
      />
      <input
        type="text"
        placeholder="Title..."
        value={title}
        className=" border-2 outline-none w-full p-2"
        onChange={handleChange}
      />
      {error === "Title is required" && <p className="text-red-500">{error}</p>}
      <textarea
        name=""
        id=""
        rows="5"
        value={content}
        placeholder="Add your note..."
        className=" border-2 w-full p-2 outline-none max-h-96"
        onChange={(e) => setContent(e.target.value)}
      />
      {error === "Content is required" && (
        <p className="text-red-500">{error}</p>
      )}

      <TagInput tags={tags} setTags={setTags} />
      <button
        onClick={handleSubmit}
        className=" border-2 bg-white border-black rounded-full w-fit px-4 py-1"
      >
        {noteData ? "Update Note" : "Add Note"}
      </button>
    </div>
  );
};

export default AddEditNote;
