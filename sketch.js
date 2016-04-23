var categories = [];
var stats = ["Agencies", "Requests", "Completed", "Rejected", "Ignored"];

var blurbs = {"Police": "Police shootings, police brutality, Black Lives Matter", "Immigration": "Obama Immigartion Plan, Trump's ideas for immigrants", "FBI": "Clinton email investigation, Apple V/S FBI", "Environment": "Earth Day, Obama welcomes Paris Climate Agreement", "Justice": "Kinda overlaps with immigration and police brutality, but most news US Criminal Justice Policies", "Transit": "Transportation funding, transportation tax, Elon Musk wants to fix public transportation, UBER/Lyft VS Yellow Cabs"}; 

for (key in descriptives) {
	if (descriptives.hasOwnProperty(key)) {
		categories.push(key);
	}
}

categories.sort();

var currentCategory = 0;

$(document).ready(function() {
	for (var i = 0; i < stats.length; i++) {
		$('#label-wrapper').append('<div class="label">' + stats[i] + '</div>');
	}
	for (var i = 0; i < categories.length; i++) {
		$('#button-wrapper').append('<div class="button">' + categories[i] + '</div>');
	}
	for (var i = 0; i < stats.length; i++) {
		$('body').append('<div class="number"></div>');
	}


	$('.button').on('click', function() {
		currentCategory = categories.indexOf($(this).text());
		$('#heading').text(categories[currentCategory]);
		$('#blurb').text(blurbs[categories[currentCategory]]);
	});

	$('#heading').text(categories[0]);
	$('#blurb').text(blurbs[categories[0]]);

});


var next = [0, 0, 0, 0, 0];

function setup() {
	createCanvas(1024, 768);
	noStroke();
}

function draw() {
	clear();
	background(200);
	fillColor = 40;

	for (var i = 0; i < next.length; i++) {
		next[i] = lerp(next[i], -descriptives[categories[currentCategory]][stats[i]], .1);
	}

	$('.number').each(function(i) {
		$(this).text(-Math.ceil(next[i]));
		$(this).css('top', Math.ceil(580 + next[i] / 8) - 20);
		$(this).css('left', 100 + i * (40 + 100));
	});

	for (var i = 0; i < stats.length; i++) {
		fill(fillColor);
		fillColor += 25;
		rect(100 + i * (40 + 100), 580, 
			60, next[i] / 8);
	}

}