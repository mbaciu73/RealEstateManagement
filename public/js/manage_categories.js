// Populate search query selects
$(document).ready(function() {
    const post = $.get('/manageCategories');
    post.done(listCategories);
    post.fail(displayErrorPopulate);
});

// function to populate latest residential area on homepage
function listCategories(rows, status, xhr) {
    for (let i = 0; i < rows.length; i++) {

        $(`<div class="row border-bottom pad-bottom border-top">
        <div class="col-lg-8 col-md-12 col-xs-12">
            <p class="m-2">CategoryID: ${rows[i].catid} | Name: ${rows[i].catname}</p>
        </div>
        <div class="col-lg-3 col-md-12 col-xs-12">
            <div class="row">
                <div class="col-lg-6 col-md-4 col-xs-4"><button type="button" class="btn btn-success" onclick = "editCategory()">Edit</button></div>
                <div class="col-lg-6 col-md-4 col-xs-4"><button type="button" class="btn btn-danger">Delete</button></div>
            </div>
            
        </div>
    </div>`).appendTo('#listCategories');
    }// end for
}// end populateLatestResidential
function displayErrorPopulate() {
	console.log('failed to populate');
}
//edits the category using the update category path in app.js
function editCategory(){
    // json object
    const data = {
        cat: $('#cat')[0].value
    }
    const post = $.post('http://localhost:3000/updateCategory', data);
    post.done(processResults);
    post.fail(processErrors);
}
