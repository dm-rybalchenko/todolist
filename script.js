'use strict'

let arrayNodes = [];

function addNode(textNode) {
	let newNode = new createNode(textNode);
	arrayNodes.push(newNode);

}

function removeNode(id) {
	arrayNodes.splice(findNodeIndex(id), 1);
}


function createNode(textNode) {
	this.text = textNode;
	this.id = Math.random();
	this.status = true;
}

function findNodeIndex(id) {
	let indexNode;
	arrayNodes.forEach((item, index) => {
		for (let key in item) {
			if (item[key] === +id) indexNode = index;
		}
	});
	return indexNode;
}


// addNode('Тестовая заметка №1');
// addNode('Тестовая заметка №2');
// addNode('Тестовая заметка №3');
// removeNode(id);
// console.log(arrayNodes);
