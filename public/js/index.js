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

$(document).ready(function() {
    const post = $.get('/retrieveLatestResidentialProperites');
    post.done(populateLatestResidential);
    post.fail(displayErrorPopulate);
});

// function to populate Counties
function populateCountiesSelect(rows, status, xhr) {
    for (let i = 0; i < rows.length; i++) {
        $(`<option value='${rows[i].CountID}'>${rows[i].CountyName}</option>`).appendTo('#County');
    }// end for
}// end populateCounties

// function to populate Areas
function populateAreasSelect(rows, status, xhr) {
    for (let i = 0; i < rows.length; i++) {
        $(`<option style="display:none" data-areaid='${rows[i].areaid}' value='${rows[i].countid}'>${rows[i].areaname}</option>`).appendTo('#Area');
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
        $(`<option style="display:none" data-catid='${rows[i].catid}'  value='${rows[i].catid}'>${rows[i].ptypename}</option>`).appendTo('#PropertyType');
    }// end for
}// end populateType

// function to populate latest residential area on homepage
function populateLatestResidential(rows, status, xhr) {
    for (let i = 0; i < rows.length; i++) {

        $(`<div class="col-md-4 col-sm-6 col-xs-12 p-3">
        <div class="border strip">
          <div class="p_small_details"> <img class="" src="img/${rows[i].imgname}"/>
            <div class="p-4">
              <h5>${rows[i].paddr}</h5>
              <p>${rows[i].ptypename}</p>
              <div class="property-details"> <span class=""><i class="fas fa-bed"></i></span>
                <p>${rows[i].no_bed} Bedrooms</p>
                <span class=""><i class="fas fa-bath"></i></span>
                <p>${rows[i].no_baths} Bathrooms</p>
              </div>
            </div>
          </div>
          <div class="view_details">
            <div class="p-4 p4_mod"> <a class="btn btn-primary my-2 my-sm-0 float-right" href="/property">VIEW DETAILS</a>
              <div class="clear"></div>
            </div>
          </div>
        </div>
      </div>`).appendTo('#latest-properties');
    }// end for
}// end populateLatestResidential
function displayErrorPopulate() {
	console.log('failed to populate');
}