$(document).ready(function() {
    const post = $.get('/retrieveCategories');
    post.done(populateCatSelect);
    post.fail(displayErrorPopulate);
});

// form validation rules
$('#mainForm').validate({
    rules: {
        type: {
            required: true,
            minlength: 3,
            maxlength: 50
        },
        cat: {
            required: true
        }
    },
    messages: {
        type: {
            required: 'Enter a valid Type name',
            minlength: '3 characters minimum.'
        },
        cat: {
            required: 'Please select a role'
        }
    },
    onfocusout: validateFields,
    submitHandler: createAjaxPost

});

function validateFields(element, event){
    $(element).valid();
}

function createAjaxPost(){
    // json object
    const data = {
        type: $('#type')[0].value,
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
    console.log('Data sent to server');
}
function processErrors(){
    console.log('Validation Errors');
}
function populateCatSelect(rows, status, xhr) {
    for (let i = 0; i < rows.length; i++) {
        $(`<option value='${rows[i].catid}'>${rows[i].catname}</option>`).appendTo('#cat');
    }// end for
}// end populatecat
