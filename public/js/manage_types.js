// Populate search query selects
$(document).ready(function() {
    const post = $.get('/manageTypes');
    post.done(listTypes);
    post.fail(displayErrorPopulate);
});

// function to populate latest residential area on homepage
function listTypes(rows, status, xhr) {
    for (let i = 0; i < rows.length; i++) {
        $(`<div class="row border-bottom pad-bottom border-top">
        <div class="col-lg-8 col-md-12 col-xs-12">
            <p class="m-2">TypeID: ${rows[i].ptypeid} | Name: ${rows[i].ptypename}</p>
        </div>
        <div class="col-lg-3 col-md-12 col-xs-12">
            <div class="row">
                <div class="col-lg-6 col-md-4 col-xs-4"><button type="button" class="btn btn-success">Edit</button></div>
                <div class="col-lg-6 col-md-4 col-xs-4"><button type="button" class="btn btn-danger">Delete</button></div>
            </div>
            
        </div>
    </div>`).appendTo('#listTypes');
    }// end for
}// end populateLatestResidential
function displayErrorPopulate() {
	console.log('failed to populate');
}
