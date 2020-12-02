$(document).ready(function() {
    const post = $.get('/retrieveAllProperties');
    post.done(populateAllResidential);
    post.fail(displayErrorPopulate);
});



function populateAllResidential(rows, status, xhr) {
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
      </div>`).appendTo('#all-properties');

        //$(`<option style="display:none" data-ptypeid='${rows[i].ptypeid}'  value='${rows[i].catid}'>${rows[i].ptypename}</option>`).appendTo('#PropertyType');
    }// end for
}// end populateType

function displayErrorPopulate() {
    console.log('failed to populate');
}