import React, { useEffect, useState } from "react";
import NoteCard from "../cards/NoteCard";
import Navbar from "../Navbar";
import Section from "../Section";
import AddEditNote from "../AddEditNote";
import { CiCirclePlus } from "react-icons/ci";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import PaginationButton from "../PaginationButton";

const Homepage = () => {
  const [isAddNoteOpen, setAddNoteOpen] = useState(false);
  const [allNotes, setAllNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const successToast = (msg) => toast.success(msg);
  const failedToast = (msg) => toast.error(msg);

  const fetchNotes = (page = 1, query = "") => {
    axios
      .get(`http://localhost:3000/api/get?page=${page}&limit=6&query=${query}`)
      .then((res) => {
        setAllNotes(res.data.notes);
        setFilteredNotes(res.data.notes);
        setTotalPages(res.data.totalPages);
        setCurrentPage(res.data.currentPage);
      })
      .catch((err) => {
        failedToast(err.response?.data?.msg || "An unknown error occurred");
      });
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const onEdit = (note) => {
    setNoteToEdit(note);
    setAddNoteOpen(true);
  };

  const handleDelete = (note) => {
    axios
      .delete(`http://localhost:3000/api/delete/${note._id}`)
      .then((res) => {
        successToast(res.data.msg);
        fetchNotes();
      })
      .catch((err) =>
        failedToast(err.response?.data?.msg || "An unknown error occurred")
      );
  };

  const handlePin = (note) => {
    const isPinned = !note.isPinned;
    axios
      .patch(`http://localhost:3000/api/update-pin/${note._id}`, {
        isPinned,
      })
      .then((res) => {
        successToast(res.data.msg);
        fetchNotes();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="">
        <Toaster position="top-right" />
        <Navbar
          setFilteredNotes={setFilteredNotes}
          allNotes={allNotes}
          fetchNotes={fetchNotes}
        />

        <Section className="grid gap-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                tags={note.tags}
                content={note.content}
                isPinned={note.isPinned}
                onEdit={() => onEdit(note)}
                onDelete={() => handleDelete(note)}
                onPin={() => handlePin(note)}
              />
            ))
          ) : (
            <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className=" lg:text-3xl sm:text-2xl text-xl my-4">
                Your notes will appear here. <br />
                Start by adding a new note.
              </p>
              <button
                onClick={setAddNoteOpen}
                className=" border-blue-950 border-2 px-2 py-1 rounded-3xl text-nowrap"
              >
                Add Note
              </button>
            </div>
          )}
        </Section>

        {isAddNoteOpen && (
          <div className="fixed w-screen h-screen top-0 bg-black bg-opacity-55 flex z-50 justify-center items-center">
            <AddEditNote
              setNoteToEdit={setNoteToEdit}
              setAddNoteOpen={setAddNoteOpen}
              fetchNotes={fetchNotes}
              noteData={noteToEdit}
              successToast={successToast}
              failedToast={failedToast}
            />
          </div>
        )}
        <CiCirclePlus
          className=" text-5xl rounded-full fixed bottom-5 right-5 cursor-pointer"
          onClick={() => setAddNoteOpen(true)}
        />
      </div>
      {totalPages > 1 && (
        <PaginationButton
          currentPage={currentPage}
          totalPages={totalPages}
          fetchNotes={fetchNotes}
        />
      )}
    </>
  );
};

export default Homepage;
