/* jshint esversion: 8 */
$(function() {
	let styleSheets = [];
	let bhlSheets = "bhl";

	//Test Relative URLs
	fetch("../src/css/black-highlighter.css").then(function(resp) {
		console.log("Status: " + resp.status);
		if (resp.status == 200) {
			styleSheets = [
				"../src/css/normalize.css",
				"../src/css/black-highlighter.css"
			];
		} else {
			styleSheets = [
				"./Black-Highlighter/css/normalize.css",
				"./Black-Highlighter/css/black-highlighter.css"
			];
		}
	});

	//Polyfill for DOMParser
	(function (DOMParser) {
		"use strict";

		var
			DOMParser_proto = DOMParser.prototype,
			real_parseFromString = DOMParser_proto.parseFromString;

		// Firefox/Opera/IE throw errors on unsupported types
		try {
			// WebKit returns null on unsupported types
			if ((new DOMParser).parseFromString("", "text/html")) {
				// text/html parsing is natively supported
				return;
			}
		} catch (ex) {}

		DOMParser_proto.parseFromString = function (markup, type) {
			if (/^\s*text\/html\s*(?:;|$)/i.test(type)) {
				var
					doc = document.implementation.createHTMLDocument("");
				if (markup.toLowerCase().indexOf("<!doctype") > -1) {
					doc.documentElement.innerHTML = markup;
				} else {
					doc.body.innerHTML = markup;
				}
				return doc;
			} else {
				return real_parseFromString.apply(this, arguments);
			}
		};
	}(DOMParser));

	//Function to inject stylesheets
	let changeStyleSheet = (cssFile, cssId) => {
		let cssIdSelect = "#" + cssId;
		if ($(cssIdSelect) && cssFile.length == 1) {
			$(cssIdSelect).href = cssFile;
		} else {
			for (let i = 0; i < cssFile.length; i++) {
				let link = document.createElement("link");
				link.href = cssFile[i];
				link.rel = "stylesheet";
				link.id = cssId;
				document.getElementsByTagName("head")[0].appendChild(link);
			}
		}
	};

	//Function to pull ?url= parameter
	let getUrlParameter = (sParam) => {
		var sPageURL = window.location.search.substring(1),
			sURLVariables = sPageURL.split("&"),
			sParameterName,
			i;

		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split("=");

			if (sParameterName[0] === sParam) {
				return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
			}
		}
		return false;
	};

	//Use whateverorigin.org to pull source of page & Apply to local page
	let scpwikiurl = getUrlParameter("url");
	let getNewElems = async () => {	
		$.ajax({
			url:`https://api.codetabs.com/v1/proxy/?quest=https://scp-wiki.wikidot.com/${scpwikiurl}`,
			type:'GET',
			success: function(data){							
				let href = "href=\"https://scp-wiki.wikidot.com/";
				let src = "src=\"https://scp-wiki.wikidot.com/";
				let dp = new DOMParser();
				let doc = dp.parseFromString(data.replace(/(href="\/)/g, href).replace(/(src="\/)/g, src).replace(/(http:\/\/scp-wiki)/g, "https://scp-wiki"), "text/html");			
				let newHeadContents = doc.getElementsByTagName("head")[0].innerHTML;
				let newHead = doc.getElementsByTagName("head")[0];
				let newBody = doc.getElementsByTagName("body")[0];
				let bhlMinDetect = String(newHeadContents).indexOf("black-highlighter.min.css");
				let bhlDetect = String(newHeadContents).indexOf("black-highlighter.css");
				document.getElementsByTagName("head")[0].appendChild(newHead).after("\n");
				document.getElementsByTagName("body")[0].appendChild(newBody);					
				if (bhlDetect == -1 && bhlMinDetect == -1 ) {
					changeStyleSheet(styleSheets,bhlSheets);				
				}				
			}
		});
	};

	//Reapply remotely pulled scripts & links to page to make sure they are run
	let refreshScripts = async () => {
		try {
			let scripts = document.querySelectorAll("head > head > script");
			let links = document.querySelectorAll("head > head > link");
			let bScripts = document.querySelectorAll("body > body script");
			let lTime = 500;
			let sTime = 500;
			let bTime = 2000;
			$(links).each(function(idx,el){
				setTimeout( function(){
					let link = document.createElement("link");
					let lHref = links[idx].getAttribute("href");
					let lRel = links[idx].getAttribute("rel");
					let lTyp = links[idx].getAttribute("type");
					if (lTyp) {
						link.type = lTyp;	
					}
					if (lHref) {
						link.href = lHref;
					}
					if (lRel) {
						link.rel = lRel;					
					}
					document.getElementsByTagName("head")[0].appendChild(link);
				}, lTime)
				lTime += 500;
			});			
			$(scripts).each(function(idx,el){
				setTimeout( function(){
					let script = document.createElement("script");
					let pSrc = scripts[idx].getAttribute("src");
					let pTyp = scripts[idx].getAttribute("type");
					let pTxt = scripts[idx].innerHTML;
					if (pTyp) {
						script.type = pTyp;
						if (pSrc) {
							script.src = pSrc;
							document.getElementsByTagName("head")[0].appendChild(script);
						}
						if (pTxt) {
							script.innerHTML = pTxt;
							document.getElementsByTagName("head")[0].appendChild(script);
						}			
					}	
				}, sTime)
				sTime += 500;		
			});
			$(bScripts).each(function(idx,el){
				setTimeout( function(){
					let script = document.createElement("script");
					let bSrc = bScripts[idx].getAttribute("src");
					let bTyp = bScripts[idx].getAttribute("type");
					let bTxt = bScripts[idx].innerHTML;
					if (bTyp) {
						script.type = bTyp;
						if (bSrc) {
							script.src = bSrc;
							document.getElementsByTagName("body")[0].appendChild(script);
						}
						if (bTxt) {
							script.innerHTML = bTxt;
							document.getElementsByTagName("body")[0].appendChild(script);
						}			
					}	
				}, bTime)
				bTime += 500;		
			});
		} catch(e) {
			console.log(e);
		}
	};	

	getNewElems();
	setTimeout(function(){ refreshScripts() }, 1000);
});