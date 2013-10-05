var list = {
// avoid using -,/_
// use same capitalization

	'1 Home': {
		'Overview': [
			[ 'Home Page', 'overview/index'],
			[ 'Progress Reports', 'overview/progress reports'],
			[ 'Notes Regarding VBZ Data Set', 'overview/notes regarding vbz data set'],
			[ 'Contributors', 'overview/Contributors'],
			[ 'License', 'overview/License']
		]
	},	
	'2 hAxis': {
		'Urdacha competition entry': [
			[ 'Read Me', 'haxis/Read Me'],
			[ 'hAxis r4', 'haxis/r4/index'],
			[ 'hAxis r3', 'haxis/r3/haxis'],
			[ 'haxis r2', 'haxis/haxis-r2'],
			[ 'hAxis r1', 'haxis/haxis-r1-static'],
		]
	},
	
	'3 Improved CSV': {
		'View the actual files hAxis and other apps display': [
			[ 'Read Me', 'improved-csv/Read Me'],
			[ 'San Francisco', 'improved-csv/sanFrancisco'],
			[ 'Geneva', 'improved-csv/geneva'],
			[ 'Zurich', 'improved-csv/zurich'],

		]
	},

	'4 Exploratory Data Analysis': {
		'An informal review of what hAxis can help you see': [
			[ 'Read Me', 'data-wrangler/Read Me'],
			[ 'TA ~ Day #3', 'data-wrangler/theo-03'],
			[ 'TA ~ Day #2', 'data-wrangler/theo-02'],
			[ 'TA ~ Day #1', 'data-wrangler/theo-01'],
		]
	},
	
	'5 flatLand': {
		'Prelimary Urdacha project using Nextbus data': [
			[ 'Read Me', 'flatland/Read Me'],
			[ 'flatLand r2', 'flatland/flatland'],
			[ 'flatland r1', 'flatland/flatland-touch'],
		]		
	},	
	
	'6 Globes': {
		'A fun side project - another perspective and another mode': [
			[ 'Read Me', 'globe-demos/Read Me'],
			[ 'Globe #1', 'globe-demos/globe01/globe-plus-planes-curved'],
			[ 'Globe #2', 'globe-demos/globe02/globe-black-shaders-stars-flags'],
			[ 'Globe #3', 'globe-demos/globe03-planes/globe-black-shaders-stars-planes'],
			[ 'Globe #4', 'globe-demos/globe04-lookat/globe04-lookat'],
		]		
	},
	
	'7 CSV tools': {
		'Early tools for data wrangling': [
			[ 'Read Me', 'load-csv/Read Me'],
			[ 'load-csv', 'load-csv/load-csv'],
			[ 'load-csv-api', 'load-csv/load-csv-api'],
			[ 'load-csv-build-map', 'load-csv/load-csv-build-map'],
			[ 'load-csv-lat-lon', 'load-csv/load-csv-lat-lon'],
		]		
	},
};	


var pages = {};

for ( var section in list ) {
	pages[ section ] = {};
	for ( var category in list[ section ] ) {
		pages[ section ][ category ] = {};
		for ( var i = 0; i < list[ section ][ category ].length; i ++ ) {
			var page = list[ section ][ category ][ i ];
			pages[ section ][ category ][ page[ 0 ] ] = page[ 1 ];
		}
	}
}
// console.log('list: ', list, pages );
