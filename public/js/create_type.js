$(document).ready(function() {
    const post = $.get('/retrieveCategories');
    post.done(populateCatSelect);
    post.fail(displayErrorPopulate);
});

// form validation rules
$('#mainForm').validate({
    rules: {
        ptype: {
            required: true,
            minlength: 3,
            maxlength: 50
        },
        cat: {
            required: true
        }
    },
    messages: {
        ptype: {
            required: 'Enter a valid Type name',
            minlength: '3 characters minimum.'
        },
        cat: {
            required: 'Please select a role'
        }
    },
    onfocusout: validateFields,
    submitHandler: createAjaxPostType

});

function validateFields(element, event){
    $(element).valid();
}


function createAjaxPostType(){
    // json object
    const data = {
        ptype: $('#ptype')[0].value,
        cat: $('#cat')[0].value
    }
    const post = $.post('http://localhost:3000/insertProType', data);
    post.done(processResults);
    post.fail(processErrors);
}

$('#btnSubmit').click(function(){
    $('#mainForm').submit();

});

function displayErrorPopulate() {
    console.log('failed to populate');
}

function processResults(){
    alert('Successfully created');
}
function processErrors(){
    console.log('Validation Errors');
}
function populateCatSelect(rows, status, xhr) {
    for (let i = 0; i < rows.length; i++) {
        $(`<option value='${rows[i].catid}'>${rows[i].catname}</option>`).appendTo('#cat');
    }// end for
}// end populatecat
