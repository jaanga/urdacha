var list = {
// avoid using -,/_
// use same capitalization

	'1 Home': {
		'Overview': [
			[ 'Home Page', 'overview/index'],
			[ 'Read Me', 'overview/Read Me'],
			[ 'Credits', 'overview/Credits'],
			[ 'License', 'overview/License']
		]
	},
	
	'2 hAxis': {
		'API Overview': [
			[ 'Read Me', '2-Algesurf/1-Overview/Read Me'],
			[ 'Credits', '2-Algesurf/1-Overview/Credits'],
			[ 'Builder', '2-Algesurf/1-Overview/Builder'],
			[ 'Player - sequence', '2-Algesurf/1-Overview/Player'],
			[ 'Player - single', '2-Algesurf/1-Overview/Player','?title=stemkoski&play=10&spin=0'],
			[ 'Multiple Viewport Demo', '2-Algesurf/1-Overview/Multiple Viewport Demo']
		],
	},
	
	'3 flatLand': {
		'Overview': [
			[ 'Read Me', '3-Urdacha/overview/readme'],
			[ 'Urdacha', '3-Urdacha/overview/urdacha'],
			[ 'hAxis r3', '3-Urdacha/overview/haxis-r3'],
		]		
	},	
	
	'4 Globes': {
		'Overview': [
			[ 'Read Me', '4-Brain-of-Richard/overview/readme'],
			[ 'The App', '4-Brain-of-Richard/overview/theapp']
		]		
	},
	
	'5 load-CSV': {
		'load-csv': [
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