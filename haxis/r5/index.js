<!doctype html>
<html lang='en'>
<head>
<title>xhaxis r5</title>
<meta charset='utf-8'>
<meta name='viewport' content='width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0'>
</head>
<body>

<script src='http://mrdoob.github.com/three.js/examples/js/Detector.js'></script>
<script src='http://mrdoob.github.com/three.js/build/three.min.js'></script>
<script src='http://mrdoob.github.com/three.js/examples/js/controls/TrackballControls.js'></script>
<script src='http://mrdoob.github.com/three.js/examples/js/libs/stats.min.js'></script>
<!--
<script src='../../three.js/examples/js/Detector.js'></script>
<script src='../../three.js/build/three.min.js'></script>
<script src='../../three.js/examples/js/controls/TrackballControls.js'></script>
<script src='../../three.js/examples/js/libs/stats.min.js'></script>
-->
<script src='sidebars.js'></script>
<script>
	if ( ! Detector.webgl ) { Detector.addGetWebGLMessage(); }

	init();
	animate();

	function init() {
		
		readHash();
		
		if ( ! Detector.webgl ) {
			HAX.renderer = new THREE.Canvas.renderer( { antialias: true } );
		} else {
			HAX.renderer = new THREE.WebGLRenderer( { antialias: true } );
		}

		HAX.renderer.setSize( window.innerWidth, window.innerHeight );
		document.body.appendChild( HAX.renderer.domElement );
		HAX.scene = new THREE.Scene();
		
		HAX.camera = new THREE.PerspectiveCamera( HAX.camFov, window.innerWidth / window.innerHeight, 1, 1000 );
		HAX.camera.position.set( HAX.camX, HAX.camY, HAX.camZ);
		HAX.camera.up.set( HAX.upX, HAX.upY, HAX.upZ );
		HAX.camera.rotation.set( HAX.rotX, HAX.rotY, HAX.rotZ );
		HAX.controls = new THREE.TrackballControls( HAX.camera, HAX.renderer.domElement );
		HAX.controls.minDistance = 3;
		HAX.controls.maxDistance = 300;
		HAX.controls.noPan = true;
		HAX.controls.zoomSpeed = 0.5;
		HAX.controls.dynamicDampingFactor = 0.9;			

		var light = new THREE.DirectionalLight( 0xffffff, 2 );
		light.position.set( 1, 1, 1 ).normalize();
		HAX.scene.add( light );

		light = new THREE.DirectionalLight( 0xffffff, 1.3 );
		light.position.set( -1, -1, -1 ).normalize();
		HAX.scene.add( light );

		light = new THREE.AmbientLight( 0xffffff);
		light.color.setHSL( 0.1, 0.5, 0.3 );
		HAX.scene.add( light );
		
		window.addEventListener( 'resize', onWindowResize, false );
		document.addEventListener( 'mouseup', onDocumentMouseUp, false );
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );		

		initText(); // in sidebar.js
		
		HAX.stats = new Stats();
		HAX.stats.domElement.style.cssText = 'position: absolute;right: 0; top: 0px; z-index: 100; ';
		info.appendChild( HAX.stats.domElement );		
		
		toggleBar( info );
	}

	function v( x, y, z) { return new THREE.Vector3( x, y, z ); }
	
	function loadCSV() {
		HAX.dataPlay = false;
		HAX.xmlhttp = new XMLHttpRequest();
		HAX.xmlhttp.open( 'GET', HAX.city.folder + HAX.city.fname, true );
		HAX.xmlhttp.onreadystatechange = callbackCSV;
		HAX.xmlhttp.send( null );
		callbackCount = 0;
	}
	
	function callbackCSV() {
		if ( HAX.xmlhttp.readyState == 4  ) {
			var dataLines = HAX.xmlhttp.responseText;
			dataLines = dataLines.split(/\r\n|\n/);
			// dataLines[0] = dataLines[0].replace(/["']/g, ""); // delete in files
			var dataLength = dataLines.length - 1;
			HAX.data = [];
			// HAX.data.length = 0;
			var sep = HAX.separator;
			for ( var i = 0; i < dataLength; i++ ) {
				HAX.data.push( dataLines[i].split( sep ) );
			}
			buildReport();
			
		} else {
			callbackCount++;
if (window.console) { console.log('waiting...'); }
			stats.innerHTML = ' Responses from server (first time may need 20,000+): ' + callbackCount;
		}
	}	

	function buildReport() {
		var h = HAX;
		h.dataLength = HAX.data.length;
		
		h.scene = new THREE.Scene();
		updateAxis();
		updateSidebar();
		
		xKeys = findSets( h.x );
		xDelta = 100 / xKeys.length;
		var txt = '<h3 style="color: red" >X-Axis - ' + xKeys.length + ' items</h3><table id="rd1" style="width: 100%;" >' +
			'<tr><td >' + HAX.data[0][h.x] + '<br><small><button onclick="sortTable( rd1, 0, 0)">&uArr;</button><button onclick="sortTable( rd1, 0, 1 )">&dArr;</button></small></td>' +
			'<td><small>tot:' + tots + ' avg:' + avg.toFixed(1) + '<br><button onclick="sortTable( rd1, 1, 0)">&uArr;</button><button onclick="sortTable( rd1, 1, 1 )">&dArr;</button></small></td></tr>';
		for (var i = 0, len = xKeys.length; i < len; i++) {
			txt += '<tr onclick="HAX.highlight=' + xKeys[i] + ';" ><td>' + xKeys[i] + '</td><td>' + sets[ xKeys[i] ].count + '</td></tr>';
		} 
		txt += '</table>';
		readout1.innerHTML = txt;

		yKeys = findSets( h.y );
		yDelta = 100 / yKeys.length;
		txt = '<h3 style="color: green" >Y-axis - ' + yKeys.length + ' items</h3><table id="rd2" style="width: 100%;" >' +
			'<tr><td>' + HAX.data[0][h.y] + '<br><small><button onclick="sortTable( rd2, 0, 0)">&uArr;</button><button onclick="sortTable( rd2, 0, 1 )">&dArr;</button></small></td>' +
			'<td><small>tot:' + tots + ' avg:' + avg.toFixed(1) + '<br><button onclick="sortTable( rd2, 1, 0)">&uArr;</button><button onclick="sortTable( rd2, 1, 1 )">&dArr;</button></small></td></tr>';
		for ( i = 0, len = yKeys.length; i < len; i++) {
			txt += '<tr onclick="HAX.highlight=' + yKeys[i] + ';"><td>' + yKeys[i] + '</td><td>' + sets[ yKeys[i] ].count + '</td></tr>';
		} 
		txt += '</table>';
		readout2.innerHTML = txt;

		zKeys = findSets( h.z );
		zDelta = 100 / zKeys.length;
		txt = '<h3 style="color: blue" >Z-axis - ' + zKeys.length + ' items</h3><table id="rd3" style="width: 100%;" >' +
			'<tr><td>' + HAX.data[0][h.z] + '<br><small><button onclick="sortTable( rd3, 0, 0)">&uArr;</button><button onclick="sortTable( rd3, 0, 1 )">&dArr;</button></small></td>' +
			'<td><small>tot:' + tots + ' avg:' + avg.toFixed(1) + '<br><button onclick="sortTable( rd3, 1, 0)">&uArr;</button><button onclick="sortTable( rd3, 1, 1 )">&dArr;</button></small></td></tr>';
		for ( i = 0, len = zKeys.length; i < len; i++) {
			txt += '<tr onclick="HAX.highlight=' + zKeys[i] + ';" ><td>' + zKeys[i] + '</td><td>' + sets[ zKeys[i] ].count+ '</td></tr>';
		} 
		txt += '</table>';
		readout3.innerHTML = txt;

		HAX.vehicles = {};
		HAX.vehicle = function() {
			this.id = null;
			this.obj = null;
			this.trail = null;
			this.trailPoints  = [];
			this.route = null;
		};
		
		HAX.colorsSet = findSets( HAX.colorField );
		HAX.colors = colorful(  HAX.colorsSet );
/*
		HAX.lineSets = {};
		HAX.lineSets.element = function() {
			this.points = [];
			this.subSet = null;
		}
		HAX.lineSetChanges = 0;
*/		
		HAX.objects = [];

// Let's roll...
		HAX.dataPlay = true;
	}


	function findSets( fieldId ) {
		sets = {};
		sets.element = function() {};
		for (var record, field, i = 1; i < HAX.dataLength; i++) {
			record = HAX.data[i];
			field = record[ fieldId ];
			if ( sets[ field ] === undefined ) {
				sets[ field ] = new sets.element();
				sets[ field ].count = 1;
			} else {
				sets[ field ].count++;
			}
		}
		delete sets.element;
		var keys = Object.keys( sets );
		tots = 0;
		for ( i = 0, len = keys.length; i < len; i++ ) {
			tots += sets[keys[i]].count;
		} 
		avg = tots / keys.length;
		keys.sort( function(a,b){return a-b;} );
		return keys;
	}
			
		
	function haxisIt() {
	var color, record, mesh, material, pos, line;
		var h = HAX;
		var cyl = new THREE.CylinderGeometry( 2, 0, 4, 5 );
		
		for (var len = HAX.speed, i = 1; i < len; i++) {
			record = HAX.data[ HAX.dataCount ];
			var vehicleId = record[ h.vehNo ];
			color = HAX.colors[ HAX.colorsSet.indexOf( record[ h.colorField ] ) ];
			material = new THREE.MeshBasicMaterial( {color: 0xff0000, ambient: 0xffffff, opacity: 0.7, transparent: true } );
// direction
			if ( HAX.vehicles[vehicleId] === undefined ) {
				HAX.vehicles[vehicleId] = new HAX.vehicle();
				HAX.vehicles[vehicleId].id = vehicleId;
				HAX.vehicles[vehicleId].obj =  new THREE.Mesh( cyl, material );
				HAX.objects.push( HAX.vehicles[vehicleId].obj );
				HAX.scene.add( HAX.vehicles[vehicleId].obj );
			}
			
			if (  HAX.highlight == record[ h.x ]  || HAX.highlight == record[ h.y ] || HAX.highlight == record[ h.z ]) {
				HAX.vehicles[vehicleId].obj.material.color.setHSL( 0, 0, 0 );
			} else {	
				HAX.vehicles[vehicleId].obj.material.color.setHSL( color, 0.8, 0.5 );
			}			
			
			pos = v(  xDelta * xKeys.indexOf( record[ h.x] ) - 50, yDelta * yKeys.indexOf( record[ h.y] ) - 50, zDelta * zKeys.indexOf( record[ h.z] ) - 50 );
			HAX.vehicles[vehicleId].obj.position = pos ;
			HAX.vehicles[vehicleId].obj.record = record;
			HAX.vehicles[vehicleId].trailPoints.push( pos );
			
			if ( record[ h.direction ] === h.directionString ) {
// console.log( record[ h.direction ],		h.directionString );
				HAX.vehicles[vehicleId].obj.rotation.z = 0;
			} else {
				HAX.vehicles[vehicleId].obj.rotation.z = Math.PI;
			}			
			
			if ( HAX.vehicles[vehicleId].trailPoints.length > HAX.trailLength ) HAX.vehicles[vehicleId].trailPoints.shift(); 
			geometry = new THREE.Geometry();
			material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
			material.color.setHSL( color, 0.8, 0.5 );

			geometry.vertices = HAX.vehicles[vehicleId].trailPoints;
			HAX.scene.remove( HAX.vehicles[vehicleId].trail );
			HAX.vehicles[vehicleId].trail = new THREE.Line( geometry, material );
			HAX.scene.add( HAX.vehicles[vehicleId].trail );
			
			HAX.dataCount++;
		}
		
		stats.innerHTML = 'City: ' + HAX.title + '<br>' +
			'Total lines in file: ' + HAX.data.length + '<br>' +
			'Current line: ' + HAX.dataCount + '<br>' +
			// 'Day: ' + record[ h.date] + ' Time: ' + record[ h.time] + '<br>' +
			'Time: ' + record[ HAX.time] + '<br>' +
			'Replay speed: ' + HAX.speed + '<br>' +
			'Camera FOV: ' + HAX.camFov + '<br>' +
			'X: ' + HAX.data[0][ h.x] + ': ' + xKeys.length +  '<br>' +
			'Y: ' + HAX.data[0][ h.y] + ': ' + yKeys.length + '<br>' +
			'Z: ' + HAX.data[0][ h.z] + ': ' + zKeys.length + '<br>' +
			// 'Lines disconnected: ' + HAX.lineSetChanges +
		'';
		
		if ( HAX.dataCount > HAX.dataLength - HAX.speed - 1 ) { 
			HAX.dataCount = 1; 
			HAX.lineSetChanges = 0;
			for ( var veh in HAX.vehicles ) {
// console.log (veh );			
				HAX.vehicles[veh].obj.position.set( -50, -50,-50 );
				HAX.scene.remove( HAX.vehicles[veh].trail );
				HAX.vehicles[veh].trailPoints = [];
			}
		}
	}

	function animate() {
		requestAnimationFrame( animate );
		HAX.controls.update();
		HAX.renderer.render( HAX.scene, HAX.camera );
		if ( HAX.dataPlay === true ) {
			haxisIt();
		}
		HAX.stats.update();
	}

	function togglePlay() {
		if (HAX.data === undefined) return; 
		if ( HAX.dataPlay === true ) {
			HAX.dataPlay = false ;
		} else {
			HAX.dataPlay = true;
		}
	}

	function colorful( arr ) {
		var delta = 1.0 / arr.length;
		var colList = [];
		for ( var i = 0, len = arr.length; i < len; i++ ) {
			colList.push( i *  delta );
		}
		return colList;
	}

	function updateAxis( ) {
		var h = HAX;
		geometry = new THREE.PlaneGeometry( 100, 20, 1, 1 );

		material = canvasText( HAX.data[0][h.x] , { color: '#ff0000', fontSize: '48', height: 80,  width: 600 }  );
		var sign = new THREE.Mesh( geometry, material );
		sign.rotation.set( -1.5708, 0, 0);
		sign.position.set( 0, -50, -60);
		HAX.scene.add( sign );

		material = canvasText( HAX.data[0][h.y] , { color: '#00ff00', fontSize: '48', height: 80, width: 600 }  );
		sign = new THREE.Mesh( geometry, material );
		sign.rotation.set( 0,0 , -1.5708);
		sign.position.set( -60, -15, -50);
		HAX.scene.add( sign );

		material = canvasText( HAX.data[0][h.z] , { color: '#0000ff', fontSize: '48', height: 80,  width: 600 }  );
		sign = new THREE.Mesh( geometry, material );
		sign.rotation.set( -1.5708,0 , -1.5708);
		sign.position.set( -60, -50, 0);
		HAX.scene.add( sign );

		sign = new THREE.AxisHelper( 100 );
		sign.position.set( -50, -50, -50 );
		HAX.scene.add( sign );
		
		sign = new THREE.AxisHelper( 100 );
		sign.position.set( 50, 50, 50 );
		sign.scale.set(-1,-1,-1);
		HAX.scene.add( sign );
	}

	function canvasText ( text1, parameters ) {
		canvas = document.createElement("canvas");
		var width = ( parameters.width ) ? parameters.width : 300 ;
		canvas.width = width;
		var height = ( parameters.height ) ? parameters.height : 150 ;
		canvas.height = height;

		context = canvas.getContext("2d");
		context.fillStyle =  ( parameters.backgroundColor !== undefined ) ? parameters.backgroundColor : 'transparent';
		context.fillRect( 0, 0, width, height );
		//context.lineWidth = 2;
		//context.strokeRect(0, 0, width, height);
		context.fillStyle = ( parameters.color ) ? parameters.color : '#ffffff';

		context.font = ( parameters.fontSize !== undefined ) ? parameters.fontSize + "pt Arial bold" : '16pt Arial bold';
		context.textAlign = ( parameters.textAlign ) ? parameters.textAlign : 'left' ;
		context.textBaseline = "top";
		context.fillText(text1, 5, 0);

		map = new THREE.Texture( canvas );
		map.needsUpdate = true;
		return new THREE.MeshBasicMaterial( { map: map,  side: THREE.DoubleSide, transparent: true } );
	}

	function onWindowResize() {
		windowHalfX = window.innerWidth / 2;
		windowHalfY = window.innerHeight / 2;
		HAX.camera.aspect = window.innerWidth / window.innerHeight;
		HAX.camera.updateProjectionMatrix();
		HAX.renderer.setSize( window.innerWidth, window.innerHeight );
	}
	
	function onDocumentMouseUp() {
		if ( HAX.objects === undefined ) return;
		var h = HAX;
		var c = HAX.camera;
		h.camX = c.position.x; h.camY = c.position.y; h.camZ = c.position.z;
		h.rotX = c.rotation.x; h.rotY = c.rotation.y; h.rotZ = c.rotation.z;
		h.upX = c.up.x; h.upY = c.up.y; h.upZ = c.up.z;
		
		updateHash();
	}	
		
	function onDocumentMouseMove( event ) {
		if ( HAX.data === undefined ) return;
		// event.preventDefault();
		var mouse = { x: -1, y: -1 };
		mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
		mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;		
		var projector = new THREE.Projector();
		var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
		projector.unprojectVector( vector, HAX.camera );
		var raycaster = new THREE.Raycaster( HAX.camera.position, vector.sub( HAX.camera.position ).normalize() );
		var intersects = raycaster.intersectObjects( HAX.objects );
		var intersected;
		if ( intersects.length > 0 ) {
			if ( intersected != intersects[ 0 ].object ) { // not same one
				intersected = intersects[ 0 ].object;
			}
			headsUp.style.left = 10 + 0.5 * window.innerWidth + mouse.x * 0.5 * window.innerWidth + 'px';
			headsUp.style.bottom = 10 + 0.5 * window.innerHeight + mouse.y * 0.5 * window.innerHeight+ 'px';
			headsUp.style.display = '';
			var h = HAX, ir = intersected.record, txt = '';
			headsUp.innerHTML =  
				'X: ' + HAX.data[0][ h.x] + ' ' + ir[ h.x] + '<br>' +
				'Y: ' + HAX.data[0][ h.y] + ' ' + ir[ h.y] + '<br>' +
				'Z: ' + HAX.data[0][ h.z] + ' ' + ir[ h.z] + '<br>' +
				'Number of identical events: ' + intersects.length + '<br>';
				
			for (var i = 0, len = ir.length; i < len; i++) {
				txt += HAX.data[0][ i] + ':' + ir[i] + '<br>';
			}
			headsUp.innerHTML += '<div style="column-count: 2; font-size:small; word-wrap:break-word; ">' + txt + '</div>';
				//'<br>All the data [for testing]: <br>' +
				//intersected.record;
		} else {
			headsUp.style.display = 'none';
		}
	}
</script>
</body>
</html>