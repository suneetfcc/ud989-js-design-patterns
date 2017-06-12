(function($window, $document) {

    var model = {
        current: null,
        cats: [
            {
                name: 'Pebbles',
                clicks: 0,
                url: 'img/cat1.jpg'
            }, {
                name: 'Mr. Piffles',
                clicks: 0,
                url: 'img/cat2.jpg'
            }, {
                name: 'Whiskers',
                clicks: 0,
                url: 'img/cat3.jpg'
            }, {
                name: 'Grumpy',
                clicks: 0,
                url: 'img/cat4.jpg'
            }, {
                name: 'Little Paws',
                clicks: 0,
                url: 'img/cat5.jpg'
            },{
                name: 'Freckles',
                clicks: 0,
                url: 'img/cat6.jpg'
            }
        ]
    };

    var listView = {
        init: function() {
            this.catListElem = $document.getElementById('cat-list');
            this.render();
        },
        render: function() {
            octopus.getAllCats().forEach(function(cat) {
                var that = this;
                var li = $document.createElement('li');
                li.textContent = cat.name;
                that.catListElem.appendChild(li);
                li.addEventListener('click', function () {
                    [].forEach.call(that.catListElem.children, function(element) {
                        element.className = '';
                    });
                    li.className = 'active';
                    octopus.setCurrentCat(cat);
                });
            }, this);
        }
    };

    var detailsView = {
        init: function() {
            this.catDetailsElem = $document.getElementById('cat-details');
            this.catNameElem  = $document.getElementById('cat-name');
            this.catImageElem  = $document.getElementById('cat-image');
            this.catcounterElem  = $document.getElementById('cat-counter');
            this.catImageElem.addEventListener('click', function () {
                octopus.incrementCatCounter();
            });
            this.render();
        },
        render: function() {
            var cat = octopus.getCurrentCat();
            this.catNameElem.textContent = cat.name;
            this.catImageElem.src = cat.url;
            this.catcounterElem.textContent = cat.clicks;
        }
    };

    var octopus = {
        init: function() {
            model.current = model.cats[0];
            listView.init();
            detailsView.init();
        },
        getCurrentCat: function() {
            return model.current;
        },
        setCurrentCat: function(cat) {
            model.current = cat;
            detailsView.render();
        },
        incrementCatCounter: function() {
            model.current.clicks += 1;
            detailsView.render();
        },
        getAllCats: function() {
            return model.cats;
        }
    };

    $document.addEventListener('DOMContentLoaded', function () {
        octopus.init();
    });

})(window, document);
