$(document).ready(function() {
    const post = $.get('/retrieveProperty');
    post.done(populateProperty);
    post.fail(displayErrorPopulate);
});

function populateProperty(rows, status, xhr) {
    for (let i = 0; i < rows.length; i++) {
        $(`<option value='${rows[i].CountID}'>${rows[i].CountyName}</option>`).appendTo('#County');
    }// end for
}

function displayErrorPopulate() {
    console.log('failed to populate');
}