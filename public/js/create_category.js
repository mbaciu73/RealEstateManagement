// form validation rules
$('#main-form').validate({
    rules: {
        CategoryName: {
            required: true,
            minlength: 3,
            maxlength: 50
        }
    },
    messages: {
        CategoryName: {
            required: 'Enter a valid Category name',
            minlength: '3 characters minimum.'
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
        CategoryName: $('#CategoryName')[0].value
    }
    const post = $.post('http://localhost:3000/insertCategory', data);
    post.done(processResults);
    post.fail(processErrors);
}

$('#btnSubmit').click(function(){
    $('#main-form').submit();
});

function processResults(){
    console.log('Data sent to server');
}
function processErrors(){
    console.log('Validation Errors');
}