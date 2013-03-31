	var HAX = HAX || {};
	var info, stats, settings, readout, headsUp;

	var css = document.body.appendChild( document.createElement('style') );
	css.innerHTML =
		'body { font: bold 12pt monospace; margin: 0; /* overflow: hidden; */}' +
		'a { color: #44e;} ' +
		'h1, h2, h3 { margin: 0; }' +
		// 'input[type=range] { -webkit-appearance: none; background-color: silver; height: 20px; opacity: 0.5; }' +
		// 'input[type="range"]::-webkit-slider-thumb {-webkit-appearance: none; background-color: #666; opacity: 0.5; width: 10px; height: 26px; }'  +
		'h1 { margin: 0; height: 40px; min-width: 200px; padding: 0px; }' +
		'div.menu { background-color: #ddd; cursor: pointer; padding: 0 0 0 10px; position: absolute; top: 0; user-select: none; } ' +
		'div.sidebar { background-color: #eee;  padding: 5px 10px 20px 10px; position: absolute; top: 40px;;} ' +
	'';

	HAX = {
		objCount: 300,
		camType: 1, camFov: 40, speed: 30,
		camX: -90, camY: 105, camZ: 100,
		rotX: 0, rotY: 0, rotZ: 0,
		upX: 0, upY: 1, upZ: 0,
		separator: ',',
		lines: [],
	}

	HAX.city = {};
	HAX.city.app = doCity;

	HAX.geneva = {};
	HAX.geneva.app = doCity;
	HAX.geneva.colorField = 1;
	HAX.geneva.date = 1;
	HAX.geneva.direction = 7;
	HAX.geneva.directionString = 'A';
	HAX.geneva.fields = [ 'geneva-d1.csv', 'geneva-d2.csv', 'geneva-d3.csv', 'geneva-d4.csv', 'geneva-d5.csv', 'geneva-d6.csv', 'geneva-d7.csv' ];
	HAX.geneva.fieldsId = 0;
	HAX.geneva.fieldsTitles = [ 'Geneva Day 1', 'Geneva Day 2', 'Geneva Day 3', 'Geneva Day 4', 'Geneva Day 5', 'Geneva Day 6', 'Geneva Day 7' ];
	HAX.geneva.fname = HAX.geneva.fields[0];
	HAX.geneva.folder = '../../improved-csv/geneva/';
	HAX.geneva.lineCount = 20;
	HAX.geneva.trailEnd = 9;
	HAX.geneva.trailStart = 3;
	HAX.geneva.lineLength = 2;
	HAX.geneva.objCount = 300;
	HAX.geneva.speed = 10;
	HAX.geneva.time = 34;
	HAX.geneva.title = 'Geneva';
	HAX.geneva.x = 15;
	HAX.geneva.y = 1;
	HAX.geneva.z = 16;


	HAX.sanFrancisco = {};
	HAX.sanFrancisco.app = doCity;
	HAX.sanFrancisco.title = 'San Francisco';
	HAX.sanFrancisco.fields = [ 'sf_day1.csv', 'sf_day2.csv', 'sf_day3.csv', 'sf_day4.csv', 'sf_day5.csv', 'sf_day6.csv', 'sf_day7.csv' ];
	HAX.sanFrancisco.fieldsId = 0;
	HAX.sanFrancisco.fieldsTitles = [ 'San Francisco Day 1', 'San Francisco Day 2', 'San Francisco Day 3', 'San Francisco Day 4', 'San Francisco Day 5', 'San Francisco Day 6', 'San Francisco Day 7' ];
	HAX.sanFrancisco.fname = HAX.sanFrancisco.fields[0];
	HAX.sanFrancisco.folder = '../../improved-csv/sanFrancisco/';
	HAX.sanFrancisco.date = 8;
	HAX.sanFrancisco.time = 15;
	HAX.sanFrancisco.colorField = 9;
	HAX.sanFrancisco.direction = 13;
	HAX.sanFrancisco.directionString = '0';
	HAX.sanFrancisco.lineCount = 100;
	HAX.sanFrancisco.trailStart = 14;
	HAX.sanFrancisco.trailEnd = 14;
	HAX.sanFrancisco.lineLength = 10;
	HAX.sanFrancisco.x = 10;
	HAX.sanFrancisco.y = 9;
	HAX.sanFrancisco.z = 11;


	HAX.zurich = {};
	HAX.zurich.app = doCity;
	HAX.zurich.colorField = 1;
	HAX.zurich.fields = [ 'zurich-d1.csv', 'zurich-d2.csv', 'zurich-d3.csv', 'zurich-d4.csv', 'zurich-d5.csv', 'zurich-d6.csv', 'zurich-d7.csv' ]
	HAX.zurich.fieldsId = 0;
	HAX.zurich.fieldsTitles = [ 'Zurich Day 1', 'Zurich Day 2', 'Zurich Day 3', 'Zurich Day 4', 'Zurich Day 5', 'Zurich Day 6', 'Zurich Day 7' ];
	HAX.zurich.fname = HAX.zurich.fields[0];
	HAX.zurich.folder = '../../improved-csv/zurich/';
	HAX.zurich.title = 'Zurich';
	HAX.zurich.lineCount = 20;
	HAX.zurich.trailEnd = 5;
	HAX.zurich.trailStart = 5;
	HAX.zurich.lineLength = 2;
	HAX.zurich.objCount = 100;
	HAX.zurich.speed = 5;
	HAX.zurich.time = 6;
	HAX.zurich.x = 1;
	HAX.zurich.y = 3;
	HAX.zurich.z = 2;

	HAX.xAxis = {};
	// HAX.xAxis.fields = HAX.xAxis.fieldsTitles = [];
	HAX.xAxis.app = doXaxis;

	HAX.yAxis = {};
	//HAX.yAxis.fields = HAX.yAxis.fieldsTitles = [];
	HAX.yAxis.app = doYaxis;

	HAX.zAxis = {};
	//HAX.zAxis.fields =  HAX.zAxis.fieldsTitles = [];
	HAX.zAxis.app = doZaxis;

	HAX.replaySpeed = {};
	HAX.replaySpeed.title = 'adjust the speed';
	HAX.replaySpeed.min = 1;
	HAX.replaySpeed.max = 100;
	HAX.replaySpeed.step = 1;
	HAX.replaySpeed.value = 30;
	HAX.replaySpeed.onchange = updateReplay;

	HAX.fov = {};
	HAX.fov.title = 'adjust camera view angle';
	HAX.fov.min = 3;
	HAX.fov.max = 150;
	HAX.fov.step = 1;
	HAX.fov.value = 40;
	HAX.fov.onchange = updateFoV;

	HAX.playStart = {};
	HAX.playStart.title = 'record to start playing on';
	HAX.playStart.min = 1;
	HAX.playStart.max = dataLength;
	HAX.playStart.step = 1;
	HAX.playStart.value = 1;
	HAX.playStart.onchange = updatePlayStart;

	HAX.colorsBits = {};
	HAX.colorsBits.app = doColors;

	//HAX.linesTrail = {};
	//HAX.linesTrail.app = doLinesTrail;
	
	HAX.trailsStart = {};
	HAX.trailsStart.app = updateTrailsStart;

	HAX.trailsEnd = {};
	HAX.trailsEnd.app = updateTrailsEnd;	

	HAX.city = HAX.sanFrancisco;

	function initText() {
		var infoMenu = document.body.appendChild(document.createElement( 'div' ) );
		infoMenu.className = 'menu';
		infoMenu.style.cssText =  'left: 20px; ';
		infoMenu.innerHTML = '<h1 onclick="toggleBar( info )" >hAxis 4.1</h1>';

		info = document.body.appendChild(document.createElement( 'div' ) );
		info.className = 'sidebar';
		info.style.cssText = ' display: none; left: 20px; width: 280px; ' ;

		var statusMenu = document.body.appendChild(document.createElement( 'div' ) );
		statusMenu.className = 'menu';
		statusMenu.style.cssText = 'left: 350px; ';
		statusMenu.innerHTML = '<h1 onclick="toggleBar( stats )" >Status</h1>';

		stats = document.body.appendChild(document.createElement( 'div' ) );
		stats.className = 'sidebar';
		stats.style.cssText = 'display: none; left: 350px; width: 500px;' ;

		var settingsMenu = document.body.appendChild(document.createElement( 'div' ) );
		settingsMenu.className = 'menu';
		settingsMenu.style.cssText = 'right: 360px; ' ;
		settingsMenu.innerHTML = '<h1 onclick="toggleBar( settings )" >Settings</h1>';

		settings = document.body.appendChild(document.createElement( 'div' ) );
		settings.className = 'sidebar';
		settings.style.cssText = 'display: none; right: 360px; width: 300px;' ;

		var readoutMenu = document.body.appendChild(document.createElement( 'div' ) );
		readoutMenu.className = 'menu';
		readoutMenu.style.cssText = 'right: 20px; ' ;
		readoutMenu.innerHTML = '<h1 onclick="toggleBar( readout )" >Readout</h1>';

		readout = document.body.appendChild(document.createElement( 'div' ) );
		readout.className = 'sidebar';
		readout.style.cssText = 'display: none;  height: 90%; overflow-y: hidden; right: 20px; width: 300px;' ;

		headsUp = document.body.appendChild( document.createElement( 'div' ) );
		headsUp.style.cssText = 'background-color: #ddd; display: none; left: 50px; opacity: 0.85; padding: 5px 5px 10px 5px; ' +
			'position: absolute; text-align: left; width: 300px; word-wrap:break-word;';
		headsUp.innerHTML = '';

		info.innerHTML =
			'<p><i>2013-03-19 ~ still pre-release</i></p>' +
			'<p>Made by the <a href="http://www.urdacha.info" target="_blank">Urdacha</a> team for the:</p>' +
			'<p><a href="http://urbanprototyping.org/prototype/challenges/urban-data-challenge-zurich-sf-geneva/" target="_blank">Urban Data Challenge</a></p>' +
			'<p>Watch the numeric data come alive as animated objects in 3D.</p>' +
			'<p>Use your pointing device to update the view.</p>' +
			'<ul><li><i>Rotate</i></b>: Left button / 1 finger down</li><li><b><i>Zoom</i></b>: Wheel / 2 fingers</li></ul>' +
			// '<b><i>Pan</i></b>: Right button/2 fingers down</p>' +
			'<p>hAxis = hackathon + Axis</p>' +

			'<p><a href="https://github.com/jaanga/urdacha/wiki/hAxis-Issues-and-Wish-List" target="_blank">Wish List</a><br>' +
			'<a href="https://github.com/jaanga/urdacha/issues" target="_blank">Report issues</a></p>' +

			'<p><button onclick="HAX.controls = new THREE.TrackballControls( HAX.camera, HAX.renderer.domElement ); HAX.camera.position.set(-90, 105, 100); " >reset the view</button></p>' +
			'<p><small>Copyright &copy; 2013 Urdacha authors<br>License: MIT License</small></p>' +
		'';

		stats.innerHTML =
			'<p>Choose a file over on the right sidebar. Updates will appear here...</p>' +
			'<p>The default view is for testing purposes. It displays latitude longitude and routes. ' +
			'Depending on how you set the view, you should vaguely be able to see a distorted map of San Francisco.</p>' +
		'';

		settings.innerHTML =
				'<h3>Load City Data</h3>' +
				'<small>Select a day to view. Allow 15/20 seconds for data to appear first time.</small>' +
				'<hr>' +
				'<div id="settings2">';
		'';

		readout.innerHTML = '' +
			'<div id="readout1" style="height: 30%; margin: 0 0 20px 0; outline: 1px #aaa solid; overflow-y: scroll;" ></div>' +
			'<div id="readout2" style="height: 30%; margin: 0 0 20px 0; outline: 1px #aaa solid; overflow-y: scroll;" ></div>' +
			'<div id="readout3" style="height: 30%; margin: 0 0 20px 0; outline: 1px #aaa solid; overflow-y: scroll;" ></div>' +
		'';
	}

	function updateSbr() {
		settings2.innerHTML = '';

		var table = settings2.appendChild( document.createElement( 'table' ) );
		table.style.cssText = 'width: 100%;'

		var tr = table.appendChild( document.createElement( 'tr' ) );
		var td = tr.appendChild( document.createElement( 'td' ) );
		td.innerHTML = 'Geneva:';
		td = tr.appendChild( document.createElement( 'td' ) );
		buildSelect2( HAX.geneva, HAX.geneva.fieldsId , td);

		tr = table.appendChild( document.createElement( 'tr' ) );
		td = tr.appendChild( document.createElement( 'td' ) );
		td.innerHTML = 'San Francisco:';
		td = tr.appendChild( document.createElement( 'td' ) );
		buildSelect2( HAX.sanFrancisco, HAX.sanFrancisco.fieldsId, td);

		tr = table.appendChild( document.createElement( 'tr' ) );
		td = tr.appendChild( document.createElement( 'td' ) );
		td.innerHTML = 'Zurich:';
		td = tr.appendChild( document.createElement( 'td' ) );
		buildSelect2( HAX.zurich, HAX.zurich.fieldsId, td);

		var h3 = settings2.appendChild( document.createElement( 'h3' ) );
		h3.innerHTML += 'Player Manager';

		var button = settings2.appendChild( document.createElement( 'button' ) );
		button.onclick = togglePlay;
		button.innerHTML = 'toggle play/pause';


		table = settings2.appendChild( document.createElement( 'table' ) );
		tr = table.appendChild( document.createElement( 'tr' ) );
		td = tr.appendChild( document.createElement( 'td' ) );
		td.innerHTML = 'Replay speed:';
		td = tr.appendChild( document.createElement( 'td' ) );
		buildRange2( td, HAX.replaySpeed);

		// function updateFoV() {}
		tr = table.appendChild( document.createElement( 'tr' ) );
		td = tr.appendChild( document.createElement( 'td' ) );
		td.innerHTML = 'Field of view:';
		td = tr.appendChild( document.createElement( 'td' ) );
		buildRange2( td, HAX.fov );

		// function updatePlayStart() {}

		tr = table.appendChild( document.createElement( 'tr' ) );
		td = tr.appendChild( document.createElement( 'td' ) );
		td.innerHTML = 'Start line:';
		td = tr.appendChild( document.createElement( 'td' ) );
		buildRange2( td, HAX.playStart );

		// table = settings2.appendChild( document.createElement( 'table' ) );
		tr = table.appendChild( document.createElement( 'tr' ) );
		td = tr.appendChild( document.createElement( 'td' ) );
		td.innerHTML = '&nbsp;';

		HAX.xAxis.fields = HAX.xAxis.fieldsTitles = data[0];

		HAX.yAxis.fields = HAX.yAxis.fieldsTitles = data[0];

		HAX.zAxis.fields =  HAX.zAxis.fieldsTitles = data[0];

		tr = table.appendChild( document.createElement( 'tr' ) );
		td = tr.appendChild( document.createElement( 'td' ) );
		td.style.cssText = 'color: red;' ;
		td.innerHTML = 'X-axis:';
		td = tr.appendChild( document.createElement( 'td' ) );
		buildSelect2( HAX.xAxis, HAX.x, td );

		tr = table.appendChild( document.createElement( 'tr' ) );
		td = tr.appendChild( document.createElement( 'td' ) );
		td.style.cssText = 'color: green;' ;
		td.innerHTML = 'Y-axis:';
		td = tr.appendChild( document.createElement( 'td' ) );
		buildSelect2( HAX.yAxis, HAX.y, td );

		tr = table.appendChild( document.createElement( 'tr' ) );
		td = tr.appendChild( document.createElement( 'td' ) );
		td.style.cssText = 'color: blue;' ;
		td.innerHTML = 'Z-axis:';
		td = tr.appendChild( document.createElement( 'td' ) );
		buildSelect2( HAX.zAxis, HAX.z, td );

		tr = table.appendChild( document.createElement( 'tr' ) );
		td = tr.appendChild( document.createElement( 'td' ) );
		td.innerHTML = '&nbsp;';

		HAX.colorsBits.fields =  HAX.colorsBits.fieldsTitles = data[ 0 ];

		tr = table.appendChild( document.createElement( 'tr' ) );
		td = tr.appendChild( document.createElement( 'td' ) );
		td.innerHTML = 'Colors:';
		td = tr.appendChild( document.createElement( 'td' ) );
		buildSelect2( HAX.colorsBits, HAX.colorField, td );

		HAX.trailsStart.fields =  HAX.trailsStart.fieldsTitles = data[ 0 ];

		tr = table.appendChild( document.createElement( 'tr' ) );
		td = tr.appendChild( document.createElement( 'td' ) );
		td.innerHTML = 'Trail start:';
		td = tr.appendChild( document.createElement( 'td' ) );
		buildSelect2( HAX.trailsStart, HAX.trailStart, td );
		
		HAX.trailsEnd.fields =  HAX.trailsEnd.fieldsTitles = data[ 0 ];

		tr = table.appendChild( document.createElement( 'tr' ) );
		td = tr.appendChild( document.createElement( 'td' ) );
		td.innerHTML = 'Trail end:';
		td = tr.appendChild( document.createElement( 'td' ) );
		buildSelect2( HAX.trailsEnd, HAX.trailEnd, td );

		tr = table.appendChild( document.createElement( 'tr' ) );
		td = tr.appendChild( document.createElement( 'td' ) );
		td.innerHTML = '&nbsp;';

		tr = table.appendChild( document.createElement( 'tr' ) );
		td = tr.appendChild( document.createElement( 'td' ) );
		
		td.innerHTML = '<a id="permalink" title="Copy this link." href="#" target="_blank">Permalink</a><br>';
		td = tr.appendChild( document.createElement( 'td' ) );
		td.innerHTML = '<a href="" onclick="resetPermalink" >Reset permalink</a>';
	}

	function toggleBar( sidebar ) {
		if ( sidebar.style.display === '' ) { sidebar.style.display = 'none'; } else { sidebar.style.display = ''; }
	}

	function initCity( id ) {
		HAX.city.fieldsId = id;
		HAX.folder = HAX.city.folder;
		HAX.fname = HAX.city.fields[ id ];
		HAX.title = HAX.city.fieldsTitles[ id ];

		HAX.x = HAX.city.x;
		HAX.y = HAX.city.y;
		HAX.z = HAX.city.z;
		HAX.date = HAX.city.date;
		HAX.time = HAX.city.time;
		HAX.colorField = HAX.city.colorField;
		HAX.direction = HAX.city.direction;
		HAX.directionString = HAX.city.directionString;
		HAX.lineCount = HAX.city.lineCount;
		HAX.trailStart = HAX.city.trailStart;
		HAX.trailEnd = HAX.city.trailEnd;
		HAX.lineLength = HAX.city.lineLength;
		loadSF_Day();
	}

	function doCity( event) {
// console.log('city', event, event.srcElement.selectedIndex, event.srcElement.obj)
		HAX.city = event.srcElement.obj;
		var id = event.srcElement.selectedIndex;
		initCity( id );
	}
	
	function updateReplay() {
		HAX.speed = event.srcElement.value;
	}	

	function updateFoV( event) {
// console.log( event );
		HAX.camFov = event.srcElement.value;
		HAX.camera = new THREE.PerspectiveCamera( HAX.camFov, window.innerWidth / window.innerHeight, 1, 10000 );
		HAX.camera.position.set(-90, 105, 100);
		HAX.controls = new THREE.TrackballControls( HAX.camera, HAX.renderer.domElement );
	}
	
