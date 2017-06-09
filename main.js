(function() {

    var counterMap = {};

    function initCatCounter(elemId) {

        if(!counterMap[elemId]) counterMap[elemId] = 0;

        var catElem = document.getElementById(elemId);

        if(catElem) {
            var imgElem     = catElem.querySelectorAll('img')[0];
            var counterElem = catElem.querySelectorAll('.counter')[0];
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
    function setAttribute(elementList, className, value) {
        elementList.forEach(function(element) {
            element.setAttribute(className, value);
        });
    }
    function setCSS(elementList, prop, value) {
        elementList.forEach(function(element) {
            element.style[prop] = value;
        });
    }
    function toggleClass(element, elementList, className, activeValue, inactiveValue) {
        setAttribute(elementList, className, inactiveValue);
        element.setAttribute(className, activeValue);
    }
    function toggleCSS(element, elementList, prop, activeValue, inactiveValue) {
        setCSS(elementList, prop, inactiveValue);
        element.style[prop] = activeValue;
    }

    function showContent(element, elementList) {
        toggleCSS(element, elementList, 'display', 'block', 'none');
    }

    function activateLink(element, elementList) {
        toggleClass(element, elementList, 'class', 'active', '');
    }

    document.addEventListener('DOMContentLoaded', function(event) {

        var catList    = document.getElementById('cat-list');
        var catContent = document.getElementById('cat-content');

        if(catList) {
            var catListLinks = catList.querySelectorAll('li');
            catListLinks.forEach(function(catLink) {

                var elemId = catLink.getAttribute('data-trigger');
                var catElem = document.getElementById(elemId);
                initCatCounter(elemId);

                catLink.addEventListener('click',function() {
                    activateLink(catLink, catListLinks);
                    if(catElem) {
                        var catElems = catContent.querySelectorAll('.cat-info');
                        showContent(catElem, catElems);
                    }
                });
            });
        }
    });
})();
