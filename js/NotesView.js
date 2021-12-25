export default class NotesView {
	constructor(app, handlers) {
		this.app = app;
		const { onNoteAdd, onNoteEdit, onNoteSelect, onNoteDelete } = handlers;
		this.onNoteAdd = onNoteAdd;
		this.onNoteEdit = onNoteEdit;
		this.onNoteSelect = onNoteSelect;
		this.onNoteDelete = onNoteDelete;

		// todo comment: all tag project for change(dynamic)
		this.app.innerHTML = `
         <div class="sidebar">
				<header class="sidebar__header">
					<button class="sidebar__header-button">
						<i class="fas fa-plus"></i>
						<p>New</p>
					</button>
				</header>
				<aside class="sidebar__header-aside"></aside>
			</div>
			<section class="notes">
				<header class="notes__header">
					<div class="notes__header-setting">
						<div class="notes__header-setting-font_style">
							<button>
								<i class="fas fa-bold"></i>
							</button>
							<button>
								<i class="fas fa-italic"></i>
							</button>
							<button>
								<i class="fas fa-underline"></i>
							</button>
						</div>
						<div class="notes__header-setting-text-align">
							<button>
								<i class="fas fa-align-left"></i>
							</button>
							<button>
								<i class="fas fa-align-center"></i>
							</button>
							<button>
								<i class="fas fa-align-right"></i>
							</button>
						</div>
					</div>
					<button class="notes__header-button_share">Share</button>
				</header>
            <section class="notes__content">
               <div class="notes__content-div">
                  <input type="text" id="input" placeholder="Add a title">
                  <hr class="hr">
                  <textarea id="textarea" cols="100%" rows="100%" placeholder="add a content"></textarea>
               </div>
            </section>
			</div>
      `;

		const addNoteButton = this.app.querySelector(".sidebar__header-button");
		const inputTitle = this.app.querySelector("#input");
		const inputBody = this.app.querySelector("#textarea");

		addNoteButton.addEventListener("click", () => {
			this.onNoteAdd();
		});
		[inputTitle, inputBody].forEach((inputFailed) => {
			inputFailed.addEventListener("blur", () => {
				const newTitle = inputTitle.value.trim();
				const newBody = inputBody.value.trim();
				this.onNoteEdit(newTitle, newBody);
			});
		});

		// todo comment: hide notes preview in first loading
		this.updatedNotePreviewVisibility(false);
	}

	// todo comment: all tag notes for change(dynamic)
	_createListItemHTML(id, title, body, updated) {
		return `
         <div class="sidebar__header-aside-note" data-note-id="${id}">
				<div class="note-active"></div>
					<div class="text-note">
                  <div class="h1">
                     <h1>${title}</h1>
                     <div>
                        <i class="far fa-trash-alt" data-note-id="${id}"></i>
                     </div>
                  </div>
                  <p>
                     ${body.substring(0, 50)}
                     ${body.length > 50 ? "..." : ""}
                  </p>
						<p>${new Date(updated).toLocaleString("en", { dateStyle: "short", timeStyle: "short" })}</p>
					</div>
				</div>
         </div>
      `;
	}

	updatedNoteList(notes) {
		// todo comment: for add note
		const notesContainer = this.app.querySelector(".sidebar__header-aside");
		notesContainer.innerHTML = "";
		let notesList = "";
		for (const note of notes) {
			const { id, title, body, updated } = note;
			const html = this._createListItemHTML(id, title, body, updated);
			notesList += html;
		}
		// todo comment: for updated note
		notesContainer.innerHTML = notesList;
		notesContainer.querySelectorAll(".sidebar__header-aside-note").forEach((noteItem) => {
			noteItem.addEventListener("click", () => {
				this.onNoteSelect(noteItem.dataset.noteId);
			});
		});

		// todo comment: for delete note
		notesContainer.querySelectorAll(".fa-trash-alt").forEach((item) => {
			item.addEventListener("click", (e) => {
				e.stopPropagation();
				this.onNoteDelete(item.dataset.noteId);
			});
		});
	}

	updatedActiveNote(note) {
		this.app.querySelector("#input").value = note.title;
		this.app.querySelector("#textarea").value = note.body;

		this.app.querySelectorAll(".sidebar__header-aside").forEach((item) => {
			item.classList.remove();
		});

		const cc = this.app.querySelector(`.sidebar__header-aside-note[data-note-id="${note.id}"]`);
		cc.classList.add(".sidebar__header-aside");
		
	}

	updatedNotePreviewVisibility(vis) {
		this.app.querySelector(".notes__content-div").style.visibility = vis ? "visible" : "hidden";
	}
}
