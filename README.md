Daniela Perez
Final Project - Frontend

==========================================================================================================
App.jsx
==========================================================================================================

The only file that changed from the midterm assignment is this one. I adjusted the frontend to make API
calls to my backend server in order to display the appropriate data from the database. Below is an 
explanation of each added API call:

GET:
This call is made to display all notes in the database the first time a user opens the application. 
Credentials are included in the request in order to conform with cors requirements. The response is put
into the "note" state, and is displayed to the user. Any error is caught and logged to the console.

POST:
This call is made from the addNote function, which, in turn, is called when a user adds a new note in from
the UI. The new note is converted to a JSON before the function waits for a response. If all goes well and
a 200 status code is received, the "note" state is updated to include the new notes, and display it to the
user. Otherwise, an error is caught and logged to the console.

DELETE:
This call is made from the deleteNote function, which, in turn, is called when a user deletes a note via
the UI. The id of the note must be passed into deleteNote, as it is then included in the API call. If all goes well and a 200 status code is received, the "note" state is filtered of the deleted note, and the 
display changes accordingly. Otherwise, an error is caught and logged to the console.
