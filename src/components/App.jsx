import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";

function App() {
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [note, setNotes] = useState([]);

  useEffect(() => {
    fetch(`https://server-production-e885.up.railway.app/api/notes`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(
      response => response.json()
    ).then(data => {
      setNotes(data);
    })
     .catch(error => {
      console.error("Error fetching data:", error);
    });
  }, [])

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

    fetch(`https://server-production-e885.up.railway.app/api/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: inputTitle, content: inputContent }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setNotes((prevNotes) => {
          return [...prevNotes, { _id: data.insertedId, title: inputTitle, content: inputContent}];
        });
      })
      .catch(error => console.error(error));

      setInputTitle("");
      setInputContent("");
  };

  const deleteNote = (id) => {

    fetch(`https://server-production-e885.up.railway.app/api/notes/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
      })
      .catch(error => console.error('Error deleting note:', error));
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
          _id={n._id}
          title={n.title}
          content={n.content}
          deleteNote={() => deleteNote(n._id)}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
