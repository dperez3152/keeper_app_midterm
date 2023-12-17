import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes";

function App() {
  const [inputTitle, setInputTitle] = useState("");
  const [inputContent, setInputContent] = useState("");
  const [note, setNotes] = useState([]);

  /*useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch("/api/notes");

        const notesReceived = await response.json();

        setNotes(notesReceived);
      } catch (e) {
        console.log(e);
      }
    };

    fetchNotes();
  }, []);*/

  useEffect(() => {
    fetch("https://server-production-e885.up.railway.app/api/notes", {
      method: 'GET',
      credentials: 'include',  // Include credentials in the request
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(
      response => response.json()
    ).then(data => {
      console.log(data);
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
    // Add a new entry
    fetch("https://server-production-e885.up.railway.app/api/notes", {
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

 /* function addNotePrev(event) {
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
  }*/


  const deleteNotePrev = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.key != id);
    });
  };

  const deleteNote = (_id) => {
    // Make a DELETE request to the API endpoint for deleting a note
    fetch(`/api/notes/${_id}`, {
      method: 'DELETE',
      credentials: 'include',  // Include credentials if needed
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
        // Assuming data contains information about the deleted note, if needed
        console.log('Note deleted:', data);
  
        // Update the state to remove the deleted note
        setNotes(prevNotes => prevNotes.filter(note => note._id !== _id));
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
          //key={n.key}
          //id={n.key}
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
