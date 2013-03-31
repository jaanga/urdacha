	var sidebarLeft;
	var statusBar;
	var sidebarRight, sidebarRightBody;
	var headsUp;

	var sbr = function(){
		var css = document.body.appendChild( document.createElement('style') );
		css.innerHTML +=
			'body {background-color: transparent; font: normal 12pt monospace; margin: 0; overflow: hidden;}' +

			'a { color: #44e;} ' +

			'button, input[type=range] { -webkit-appearance: none; background-color: silver; height: 20px; opacity: 0.5; }' +

			'input[type="range"]::-webkit-slider-thumb {-webkit-appearance: none; background-color: #666; opacity: 0.5; width: 10px; height: 26px; }'  +

			'h1, h2, h3 { margin: 0; }' +

			'#sbl { background-color: #eee; left: 30px; margin: 10px; opacity: 0.8; outline: 1px solid; padding: 10px 10px 0 10px; position: absolute; ' +
				'text-align: left; top: 100px; max-width: 330px;}' +

			'#stb { background-color: #eee; left: 600px; margin: 10px auto; opacity: 0.8; outline: 1px solid; padding: 10px; position: absolute; ' +
				'text-align: left; top: 20px; width: 500px;}' +

			'#sbr { background-color: #eee; height: 90%; margin: 10px; opacity: 0.8; outline: 1px solid; padding: 10px; position: absolute; ' +
				'right: 20px; text-align: left; top: 40px; width: 350px;}' +

			'#sbrBody {  margin: 20px 0; overflow-y: scroll; }' +

			'#sbrBdy h3 { margin: 10px 0; }' +

			'div.control { color: #aaa; cursor: hand; cursor: pointer; float: right; }' ;
	}();


	var bars = function() {
		sidebarLeft = document.body.appendChild( document.createElement( 'div' ) );
		sidebarLeft.id = 'sbl';

		statusBar = document.body.appendChild( document.createElement( 'div' ) );
		statusBar.id = 'stb';

		sidebarRight = document.body.appendChild( document.createElement( 'div' ) );
		sidebarRight.id = 'sbr';

		headsUp = document.createElement( 'div' );
		document.body.appendChild( headsUp );
		headsUp.style.cssText = 'background-color: #ddd; display: none; left: 50px; opacity: 0.85; padding: 5px 5px 10px 5px; ' +
			'position: absolute; text-align: left; width: 300px; word-wrap:break-word;';
		headsUp.innerHTML = '<h1>Stuff</h1>';
	}();

	function toggleBar( sidebar ) {
		if ( sidebar.style.display === '' ) {
			sidebar.style.display = 'none';
		} else {
			sidebar.style.display = '';
		}
	}

	function toggleStatusBar() {
		if ( toggled.style.display === '' ) {
			toggle.innerText = '[+]';
			toggled.style.display = 'none';
		} else {
			toggle.innerText = '[-]';
			toggled.style.display = '';
		}
	}
	
	function buildSelect( fields, selected ) {
		var htm = '';
		sel = parseInt(selected);
		for ( var i = 0, len = fields.length - 1; i < len; i++  ) {
// console.log( i, fields, selected)		
			if ( i !== sel) {
				htm += '<option>' + (i + 1) + ' - ' + fields[i] + '</option>';
			} else {
				htm += '<option selected="selected" >' + (i + 1) + ' - ' + fields[i] + '</option>';
			}
		}
		htm +='<\/select>';
		
		return htm;
	}
	
	function initText() {
		sidebarLeft.innerHTML =
			'<div class="control" onclick="toggleBar( sidebarLeft )">[X]</div>' +
			'<h1>hAxis r4.1</h1>' +
			'<p><i>2013-03-19 ~ still pre-release</i></p>' +
			'<p>Made by the <a href="http://www.urdacha.info" target="_blank">Urdacha</a> team for the:</p>' +
			'<p><a href="http://urbanprototyping.org/prototype/challenges/urban-data-challenge-zurich-sf-geneva/" target="_blank">Urban Data Challenge</a></p>' +
			'<p>Watch the numeric data come alive as animated objects in 3D.</p>' +
			'<p>Use your pointing device to update the view.</p>' +
			'<p><b><i>Rotate</i></b>: Left button/1 finger down<br><b><i>Zoom</i></b>: Wheel/2 fingers<br>' +
	// '<b><i>Pan</i></b>: Right button/2 fingers down</p>' +
			'<p>hAxis = hackathon + Axis</p>' +
			
			'<p><a href="https://github.com/jaanga/urdacha/wiki/hAxis-Issues-and-Wish-List" target="_blank">Wish List</a><br>' +
			'<a href="https://github.com/jaanga/urdacha/issues" target="_blank">Report issues</a></p>' +
			
			'<p><button onclick="HAX.controls = new THREE.TrackballControls( HAX.camera, HAX.renderer.domElement ); HAX.camera.position.set(-90, 105, 100); " >reset the view</button></p>' +
			'<p><small>Copyright &copy; 2013 Urdacha authors<br>License: MIT License</small></p>' +
		'';

		statusBar.innerHTML =
			'<div id="toggle" class="control" onclick="toggleStatusBar()">[-]</div>' +
			'<div class="control" onclick="toggleBar( sidebarLeft ); toggleBar( sidebarRight );">[<span style="font-size: small; vertical-align: text-top; ">[]</span>] &nbsp;</div>' +
			'<h2>hAxis</h2>' +
			'<div id="toggled">' +
				'<p>Choose a file over on the right sidebar. Updates will appear here...</p>' +
				'<p>The default view is for testing purposes. It displays latitude longitude and routes. ' +
				'Depending on how you set the view, you should vaguely be able to see a distorted map of San Francisco.</p>' +
			'</div>';
		HAX.updates = document.getElementById('toggled');


		sidebarRight.innerHTML =
			'<div class="control" onclick="toggleBar( sidebarRight )">[X]</div>' +
			'<h2>Control Panel</h2>' +
			'<hr>' +
			'<div>' + 
				'<h3>Load City Data</h3>' +
				'For overview:<br><small>Click a link below. Prepare to wait 15/20 seconds for data to download from server.</small>' +
				'<table style="margin: 0 0 10px 0" ><tr><td width="150px">' +
				'<a href="#" onclick="doIt(1); " >SF Day 1</a><br>' + 
				'<a href="#" onclick="doIt(2); " >SF Day 2</a><br>' + 
				'<a href="#" onclick="doIt(3); " >SF Day 3</a><br>' + 
				'<a href="#" onclick="doIt(4); " >SF Day 4</a><br>' + 
				'<a href="#" onclick="doIt(9); " >Geneva Day 1</a>' + 
				'</td><td valign="top">' +
				'<a href="#" onclick="doIt(5); " >SF Day 5</a><br>' + 
				'<a href="#" onclick="doIt(6); " >SF Day 6</a><br>' + 
				'<a href="#" onclick="doIt(7); " >SF Day 7</a><br>' + 
				'<a href="#" onclick="doIt(8); " >SF Day 71 ~ r vs s</a><br>' + 
				'</td></tr></table>' +				
				/*
				'For research:<div style="font-size: small; margin: 0 0 5px 0; padding: 0;">' +
				'1. <a href="https://github.com/jaanga/urdacha/tree/gh-pages/improved-csv" target="_blank">Download files</a> ' +
				'2. Select type 3. Choose file</div>' +
				'<input type="radio" onchange="HAX.city = this.id;" name="city" id="geneva">Geneva type<br> ' +
				'<input type="radio" onchange="HAX.city = this.id;" name="city" id="sanFrancisco">San Francisco type<br> ' +
				'<input type="radio" onchange="HAX.city = this.id; console.log(HAX.city);" name="city" id="zurich">Zurich type<br>' +
				'<input type="file" id="files" name="file" /></p>' +
				*/
			'</div><hr>' +
			'<div id="sbrBody">' +
			'</div>	' +		
			'<p><a id="permalink" title="Copy this link." href="#" target="_blank">Permalink</a> &nbsp; <a href="" onclick="resetPermalink" >Reset permalnk</a></p>';
		'';
		
		if (HAX.bars == 0 ) {
			toggleBar( sidebarLeft );
			toggleBar( sidebarRight );
			toggleStatusBar(0);
		}
	}
		function doIt( item ) {
			HAX.directionString = '0';
			if (item === 1) {
				HAX.fname = 'sf_day1.csv';
				HAX.title = 'San Francisco Day 1';
			} else if (item === 2) {
				HAX.fname = 'sf_day2.csv';
				HAX.title = 'San Francisco Day 2';
				HAX.bars = 0;
			} else if (item === 3) {
				HAX.fname = 'sf_day3.csv';
				HAX.title = 'San Francisco Day 3';
			} else if (item === 4) {
				HAX.fname = 'sf_day4.csv';
				HAX.title = 'San Francisco Day 4';
			} else if (item === 5) {
				HAX.fname = 'sf_day5.csv';
				HAX.title = 'San Francisco Day 5';
			} else if (item === 6) {
				HAX.fname = 'sf_day6.csv';
				HAX.title = 'San Francisco Day 6';
			} else if (item === 7) {
				HAX.fname = 'sf_day7.csv';
				HAX.title = 'San Francisco Day 7';
			} else if (item === 8) {
				HAX.fname = 'sf_realtime_vs_schdeuled_day1.csv';
				HAX.title = 'San Francisco Day 1 ~ realtime vs scheduled';
				HAX.date = 2;
				HAX.time = 15;
				HAX.speed = 10;
				HAX.direction = 11;
				HAX.x = 13;
				HAX.y = 6;
				HAX.z = 14;
				HAX.color = 6;
				HAX.objCount = 100;
				HAX.lineField = 7;
				HAX.lineEnd = 7;
				HAX.lineCount = 20;
				HAX.lineLength = 2;
			} else if ( item === 9 ) {
				HAX.folder = '../../TPG/';
				HAX.fname = 'TPG_passenger_count_day1.csv';
				HAX.title = 'Geneva Day 1';
				HAX.date = 1;
				HAX.time = 34;
				HAX.speed = 10;
				HAX.direction = 7;
				HAX.directionString = 'A';
				HAX.x = 13;
				HAX.y = 3;
				HAX.z = 14;
				HAX.color = 2;
				HAX.objCount = 100;
				HAX.lineField = 5;
				HAX.lineEnd = 5;
				HAX.lineCount = 20;
				HAX.lineLength = 2;				
			}
			
			loadSF_Day();
		}

	function updateSbr( fields, h) {
	
		var htm2 = '<h3>Player Manager</h3>' +
			'<p><button onclick="togglePlay()" >Toggle Play/Pause</button></p>' +
			'Replay Speed: &nbsp;<input title="number of lines to read per frame" style="width: 180px;" type="range" min="2" max="100" ' +
				'onchange="HAX.speed=this.value; haxisIt();" step="1" value="' + HAX.speed + '" ><br>' +
			'Field of View: <input title="higher number = wider view. May help you to see inside the matrix." ' +
				'style="width: 180px;" type="range" min="10" max="150" onchange="setFov( this.value ); haxisIt();" step="1" value="' + HAX.camFov + '" ><br>' +
			'Choose Record: <input title="Set the current data line" style="width: 180px;" type="range" min="0" max="' + dataLength + 
				'" onchange="dataCount=this.value; haxisIt();" step="500" value="' + dataCount + '" ><br>' +

			'<br><scan style="font-weight: 600; color: red;">X-axis: </scan><select onchange="HAX.x = this.options.selectedIndex; buildReport(); updateUrlHash(); " title="select the X-axis" >' +
				buildSelect( fields, HAX.x ) +
			'<br><scan style="font-weight: 600; color: green;">Y-axis: </scan><select onchange="HAX.y = this.options.selectedIndex; buildReport(); updateUrlHash(); " title="select the Y-axis" ><br>' +
				buildSelect( fields, HAX.y ) +
			'<br><scan style="font-weight: 600; color: blue;">Z-axis: </scan><select onchange="HAX.z = this.options.selectedIndex; buildReport();  updateUrlHash(); " title="select the Z-axis" ><br>' +
				buildSelect( fields, HAX.z ) + '<br>' +
			'<br>Colors: &nbsp; &nbsp; <select onchange="HAX.color = this.options.selectedIndex; buildReport(); updateUrlHash(); " title="select the filed that the colors indicate" ><br>' +
				buildSelect( fields, HAX.color ) + '<br>' +
			'Lines: &nbsp; &nbsp; &nbsp;<select onchange="HAX.lineField = this.options.selectedIndex; buildReport(); updateUrlHash(); " title="select the field that lines connect" ><br>' +
				buildSelect( fields, HAX.lineField ) + '<br>' +
			'Disconnect: <select onchange="HAX.lineEnd = this.options.selectedIndex; buildReport(); updateUrlHash(); " title="select the field that causes lines to disconnect" ><br>' +
				buildSelect( fields, HAX.lineEnd ) + '<br>' +
		'';
		sbrBody.innerHTML = htm2;
	}
	