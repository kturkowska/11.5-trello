'use strict'

document.addEventListener('DOMContentLoaded', function() {

//generuję id, którego później będą używać kartki i kolumny
	function randomString() {
    	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ'; //zbiór elementów z których funkcja losuje
    	var str = ''; //zmienna w której przechowuję wygenerowany kod
    	for (var i = 0; i < 10; i++) {
        	str += chars[Math.floor(Math.random() * chars.length)]; //literuj,e tblicę chars przez wszystkie elementy, z których biore randomowe 10
    	}
    	return str; //zwracam id
	};


	function generateTemplate(name, data, basicElement) {
  		var template = document.getElementById(name).innerHTML;
  		var element = document.createElement(basicElement || 'div');

 		Mustache.parse(template);
  		element.innerHTML = Mustache.render(template, data);

  		return element;
	};

	function Column(name) {
  		var self = this;

 		this.id = randomString();
  		this.name = name;
  		this.element = generateTemplate('column-template', { 
  			name: this.name,
  			id: this.id 
  		});
		this.element.querySelector('.column').addEventListener('click', function (event) {
  			if (event.target.classList.contains('btn-delete')) {
    			self.removeColumn();
  			}

  			if (event.target.classList.contains('add-card')) {
    			self.addCard(new Card(prompt("Enter the name of the card")));
  			}
  		});
	};

	Column.prototype = {
    	addCard: function(card) {
      		this.element.querySelector('ul').appendChild(card.element);
    	},
    	removeColumn: function() {
      		this.element.parentNode.removeChild(this.element);
    	}
	};

	function Card(description) {
  		var self = this;

  		this.id = randomString();
  		this.description = description;
  		this.element = generateTemplate('card-template', { description: this.description }, 'li');
		  this.element.querySelector('.card').addEventListener('click', function (event) { 
			event.stopPropagation();

  			if (event.target.classList.contains('btn-delete')) {
    			self.removeCard();
  			}
		});
	};

	Card.prototype = {
		removeCard: function() {
			this.element.parentNode.removeChild(this.element);
    	}
	};

	var board = {
    	name: 'Kanban Board',
    	addColumn: function(column) {
      		this.element.appendChild(column.element);
      		initSortable(column.id); //??
    	},
    	element: document.querySelector('#board .column-container')
	};

	function initSortable(id) {
  		var el = document.getElementById(id);
  		var sortable = Sortable.create(el, {
    		group: 'kanban',
    		sort: true
  		});
	};

	document.querySelector('#board .create-column').addEventListener('click', function() {
    	var name = prompt('Enter a column name');
    	var column = new Column(name);
    	board.addColumn(column);
	});


// CREATING COLUMNS
var todoColumn = new Column('To do');
var doingColumn = new Column('Doing');
var doneColumn = new Column('Done');
var otherColumn = new Column('Other');

// ADDING COLUMNS TO THE BOARD
board.addColumn(todoColumn);
board.addColumn(doingColumn);
board.addColumn(doneColumn);
board.addColumn(otherColumn);

// CREATING CARDS
var card1 = new Card('New task');
var card2 = new Card('Create kanban boards');
var card3 = new Card ('Everything');
var card4 = new Card ('Some stuff like deadlines for project A');
var card5 = new Card ('Some stuff like deadlines for project A');
var card6 = new Card ('Nothing');

// ADDING CARDS TO COLUMNS
todoColumn.addCard(card1);
doingColumn.addCard(card2);
doneColumn.addCard(card3);
doneColumn.addCard(card5);
otherColumn.addCard(card4);
todoColumn.addCard(card6);



});

