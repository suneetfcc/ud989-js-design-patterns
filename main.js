(function() {

    var counterMap = {};

    function initCatCounter(elemId) {

        if(!counterMap[elemId]) counterMap[elemId] = 0;

        var catElem = document.getElementById(elemId);

        if(catElem) {
            var imgElem     = catElem.querySelectorAll('img')[0];
            var counterElem = catElem.querySelectorAll('#counter')[0];
            if(imgElem) {
                imgElem.addEventListener('click', function() {
                    counterMap[elemId] = counterMap[elemId] + 1;
                    if(counterElem) {
                        counterElem.innerText = counterMap[elemId];
                    }
                });
            }
        }
    }

    document.addEventListener('DOMContentLoaded', function(event) {
        "cat1, cat2".split(", ").forEach(function(catId) {
            initCatCounter(catId);
        });
    });
})();
