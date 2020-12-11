// Populate search query selects
$(document).ready(function() {
    const post = $.get('/manageUsers');
    post.done(listUsers);
    post.fail(displayErrorPopulate);
});

// function to populate latest residential area on homepage
function listUsers(rows, status, xhr) {
    for (let i = 0; i < rows.length; i++) {
        console.log(rows[i].email)
        $(`<div class="row border-bottom pad-bottom border-top">
        <div class="col-lg-8 col-md-12 col-xs-12">
            <p class="m-2">UserID: ${rows[i].email} | Name: ${rows[i].name}</p>
        </div>
        <div class="col-lg-3 col-md-12 col-xs-12">
            <div class="row">
                <div class="col-lg-6 col-md-4 col-xs-4"><button type="button" class="btn btn-success" onclick="editUser()">Edit</button></div>
                <div class="col-lg-6 col-md-4 col-xs-4"><button type="button" class="btn btn-danger" >Delete</button></div>
            </div>
            
        </div>
    </div>`).appendTo('#listUsers');
    }// end for
}// end populateLatestResidential
function displayErrorPopulate() {
	console.log('failed to populate');
}
//edits the category using the update category path in app.js
function editUser(){
    const data = {
        email: $('#email')[0].value,
        name: $('#name')[0].value,
        phone: $('#phone')[0].value,
        password: $('#password')[0].value,
        role: $('#role')[0].value
    }
    const post = $.post('http://localhost:3000/updateUser', data);
    post.done(processResults);
    post.fail(processErrors);
}
