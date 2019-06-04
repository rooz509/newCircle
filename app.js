(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const ColorService = require('./services/color-service.js');

//routing
$(document).ready(() => {
   $('#btnSearch').on('click', () => {
        let txtSearch = $('#txtSearch').val();

        ColorService.searchColors(txtSearch)
            .then((results) => {
                const paletteTemplate = $('#paletteTemplate');
                const paletteHtml = paletteTemplate.html().trim();
                const output = $('#output');

                results.forEach((palette) => {

                    let $palette = $(paletteHtml);

                    //update palette img
                    let $image = $palette.find('.p-img');
                    $image.attr('src', palette.imageUrl);

                    //update palette name
                    let $name = $palette.find('.p-name');
                    $name.text(palette.title);

                    //update palette author
                    let $author = $palette.find('.p-author');
                    $author.text(palette.userName);

                    output.append($palette);
                });
            })
            .catch((err) => {
                alert('you effed it up, its all your fault');
                console.error('failed: ', err);
            })
   });
} );
        //let searchURL = `${colourLoversAPI}?keywords=${txtSearch}&jsonCallback=?`;

        // $.getJSON(searchURL, (results) => {
        //     console.log('results: ', results);
        //     const paletteTemplate = $('#paletteTemplate');
        //     const paletteHtml = paletteTemplate.html().trim();
        //     const output = $('#output');
        //
        //     results.forEach((palette) => {
        //
        //         let $palette = $(paletteHtml);
        //
        //         //update palette img
        //         let $image = $palette.find('.p-img');
        //         $image.attr('src', palette.imageUrl);
        //
        //         //update palette name
        //         let $name = $palette.find('.p-name');
        //         $name.text(palette.title);
        //
        //         //update palette author
        //         let $author = $palette.find('.p-author');
        //         $author.text(palette.userName);
        //
        //         output.append($palette);
        //     });
        // });

},{"./services/color-service.js":2}],2:[function(require,module,exports){

module.exports = {
    getColors: getColors,
    searchColors: searchColors
};

const colourLoversAPI = 'http://www.colourlovers.com/api/colors';

function getColors()
{

}

function searchColors(query, filters = {})
{
    let queryParams = [];
    for(let key in filters)
    {
        queryParams.push(`${key}=${filters[key]}`);
    }
    queryParams.push(`keywords=${query}`);
    queryParams.push('jsonCallback=?');

    let searchURL = `${colourLoversAPI}?${queryParams.join('&')}`;

    return new Promise((resolve, reject) => {
        $.getJSON(searchURL, resolve)
            .fail((jqxhr, textStatus, error) => {
                reject(error);
            });
    });


}
},{}]},{},[1]);
