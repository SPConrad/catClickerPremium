$(function(){
	var model = {
		init: function() {
			if (!localStorage.catArray){
				localStorage.catArray = JSON.stringify([]);
			} 
			localStorage.catArray = JSON.stringify([]);
		},
		add: function(obj){
			var data = JSON.parse(localStorage.catArray);
            data.push(obj);
            localStorage.catArray = JSON.stringify(data);
		},
		getCats: function(){
			return JSON.parse(localStorage.catArray);
		},
		incrementClick: function(cat){
			var catArray = JSON.parse(localStorage.catArray)
			catArray[cat.name].clickCount += 1;
			localStorage.catArray = JSON.stringify(catArray);
		},
		getCat: function(num){
			var returnString = JSON.parse(localStorage.catArray)[num];
			this.incrementClick(returnString);
			return {'name': returnString.name, 'clickCount': returnString.clickCount, 'url': returnString.url};
		}
	};


	var octopus = {
		addCats: function(numOfCats) {
			for (var i = 0; i < 5; i++){
				model.add({"name": i, "clickCount": 0,"url": "img/cat" + i + ".jpg"})
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