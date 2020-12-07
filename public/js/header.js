// include a header for easy editing of nav menu
$(document).ready(function() {
  $(`<div id="contact-details" class="bg-dark d-none d-lg-block d-xl-block">
      <ul class="container nav justify-content-end br-bottom no-right-pad">
        <li class="nav-item"> <a class="nav-link" href="tel:+35314023000"><i class="fas fa-phone-alt my-icons"></i>+353 1 402 3000</a> </li>
        <li class="nav-item"> <a class="nav-link no-right-pad" href="mailto:info@sbrealestates.ie"><i class="fas fa-envelope my-icons"></i>info@sbrealestates.ie</a> </li>
      </ul>
    </div>
    <!---------------------------------------------------------------->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark no-gutters">
      <div class="container no-right-pad no-left-pad"> <a class="navbar-brand" href="/"><img clas="navbar-brand" src="img/Sibanda_&_Baciu_Logo.png" width="180" height="78"></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul class="navbar-nav no-right-pad">
            <li class="nav-item active"> <a class="nav-link" href="/">HOME <span class="sr-only">(current)</span></a> </li>
            <li class="nav-item"> <a class="nav-link" href="/properties">PROPERTIES</a> </li>
            <li class="nav-item"> <a class="nav-link" href="/about">ABOUT</a> </li>
            <li class="nav-item"> <a class="nav-link" href="/contact" >CONTACT US</a> </li>
            <li class="nav-item "> <a class="btn btn-primary my-2 my-sm-0 " href="/signin" >Sign In</a> </li>
          </ul>
        </div>
      </div>
    </nav>`).appendTo('#header');
});