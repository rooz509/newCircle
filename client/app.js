const ColorService = require('./services/color-service');

$(document).ready(() => {
    $('#searchBtn').on('click', () => {
        let searchText = $('#searchText').val();

        ColorService
            .searchColors(searchText)
            .then((results) => {
                const paletteTemplate = $('#paletteTemplate');
                const paletteHTML = paletteTemplate.html().trim();
                const output = $('#output');

                results.forEach((palette)=> {
                    let $palette = $(paletteHTML);

                    let $paletteImage = $palette.find('.palette-image');
                    let $paletteName = $palette.find('.palette-name');
                    let $paletteAuthor = $palette.find('.palette-author');

                    $paletteImage.attr('src', palette.imageUrl);
                    $paletteName.text(palette.title);
                    $paletteAuthor.text(palette.userName);

                    output.append($palette);
                });
            })
            .catch((err) => {
                alert('shit hit the fan');
                console.error('failed: ', err);
            });
    });
});