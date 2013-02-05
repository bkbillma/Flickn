function ajaxCall(url) {
	(function(){
		if (typeof XMLHttpRequest == "undefined"){
			XMLHttpRequest = function () {
			try { return new ActiveXObject("Msxml2.XMLHTTP.6.0"); }
				catch (e) {}
			try { return new ActiveXObject("Msxml2.XMLHTTP.3.0"); }
				catch (e) {}
			try { return new ActiveXObject("Microsoft.XMLHTTP"); }
				catch (e) {}
			throw new Error("This browser does not support XMLHttpRequest.");
			};
		}

		return function ajax(url) {
			xmlhttp = new XMLHttpRequest();
			var nocache = ((Math.random()*1000000)+1);
			xmlhttp.open("GET",url+"/"+nocache,false);
			xmlhttp.send();
			xmlDoc = xmlhttp.responseText; 
			return JSON.parse(xmlDoc);
		}
	})
})