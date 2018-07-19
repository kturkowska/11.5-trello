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
  		this.element = generateTemplate('column-template', { name: this.name });
		this.element.querySelector('.column').addEventListener('click', function (event) {
  			if (event.target.classList.contains('btn-delete')) {
    			self.removeColumn();
  			}

  			if (event.target.classList.contains('add-card')) {
    			self.addCard(new Card(prompt("Enter the name of the card")));
  			}
  		});
	};






});