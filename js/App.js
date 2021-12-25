import NotesApi from "./NotesApi.js";
import NotesView from "./NotesView.js";

export default class App {
	constructor(root) {
		this.notes = [];
		this.activeNote = null;
		this.view = new NotesView(root, this._handlers());
		this._refreshNotes();
	}

	_refreshNotes() {
		const notes = NotesApi.getAllNotes();

		// todo comment: set notes
		this.notes = notes;
		this.view.updatedNoteList(notes);
		this.view.updatedNotePreviewVisibility(notes.length > 0);

		// todo comment: set active notes
		this.activeNote = notes;
		this.view.updatedActiveNote(notes);	
	}

	_handlers() {
		return {
			// todo comment: call for add note
			onNoteAdd: () => {
				const NewNote = {
					title: "New Note",
					body: "Take Some Note",
				};
				NotesApi.saveNotes(NewNote);
				this._refreshNotes();
			},
			// todo comment: call for edit note
			onNoteEdit: (newTitle, newBody) => {
				console.log(newTitle, newBody);
				NotesApi.saveNotes({
					id: this.activeNote.id,
					title: newTitle,
					body: newBody,
				});
				this._refreshNotes();
			},
			// todo comment: call for select note
			onNoteSelect: (noteId) => {
				const selectedNotes = this.notes.find((n) => n.id == noteId);
				this.activeNote = selectedNotes;
				this.view.updatedActiveNote(selectedNotes);
			},
			// todo comment: call for delete note
			onNoteDelete: (noteId) => {
				NotesApi.deleteNotes(noteId);
				this._refreshNotes();
			},
		};
	}
}
