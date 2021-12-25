// todo comment: data

// const notes = [
// 	{
// 		id: 1,
// 		title: "first note",
// 		body: "some dummy text first",
// 		updated: "2021-10-31T15:03:23.556Z",
// 	},
// 	{
// 		id: 2,
// 		title: "second note",
// 		body: "some dummy text second",
// 		updated: "2021-10-31T15:03:55.556Z",
// 	},
// 	{
// 		id: 3,
// 		title: "third note",
// 		body: "some dummy text third",
// 		updated: "'2021-12-25T15:12:11.745Z'",
// 	},
// ];

// localStorage.setItem("notes-app", JSON.stringify(notes));

export default class NotesApi {
	static getAllNotes() {
		const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
		// todo comment: sorts notes
		return savedNotes.sort((a, b) => {
			return new Date(a.updates) > new Date(b.updates) ? -1 : 1;
		});
	}
	static saveNotes(noteToSave) {
		const notes = NotesApi.getAllNotes();

		const existedNote = notes.find((n) => n.id === noteToSave.id);

		if (existedNote) {
			existedNote.title = noteToSave.title;
			existedNote.body = noteToSave.body;
			existedNote.updated = new Date().toISOString();
		} else {
			// todo comment: id, updated, title, body => new note;
			noteToSave.id = new Date().getTime();
			noteToSave.updated = new Date().toISOString();
			notes.push(noteToSave);
		}
		localStorage.setItem("notes-app", JSON.stringify(notes));
	}
	static deleteNotes(id) {
		// todo comment: filtered notes for deleted note
		const getApi = NotesApi.getAllNotes();
		const filteredNotes = getApi.filter((i) => i.id != id);
		localStorage.setItem("notes-app", JSON.stringify(filteredNotes));
	}
}
