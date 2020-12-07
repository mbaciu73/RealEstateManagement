// include a header for easy editing of nav menu
$(document).ready(function() {
    $(`
    <a href="/my_profile"><p>My Profile</p></a>
    <a href="/create_property"><p>Create Property</p></a>
    <a href="/create_user"><p>Create User</p></a>
    <a href="/create_category"><p>Create Property Category</p></a>
    <a href="/create_type"><p>Create Property Type</p></a>
    <a href="/manage_properties"><p>Manage Properties</p></a>
    <a href="/manage_users"><p>Manage Users</p></a>
    <a href="/manage_categories"><p>Manage Property Categories</p></a>
    <a href="/manage_types"><p>Manage Property Types</p></a>
    <a href="/signout"><p>Sign Out</p></a>
    `).appendTo('#admin_menu');
  });

