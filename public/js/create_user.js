$(document).ready(function() {
    const post = $.get('/retrieveRole');
    post.done(populateRoleSelect);
    post.fail(displayErrorPopulate);
});

// form validation rules
$('#mainform').validate({
    rules: {
        email: {
            required: true,
            minlength: 5,
            maxlength: 50,
            email: true
        },
        name: {
            required: true,
            minlength: 3,
            maxlength: 50
        },
        phone: {

            required: true,
            minlength: 9,
            maxlength: 9,
            digits: true
        },
        password: {
            required: true,
            minlength: 4
        },
        role: {
            required: true
        }
    },
    messages: {
        email: {
            required: 'Enter a valid email address',
            minlength: '3 characters minimum.'
        },
        name: {
            required: 'Enter full name',
            minlength: 'Name should contain at least 3 letters'
        },
        phone: {
            required: 'Enter phone number',
            minlength: 'please enter phone number in the format 123456789',
            digits: 'Only numbers'
        },
        password: {
            required: 'Password cannot be blank',
            minlength: 'Minimum password length is 4 chars'
        },
        role: {
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
        email: $('#email')[0].value,
        name: $('#name')[0].value,
        phone: $('#phone')[0].value,
        password: $('#password')[0].value,
        role: $('#role')[0].value
    }
    const post = $.post('http://localhost:3000/insertUser', data);
    post.done(processResults);
    post.fail(processErrors);
}

$('#btnSubmit').click(function(){
    $('#mainform').submit();
});

function populateRoleSelect(rows, status, xhr) {
    for (let i = 1; i < rows.length; i++) {
        $(`<option value='${rows[i].roleid}'>${rows[i].Rname}</option>`).appendTo('#role');
    }// end for
}// end populaterole

function displayErrorPopulate() {
    console.log('failed to populate');
}

function processResults(){
    alert('Successfully created');
}
function processErrors(){
    console.log('Validation Errors');
}