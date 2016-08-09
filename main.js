
	var model = {
		adminMode: false, 
		currentCat: null,
		cats: 
		[
			{
				clickCount : 0,
				name: 'Jeff',
				imgSrc : 'img/jeff.jpg',
				imgAttribution: 'WhereIsItFromt'
			},
			{
				clickCount : 0,
				name: 'Brad',
				imgSrc : 'img/brad.jpg',
				imgAttribution: 'WhereIsItFromt'
			},
			{
				clickCount : 0,
				name: 'Ryan',
				imgSrc : 'img/ryan.jpg',
				imgAttribution: 'WhereIsItFromt'
			},
			{
				clickCount : 0,
				name: 'Vinny',
				imgSrc : 'img/vinny.jpg',
				imgAttribution: 'WhereIsItFromt'
			},
			{
				clickCount : 0,
				name: 'Drew',
				imgSrc : 'img/drew.jpg',
				imgAttribution: 'WhereIsItFromt'
			},
			{
				clickCount : 0,
				name: 'Austin',
				imgSrc : 'img/austin.jpg',
				imgAttribution: 'WhereIsItFromt'
			}
		]
	};


/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];

        // tell our views to initialize
        adminView.init();
        catListView.init();
        catView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
        adminView.render();
    },

    ////open up admin options:
    changeAdminMode: function() {
    	model.adminMode = !model.adminMode;
    	adminView.render();
    },
    checkAndChange: function(oldValue, newValue){
    	if (oldValue != newValue){
    		return newValue;
    	} else {
    		return oldValue;
    	}
    },

    commitAdminChanges: function() {
    	console.log("commit");
    	var inputtedName = adminView.catName.value;
    	var inputtedClickCount = adminView.catClickCount.value;
    	var inputtedURL = adminView.catURL.value;

    	model.currentCat.name = this.checkAndChange(model.currentCat.name, inputtedName);
    	model.currentCat.clickCount = this.checkAndChange(model.currentCat.clickCount, inputtedClickCount);
    	model.currentCat.imgSrc = this.checkAndChange(model.currentCat.imgSrc, inputtedURL);
    	catView.render();
    	catListView.render();
    }
};


/* ======= View ======= */

var adminView = {
	init: function() {
		this.adminArea = document.getElementById('adminArea');	
		this.adminForm = document.getElementById('adminForm');	
		this.catName = document.getElementById('admin-cat-name');
		this.catClickCount = document.getElementById('admin-cat-clickCount');
		this.catURL = document.getElementById('admin-cat-URL');
		this.confirmButton = document.getElementById('admin-confirm-button');
		this.cancelButton = document.getElementById('admin-cancel-button');
		this.adminButton = document.getElementById('adminButton');
		this.adminButton.addEventListener('click', function(){
			octopus.changeAdminMode();
		});
		
		this.confirmButton.addEventListener('click', function() {
			octopus.commitAdminChanges();
		});

		this.cancelButton.addEventListener('click', function() {
			octopus.changeAdminMode();
		})
		adminView.render();
	},
	render: function() {
		if (model.adminMode == true){
			this.adminForm.style.visibility = "visible";
			cat = octopus.getCurrentCat();
			this.catName.value = cat.name;
			this.catClickCount.value = cat.clickCount;
			this.catURL.value = cat.imgSrc;
		} else if (model.adminMode == false) {
			this.adminForm.style.visibility = "hidden";
		}
	}
}

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-img');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },
    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

// make it go!
octopus.init();
