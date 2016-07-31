$(function(){
	var model = {
		init: function() {
			if (!localStorage.catArray){
				localStorage.catArray = JSON.stringify([]);
			} 
			localStorage.catArray = '{"cats": []}';
		},
		add: function(obj){
			var data = JSON.parse(localStorage.catArray).cats;
			//data.push(obj);
			console.log(JSON.parse(localStorage.catArray));
			console.log(JSON.parse(localStorage.catArray).cats);
			console.log(data);
			console.log(obj);
			data.push(obj);
			console.log(data);
			localStorage.catArray.cats = JSON.stringify(data);
			console.log(localStorage.catArray.cats);
			console.log("------------------------------- END ADD -------------------------------")
		},
		getCats: function(){

			return JSON.parse(localStorage.catArray).cats;
		},
		incrementClick: function(cat){
			cat.clickCount = cat.clickCount + 1;
			//console.log(JSON.parse(localStorage.catArray)[cat.name]);
			//console.log(cat);
			//console.log(JSON.parse(localStorage.catArray));
			//console.log(JSON.parse(localStorage.catArray)[cat.name]);
			//console.log(JSON.parse(localStorage.catArray)[cat.name].clickCount);
			JSON.parse(localStorage.catArray)[cat.name].clickCount = 500;
			//console.log(JSON.parse(localStorage.catArray)[cat.name].clickCount);
			//console.log(JSON.parse(localStorage.catArray)[cat.name]);
			//console.log(JSON.parse(localStorage.catArray)[cat.name]);

		},
		getCat: function(num){
			var returnString = JSON.parse(localStorage.catArray)[num];
			this.incrementClick(returnString);
			return {'name': returnString.name, 'clickCount': returnString.clickCount, 'url': returnString.url};
		}
	};


	var octopus = {
		addCats: function(numOfCats) {
			for (var i = 0; i < 1; i++){
				model.add('{"name": i, "clickCount": 0,"url": "img/cat" + i + ".jpg"}')
			}
		},
		getCats: function(){
			return model.getCats();
		},
		getCat: function(num) {
			imageView.render(model.getCat(num));
		},
		init: function() {
			model.init();	
			var startingCats = 5;
			this.addCats(startingCats);
			listView.init();
			imageView.init();		
		}
	};

	var listView = {
		init: function(){
			this.catList = $('#buttons');
			var newButton = $('#catButton');
			listView.render();
			$(":button").each(function(i, elem) {
				$(elem).click(function(e){
					octopus.getCat(i);
				})
			})
		},
		render: function(){
			var htmlStr = '';
			octopus.getCats().forEach(function(cat){
				htmlStr += '<li><button type="button" id="catButton' + cat.name 
				+ '">Cat ' + cat.name + '</button></li>';
			});
			this.catList.html(htmlStr);
		}
	};

	var imageView = {
		init: function(){
			this.displayArea = $('#bigCat').get(0);
			var url = 'img/noCat.jpg';
			imageView.render({'name': 'Starter', 'url': url, 'clickCount': 0});
		},
		render: function(cat){
			var htmlStr = '<img id="bigCat" class="bigCatImage" src="' + cat.url + '">';
			this.displayArea.innerHTML  = htmlStr;
		}
	};

	octopus.init();
});