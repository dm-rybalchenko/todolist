'use strict'

const allNotes = document.querySelector('.todolist__notes');
const toDoBody = document.querySelector('.todolist__body');
const buttonAddNote = document.querySelector('.todolist__btn');


let arrayNotes = [];

window.onload = function () {
	if (localStorage.getItem('arraytodo') === null) return;
	arrayNotes = JSON.parse(localStorage.getItem('arraytodo'));
	render();
}


toDoBody.addEventListener('click', function (event) {
	if (event.target === buttonAddNote) addNote();

	if (event.target.classList.contains('todolist__item')) {
		changeStatusNote(event.target);
	}

	if (event.target.tagName === 'SPAN') {
		if (event.target.closest('.todolist__item_done')) {
			removeNote(event.target.parentNode.id);
		} else {
			editNote(event.target.parentNode.id);
		}
	}
})


function render() {
	allNotes.innerHTML = '';
	arrayNotes.forEach(function (item) {
		let statusNote = item.status ? 'todolist__item_active' : 'todolist__item_done';
		allNotes.insertAdjacentHTML('beforeend',
			`<div id="${item.id}" class="todolist__item ${statusNote}">${item.text}<span></span></div>`
		);
	});
	if (localStorage.getItem('arraytodo') !== null) localStorage.removeItem('arraytodo');
	localStorage.setItem('arraytodo', JSON.stringify(arrayNotes));
}


function addNote() {
	let textNote = prompt('Введите текст вашей новой заметки');
	if (textNote === null) return;
	let newNote = new СreateNote(textNote);
	arrayNotes.push(newNote);
	render();
}

function editNote(id) {
	let newTextNote = prompt('Отредактируйте заметку', arrayNotes[findNoteIndex(id)].text);
	if (newTextNote === null) return;
	arrayNotes[findNoteIndex(id)].text = newTextNote;
	render();
}

function removeNote(id) {
	if (!confirm('Удалить заметку?')) return;
	arrayNotes.splice(findNoteIndex(id), 1);
	render();
}

function changeStatusNote(note) {
	arrayNotes[findNoteIndex(note.id)].status = arrayNotes[findNoteIndex(note.id)].status ? false : true;
	render();
}

function СreateNote(textNote) {
	this.text = textNote;
	this.id = Math.random();
	this.status = true;
}

function findNoteIndex(id) {
	return arrayNotes.findIndex(item => item.id === +id);
}
