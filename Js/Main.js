import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

const app = document.getElementById("App");

const view = new NotesView(app, {
	onNoteAdd() {
		console.log("notes add ben");
	},
	onNoteEdit(newTitle, newBody) {
		console.log(newTitle, newBody);
	},
});
