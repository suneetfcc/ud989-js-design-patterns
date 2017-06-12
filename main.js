(function($window, $document) {

    var model = (function() {
        var data = [
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
        ];

        var addClick = function(id) {
            data[id].clicks += 1;
        };

        var clicks = function(id) {
            return data[id].clicks;
        };

        var url = function(id) {
            return data[id].url;
        };

        var name = function(id) {
            return data[id].name;
        };

        var getAll = function() {
            return data;
        };

        return {
            clicks: clicks,
            url: url,
            name: name,
            addClick: addClick,
            getAll: getAll
        };
    })();

    var listView = {
        init: function() {
            this.render();
        },
        render: function() {
            var listView = $document.getElementById('cat-list');
            octopus.getAllNames().forEach(function(name,index) {
                var li = $document.createElement('li');
                var idx = index;
                li.innerHTML = '<div' + ((index === 0) ? ' class="active">' : '>');
                li.innerHTML += name + '</div>';
                li.addEventListener('click', function (event) {
                    [].forEach.call(listView.children, function(element) {
                        element.className = '';
                    });
                    li.className = 'active';
                    detailsView.render(idx);
                });
                listView.appendChild(li);
            }, this);
        }
    };

    var detailsView = {
        init: function() {
            this.render(0);
        },
        render: function(id) {
            var that = this;
            var detailsView = $document.getElementById('cat-details');
            detailsView.removeChild(detailsView.firstChild);
            var html = '<div><h3>' + octopus.name(id) + '</h3>';
            html    += '<img src="' + octopus.url(id) + '" alt="Meow!!">';
            html    += '<div class="counter">' + octopus.clicks(id) + ' clicks</div></div>';
            detailsView.innerHTML = html;
            var img = detailsView.querySelectorAll('img')[0];
            img.addEventListener('click', function (e) {
                octopus.addClick(id);
                that.render(id);
            });
        }
    };

    var octopus = {
        init: function() {
            listView.init();
            detailsView.init();
        },
        name: function(id) {
            return model.name(id);
        },
        url: function(id) {
            return model.url(id);
        },
        clicks: function(id) {
            return model.clicks(id);
        },
        getAllNames: function() {
            return model.getAll().map(function(obj) {
                return obj.name;
            });
        },
        addClick: function(id) {
            model.addClick(id);
        }
    };

    $document.addEventListener('DOMContentLoaded', function () {
        octopus.init();
    });

})(window, document);
