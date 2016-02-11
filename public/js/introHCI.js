'use strict';

// Call this function when the page loads (the "ready" event)
$(document).ready(function() {
	initializePage();
})

/*
 * Function that is called when the document is ready.
 */
function initializePage() {
	$('.project a').click(addProjectDetails);

	$('#colorBtn').click(randomizeColors);

	$('#exApi').click(exApi);

}

/*
 * Make an AJAX call to retrieve project details and add it in
 */
function addProjectDetails(e) {

	// Prevent following the link
	e.preventDefault();

	// Get the div ID, e.g., "project3"
	var projectID = $(this).closest('.project').attr('id');
	// get rid of 'project' from the front of the id 'project3'
	var idNumber = projectID.substr('project'.length);

    $.get("/project/" + idNumber,callback);

	console.log("User clicked on project " + idNumber);
}

function callback(result){
  var id = "#project" + result.id;
  var htmlStuff = "<h3>" +result.title+"</h3> <h4>" + result.date + "</h4>" + result.summary +  "<img class=\"detailsImage\" src = \"" + result.image + "\">";
  $(id +  " .details").html(htmlStuff);
}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function randomizeColors(e) {
	console.log("User clicked on color button");
	$.get("/palette", colorCallback);



}

/*
 * Make an AJAX call to retrieve a color palette for the site
 * and apply it
 */
function exApi(e) {
	console.log("User clicked on exApi button");
	//var data = $.get("https://www.panoramio.com/map/get_panoramas.php?set=532693&from=0&to=20&minx=-180&miny=-90&maxx=180&maxy=90&size=medium&mapfilter=true", callbackFunction, 'jsonp');
	var data = $.get("https://api.github.com/users/mralexgray/repos", callbackFunction, 'jsonp');

//	console.log(data);
}

function callbackFunction(result){
	console.log(result);
	var res = result.data;
	var str = "";
	str = str + "Object.data[0].archive_url: " +   res[0].archive_url;

	//for (var i = 0; i < res.length; i++)
//	str = str + "From the example html   \n \"Count: " + res.count + "   \nhas_more: " + res.has_more + "  \nphotos: " +res.photos  + "\"";

	$('.details').html(str);
	$('#details').html(str);


}


function colorCallback(result){
	console.log(result);
	var colors = result.colors.hex;
	$('body').css('background-color', colors[0]);
	$('.thumbnail').css('background-color', colors[1]);
	$('h1, h2, h3, h4, h5, h5').css('color', colors[2]);
	$('p').css('color', colors[3]);
	$('.project img').css('opacity', .75);

}