var dataCount, dataLength = 70000;

	function updatePlayStart() {
		dataCount = event.srcElement.value;
		HAX.playStart.max = dataLength - 100;
	}	
	
	function doXaxis( event ) {
		HAX.x = event.srcElement.selectedIndex;
		buildReport();
	}

	function doYaxis( event ) {
		HAX.y = event.srcElement.selectedIndex;
		buildReport();
	}

	function doZaxis( event ) {
		HAX.z = event.srcElement.selectedIndex;
		buildReport();
	}
	
	function doColors( event ) {
//console.log('docol', event );		
		HAX.colorField = event.srcElement.selectedIndex;
		buildReport();
	}	
	
	function updateTrailsStart( event ) {
		HAX.trailStart = event.srcElement.selectedIndex;
		buildReport();
	}
	
	function updateTrailsEnd( event ) {
		HAX.trailEnd = event.srcElement.selectedIndex;
		buildReport();
	}

	function buildSelect2( obj, selected, element) {
		var select = element.appendChild( document.createElement( 'select' ) );
		select.obj = obj;
		select.onchange = obj.app;
		for (var option, len = obj.fields.length, i = 0; i < len; i++) {
			option = select.appendChild( document.createElement( 'option' ) );
			option.innerText = obj.fieldsTitles[i];
			if (i == selected ) { option.selected = true ; }
		}
	}

	function buildRange2( element, obj) {
		var range = element.appendChild( document.createElement( 'input' ) );
		range.type = 'range';
		range.title = obj.title ;
		range.min = obj.min;
		range.max = obj.max;
		range.step = obj.step;
		range.value = obj.value;
		range.onchange = obj.onchange;
		range.style.cssText = '-webkit-appearance: none; background-color: silver; height: 10px; opacity: 0.5; ';
	}

	function sortTable( table, column, sort ){
		var store = [];
		for ( var i = 0, len = table.rows.length; i < len; i++ ){
			var row = table.rows[i];
			var sortnr = parseFloat(row.cells[ column ].textContent || row.cells[ column ].innerText);
			if(!isNaN(sortnr)) store.push([sortnr, row]);
		}
		if (sort === 0) {
			store.sort(function(x,y){
				return y[0] - x[0] ;
			});
		} else {
			store.sort(function(x,y){
				return x[0] - y[0];
			});
		}
		for(var i=0, len=store.length; i < len; i++){
			table.appendChild(store[i][1]);
		}
		store = null;
	}