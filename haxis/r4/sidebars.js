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

			'#sbl { background-color: #eee; left: 30px; margin: 10px; opacity: 0.8; outline: 1px solid; padding: 10px; position: absolute; ' +
				'text-align: left; top: 100px; max-width: 350px;}' +

			'#stb { background-color: #eee; margin: 10px auto; opacity: 0.8; outline: 1px solid; padding: 10px; ' +
				'text-align: left; top: 20px; width: 500px;}' +

			'#sbr { background-color: #eee; height: 90%; margin: 10px; opacity: 0.8; outline: 1px solid; padding: 10px; position: absolute; ' +
				'right: 20px; text-align: left; top: 40px; width: 350px;}' +

			'#sbrBody #sbr-body h3 { height: 95%; margin: 20px 0; overflow-y: scroll; }' +

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