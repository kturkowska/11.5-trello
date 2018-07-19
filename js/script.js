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


});