import React from "react";

export default function Sidebar(props) {
    // Function to strip HTML tags from a string
    function stripHtml(html) {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    }

    // Generate the list of notes
    const noteElements = props.notes.map((note) => (
        <div key={note.id}>
            <div
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h4 className="text-snippet">
                    {stripHtml(note.body.split("\n")[0])}
                </h4>
                <button 
                    className="delete-btn"
                    onClick={() => props.deleteNote(note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ));

    // Render the sidebar
    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Noteify</h3>
                <button className="new-note" onClick={props.createNewNote}>+</button>
            </div>
            {noteElements}
        </section>
    );
}
