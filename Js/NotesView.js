export default class NotesView {
	constructor(app, handlers) {
		this.app = app;
		const { onNoteAdd, onNoteEdit, onNoteSelect, onNoteDElete } = handlers;
		this.onNoteAdd = onNoteAdd;
		this.onNoteEdit = onNoteEdit;
		this.app.innerHTML = `
      <div class="div_left">
				<div class="div_left__text_header">
					<input type="text" placeholder="title" class="input_title"/>
				</div>
				<div class="div_left__textarea">
					<textarea name="" id="input_body" cols="30" rows="10" placeholder="note"></textarea>
				</div>
			</div>
			<div class="div_right">
				<div class="div_right__header">
					<header class="header">NOTE APP</header>
				</div>
				<div class="div_prev_notes">
					<div class="div_prev_notes__notes">
						<div class="name_note"><p>new note</p></div>
						<div class="text_note"><p>hi a'm ali donyaee</p></div>
						<div class="data_note"><p>monday 1:30 PM</p></div>
					</div>
				</div>
				<div class="div_add_notes">
					<button class="adding_notes">ADD NOTE</button>
				</div>
			</div>
      `;

		const adding_notes = this.app.querySelector(".adding_notes");
		const input_title = this.app.querySelector(".input_title");
		const input_body = this.app.querySelector("#input_body");

		adding_notes.addEventListener("click", () => {
			// todo comment: run add note method
			this.onNoteAdd();
		});
		[input_title, input_body].forEach((inputField) => {
			inputField.addEventListener("blur", () => {
				const newBody = input_body.value.trim();
				const newTitle = input_title.value.trim();
				this.onNoteEdit(newBody, newTitle);
			});
		});
	}
}
