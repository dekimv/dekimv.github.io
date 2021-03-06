// brush: "css" aliases: []

//	This file is part of the "jQuery.Syntax" project, and is distributed under the MIT License.
//	Copyright (c) 2011 Samuel G. D. Williams. <http://www.oriontransfer.co.nz>
//	See <jquery.syntax.js> for licensing details.

Syntax.register('css', function(brush) {
	var colorNames = ["AliceBlue", "AntiqueWhite", "Aqua", "Aquamarine", "Azure", "Beige", "Bisque", "Black", "BlanchedAlmond", "Blue", "BlueViolet", "Brown", "BurlyWood", "CadetBlue", "Chartreuse", "Chocolate", "Coral", "CornflowerBlue", "Cornsilk", "Crimson", "Cyan", "DarkBlue", "DarkCyan", "DarkGoldenRod", "DarkGray", "DarkGreen", "DarkKhaki", "DarkMagenta", "DarkOliveGreen", "Darkorange", "DarkOrchid", "DarkRed", "DarkSalmon", "DarkSeaGreen", "DarkSlateBlue", "DarkSlateGray", "DarkTurquoise", "DarkViolet", "DeepPink", "DeepSkyBlue", "DimGray", "DodgerBlue", "FireBrick", "FloralWhite", "ForestGreen", "Fuchsia", "Gainsboro", "GhostWhite", "Gold", "GoldenRod", "Gray", "Green", "GreenYellow", "HoneyDew", "HotPink", "IndianRed", "Indigo", "Ivory", "Khaki", "Lavender", "LavenderBlush", "LawnGreen", "LemonChiffon", "LightBlue", "LightCoral", "LightCyan", "LightGoldenRodYellow", "LightGrey", "LightGreen", "LightPink", "LightSalmon", "LightSeaGreen", "LightSkyBlue", "LightSlateGray", "LightSteelBlue", "LightYellow", "Lime", "LimeGreen", "Linen", "Magenta", "Maroon", "MediumAquaMarine", "MediumBlue", "MediumOrchid", "MediumPurple", "MediumSeaGreen", "MediumSlateBlue", "MediumSpringGreen", "MediumTurquoise", "MediumVioletRed", "MidnightBlue", "MintCream", "MistyRose", "Moccasin", "NavajoWhite", "Navy", "OldLace", "Olive", "OliveDrab", "Orange", "OrangeRed", "Orchid", "PaleGoldenRod", "PaleGreen", "PaleTurquoise", "PaleVioletRed", "PapayaWhip", "PeachPuff", "Peru", "Pink", "Plum", "PowderBlue", "Purple", "Red", "RosyBrown", "RoyalBlue", "SaddleBrown", "Salmon", "SandyBrown", "SeaGreen", "SeaShell", "Sienna", "Silver", "SkyBlue", "SlateBlue", "SlateGray", "Snow", "SpringGreen", "SteelBlue", "Tan", "Teal", "Thistle", "Tomato", "Turquoise", "Violet", "Wheat", "White", "WhiteSmoke", "Yellow", "YellowGreen"];
	
	var colorPatterns = ["#[0-9a-f]{3,6}", "rgba?\\(.+?\\)", "hsla?\\(.+?\\)"];
	
	var colorMatcher = [].concat(
		jQuery.map(colorNames, function(pattern) {
			return "(" + Syntax.Brush.convertStringToTokenPattern(pattern, true) + ")";
		}), 
		jQuery.map(colorPatterns, function(pattern) {
			return "(" + Syntax.Brush.convertStringToTokenPattern(pattern, false) + ")";
		})
	);
	
	brush.push({
		pattern: /\(.*?\)/g,
		allow: '*',
		disallow: ['property']
	});
	
	brush.push({
		pattern: /\s*([\:\.\[\]\"\'\=\s\w#\.\-,]+)\s+\{/gm,
		matches: Syntax.extractMatches({klass: 'selector', allow: ['string']})
	});
	
	brush.push({
		pattern: new RegExp(colorMatcher.join("|"), "gi"),
		klass: 'color',
		process: function (element, match) {
			var text = Syntax.innerText(element);
			var colourBox = document.createElement('span');
			colourBox.className = 'colour-box';
			
			var sampleColour = document.createElement('span');
			sampleColour.className = 'sample';
			sampleColour.style.backgroundColor = text;
			sampleColour.appendChild(document.createTextNode('  '))
			colourBox.appendChild(sampleColour);
			
			element.appendChild(colourBox);
			return element;
		}
	});
		
	brush.push(Syntax.lib.cStyleComment);
	brush.push(Syntax.lib.webLink);
	
	brush.push({
		pattern: /\{(.|\n)*?\}/g,
		klass: 'properties',
		allow: '*'
	});
	
	brush.push({
		pattern: /\:(.*?(?=\})|(.|\n)*?(?=(\}|\;)))/g,
		matches: Syntax.extractMatches({klass: 'value', allow: ['color'], only: ['properties']})
	});
	
	brush.push({
		pattern: /([\-\w]+):/g,
		matches: Syntax.extractMatches({
			klass: 'property',
			process: Syntax.lib.webLinkProcess("http://cssdocs.org/")
		})
	});
	
	// Strings
	brush.push(Syntax.lib.singleQuotedString);
	brush.push(Syntax.lib.doubleQuotedString);
	brush.push(Syntax.lib.stringEscape);
	
	brush.push(Syntax.lib.cStyleFunction);
});

