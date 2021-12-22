// comment: date
const notes = [
	{ id: 1, title: "first note", body: "hey im heart", updated: "2021-10-31T15:02:00.411Z" },
	{ id: 2, title: "second note", body: "hey ali donyaee", updated: "2021-10-31T15:03:23.556Z" },
	{ id: 3, title: "third note", body: "hey vali valizadehh", updated: "2021-12-22T11:44:12.836Z" },
];

export default class NotesAPI {
	static getAllNotes() {
		// todo comment: get ali notes and this sort
		const savedNotes = notes || [];
		return savedNotes.sort((a, b) => {
			// todo comment: sort notes form end to first
			return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
		});
	}
	static saveNotes(noteToSave) {
		// todo comment: get notes from method getAllNotes()
		const notes = NotesAPI.getAllNotes();
		const existedNote = notes.find((n) => n.id === noteToSave.id);
		if (existedNote) {
			existedNote.title = noteToSave.title;
			existedNote.body = noteToSave.body;
			existedNote.updated = new Date().toISOString();
		} else {
			noteToSave.id = new Date().getTime();
			noteToSave.updated = new Date().toISOString();
			notes.push(noteToSave);
		}
		localStorage.setItem("notes-app", JSON.stringify(notes));
	}
	static deleteNotes(id) {
		localStorage.setItem(
			"notes-app",
			JSON.stringify(NotesAPI.getAllNotes().filter((d) => d.id !== id)),
		);
	}
}
