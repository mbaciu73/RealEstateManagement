// Populate search query selects
$(document).ready(function() {
    const post = $.get('/retrieveCounties');
    post.done(populateCountiesSelect);
    post.fail(displayErrorPopulate);
});

$(document).ready(function() {
    const post = $.get('/retrieveAreas');
    post.done(populateAreasSelect);
    post.fail(displayErrorPopulate);
});

$(document).ready(function() {
    const post = $.get('/retrieveCategories');
    post.done(populateCatSelect);
    post.fail(displayErrorPopulate);
});

$(document).ready(function() {
    const post = $.get('/retrieveTypes');
    post.done(populateTypesSelect);
    post.fail(displayErrorPopulate);
});


// store array of counties
// const counties = new Map();

// function to populate Counties
function populateCountiesSelect(rows, status, xhr) {
    for (let i = 0; i < rows.length; i++) {
        $(`<option value='${rows[i].CountID}'>${rows[i].CountyName}</option>`).appendTo('#County');
    }// end for
}// end populateCounties

// function to populate Areas
function populateAreasSelect(rows, status, xhr) {
    for (let i = 0; i < rows.length; i++) {
        $(`<option value='${rows[i].areaid}'>${rows[i].areaname}</option>`).appendTo('#Area');
    }// end for
}// end populateAreas

// function to populate Categories
function populateCatSelect(rows, status, xhr) {
    for (let i = 0; i < rows.length; i++) {
        $(`<option value='${rows[i].catid}'>${rows[i].catname}</option>`).appendTo('#Category');
    }// end for
}// end populateCat

// function to populate types
function populateTypesSelect(rows, status, xhr) {
    for (let i = 0; i < rows.length; i++) {
        $(`<option value='${rows[i].ptypeid}'>${rows[i].ptypename}</option>`).appendTo('#PropertyType');
    }// end for
}// end populateType

function displayErrorPopulate() {
	console.log('failed to populate');
}