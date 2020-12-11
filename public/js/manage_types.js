// Populate search query selects
$(document).ready(function() {
    const post = $.get('/manageTypes');
    post.done(listTypes);
    post.fail(displayErrorPopulate);

    // delete type
    // $('.type-delete-form').on("click", function(e) {
    //     e.preventDefault();
    //     var id = $('#id').val();
    //     console.log(id);
    //     // $.ajax({
    //     //     type: 'DELETE',
    //     //     url: '/delete/' + id,
    //     //     success: (data) => {
    //     //       console.log(data);
    //     //     },
    //     //     error: (err) => {
    //     //       console.log(error);
    //     //     });
    //     });
});

// function to populate latest residential area on homepage
function listTypes(rows, status, xhr) {
    for (let i = 0; i < rows.length; i++) {
        $(`<form id="form-row${rows[i].ptypeid}" class="type-delete-form">
        <div class="row border-bottom pad-bottom border-top">
        <input type=hidden id="row${rows[i].ptypeid}" name="${rows[i].ptypeid}" value="${rows[i].ptypeid}"/>
            <div class="col-lg-8 col-md-12 col-xs-12">
                <p id="${rows[i].ptypeid}" class="m-2">TypeID: ${rows[i].ptypeid} | Name: ${rows[i].ptypename}</p>
            </div>
            <div class="col-lg-3 col-md-12 col-xs-12">
                <div class="row">
                    <div class="col-lg-6 col-md-4 col-xs-4"><button type="button" class="btn btn-success" onclick="editType()">Edit</button></div>
                    <div class="col-lg-6 col-md-4 col-xs-4"><button name="${rows[i].ptypeid}" type="button" class="btn btn-danger" onclick="deleteType(this)">Delete</button></div>
                </div>
                
            </div>
            </div>
            </form>`).appendTo('#listTypes');
    }// end for
}// end populateLatestResidential
function displayErrorPopulate() {
	console.log('failed to populate');
}

function deleteType(x){

 var id = $(x).attr('name');
 

   const data = {
       ptypeid: $('#row'+id)[0].value
   }
   const post = $.post('http://localhost:3000/deleteType', data);
   post.done(deletedMessage);   
    
}

function deletedMessage(){
    location.reload();
}
//edits the category using the update category path in app.js
function editType(){
    // json object
    const data = {
        ptype: $('#ptype')[0].value,
        cat: $('#cat')[0].value
    }
    const post = $.post('http://localhost:3000/updateType', data);
    post.done(processResults);
    post.fail(processErrors);
}

// $(`#delete${trId}`).click(deleteInterest);

// function deleteInterest() {
//     const element = this.parentElement.parentElement;
//     const data = {
//         interestId: element.children[0].innerText,
//     }
//     const post = $.post('http://localhost:3000/deleteType', data);
//     post.done(processInterestSuccess);
//     post.fail(processUserErrors);
// }

