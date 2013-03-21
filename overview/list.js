var list = {
// avoid using -,/_
// use same capitalization

	'1 Home': {
		'Overview': [
			[ 'Home Page', 'overview/index'],
			[ 'Contributors', 'overview/Contributors'],
			[ 'License', 'overview/License']
		]
	},
	
	'2 Improved CSV': {
		'overview': [
			[ 'Read Me', 'improved-csv/Read Me'],
			[ 'San Francisco', 'improved-csv/sanFrancisco'],
			[ 'Geneva', 'improved-csv/geneva'],
			[ 'Zurich', 'improved-csv/zurich'],
		],
	},

	'3 Data Wrangle': {
		'The actual competition entry is here...': [
			[ 'Read Me', 'data-wrangler/Read Me'],
			[ 'TA ~ Day #3', 'data-wrangler/theo-03'],
			[ 'TA ~ Day #2', 'data-wrangler/theo-02'],
			[ 'TA ~ Day #1', 'data-wrangler/theo-01'],
		],
	},	
	'4 hAxis': {
		'CSV in 3D app': [
			[ 'Read Me', 'haxis/Read Me'],
			[ 'hAxis r4', 'haxis/r4/index'],
			[ 'hAxis r3', 'haxis/r3/haxis'],
			[ 'haxis r2', 'haxis/haxis-r2'],
			[ 'hAxis r1', 'haxis/haxis-r1-static'],
		],
	},
	
	'5 flatLand': {
		'a Nextbus app': [
			[ 'Read Me', 'flatland/Read Me'],
			[ 'flatLand r2', 'flatland/'],
			[ 'flatland r1', 'flatland/'],
		]		
	},	
	
	'6 Globes': {
		'a global view': [
			[ 'Read Me', 'globe-demos/Read Me'],
			[ 'Globe #1', 'globe-demos/globe01/globe-plus-planes-curved'],
			[ 'Globe #2', 'globe-demos/globe02/globe-black-shaders-stars-flags'],
			[ 'Globe #3', 'globe-demos/globe03-planes/globe-black-shaders-stars-planes'],
			[ 'Globe #4', 'globe-demos/globe04-lookat/globe04-lookat'],
		]		
	},
	
	'7 load-CSV': {
		'data look/see': [
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