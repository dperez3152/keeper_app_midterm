import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes";

function App() {
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [note, setNotes] = useState(notes);

  function handleTitleChange(event) {
    const newValue = event.target.value;
    setInputTitle(newValue);
  }

  function handleContentChange(event) {
    const newValue = event.target.value;
    setInputContent(newValue);
  }

  function addNote(event) {
    event.preventDefault();

    const newNote = {
      key: note.length + 1,
      title: inputTitle,
      content: inputContent
    };
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
    setInputTitle("");
    setInputContent("");
  }

  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.key != id);
    });
  };

  return (
    <div>
      <Header name="Keeper" />

      <div className="centered-form">
        <form>
          <input
            onChange={handleTitleChange}
            type="text"
            value={inputTitle}
            placeholder="Title"
          ></input>
          <textarea
            onChange={handleContentChange}
            type="text"
            value={inputContent}
            placeholder="Take a note..."
            rows="3"
          ></textarea>
          <button onClick={addNote}> Add </button>
        </form>
      </div>

      {note.map((n) => (
        <Note
          key={n.key}
          id={n.key}
          title={n.title}
          content={n.content}
          deleteNote={deleteNote}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
