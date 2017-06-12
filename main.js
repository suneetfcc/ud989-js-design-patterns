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
        ],
        update: function(cat) {
            this.cats.forEach(function (c,idx) {
                if (this.current.name === c.name) {
                    this.cats[idx] = cat;
                }
            }, this);
            this.current = cat;
        }
    };

    var listView = {
        init: function() {
            this.catListElem = $document.getElementById('cat-list');
            this.render();
        },
        render: function() {
            this.catListElem.innerHTML = '';
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
            [].forEach.call(this.catListElem.children, function(li) {
                if (li.textContent === octopus.getCurrentCat().name) {
                    li.className = 'active';
                }
            });
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

    var adminView = {
        init: function() {
            this.form = $document.getElementById('admin-form');
            this.adminBtn = $document.getElementById('btn-admin');
            this.cancelBtn = $document.getElementById('btn-cancel');
            this.saveBtn = $document.getElementById('btn-save');
            this.show = true;
            var that = this;
            this.adminBtn.addEventListener('click', function() {
                that.toggle();
            });
            this.cancelBtn.addEventListener('click', function(event) {
                event.preventDefault();
                that.render();
                that.toggle();
            });
            this.saveBtn.addEventListener('click', function(event) {
                event.preventDefault();
                octopus.saveCat({name: that.form.catname.value,
                                url: that.form.caturl.value,
                                clicks: 0
                            });
                that.toggle();
            });
            this.toggle();
            this.render();
        },
        toggle: function() {
            this.show = !this.show;
            if (this.show) {
                this.form.style.visibility = 'visible';
            }
            else {
                this.form.style.visibility = 'hidden';
            }
        },
        render: function() {
            var cat = octopus.getCurrentCat();
            this.form.catname.value = cat.name;
            this.form.caturl.value  = cat.url;
        }
    };

    var octopus = {
        init: function() {
            model.current = model.cats[0];
            listView.init();
            detailsView.init();
            adminView.init();
        },
        getCurrentCat: function() {
            return model.current;
        },
        setCurrentCat: function(cat) {
            model.current = cat;
            detailsView.render();
            adminView.render();
        },
        incrementCatCounter: function() {
            model.current.clicks += 1;
            detailsView.render();
        },
        getAllCats: function() {
            return model.cats;
        },
        saveCat: function(cat) {
            model.update(cat);
            listView.render();
            detailsView.render();
        }
    };

    $document.addEventListener('DOMContentLoaded', function () {
        octopus.init();
    });

})(window, document);
