
function hide(selectedChara){
	document.getElementById(selectedChara+'_exp').style.visibility="hidden";
    document.getElementById(selectedChara+'_tte').style.visibility="hidden";
    document.getElementById("Snavi").style.visibility="hidden";
}
function unhide(selectedChara) {
	if (selectedChara == null){
		localStorage.setItem("player","Lance");
		selectedChara = "Lance";
	}
	else{
		localStorage.setItem("player",selectedChara);
	}
    document.getElementById('Lance_exp').style.visibility="hidden";
    document.getElementById('Gorman_exp').style.visibility="hidden";
    document.getElementById('Doherty_exp').style.visibility="hidden";
    document.getElementById('Blair_exp').style.visibility="hidden";
    document.getElementById('Lance_tte').style.visibility="hidden";
    document.getElementById('Gorman_tte').style.visibility="hidden";
    document.getElementById('Doherty_tte').style.visibility="hidden";
    document.getElementById('Blair_tte').style.visibility="hidden";
    document.getElementById(selectedChara+'_exp').style.visibility="visible";
    document.getElementById(selectedChara+'_tte').style.visibility="visible";
    if (selectedChara == "Lance"){
      document.getElementById("Snavi").style.top="26%";
    }
    else if (selectedChara == "Gorman"){
      document.getElementById("Snavi").style.top="41%";
    }
    else if (selectedChara == "Doherty"){
      document.getElementById("Snavi").style.top="56%";
    }
    else if (selectedChara == "Blair"){
      document.getElementById("Snavi").style.top="71%";
    }
    document.getElementById("Snavi").style.visibility = "visible";
}
function switchLink(selected) {
    document.getElementById('About_exp').style.visibility="hidden";
    document.getElementById('Links_exp').style.visibility="hidden";
    document.getElementById(selected+'_exp').style.visibility="visible";
    if (document.getElementById('About_exp').style.visibility=="visible"){
      document.getElementById("Anavi").style.top="26%";
    }
    else if (document.getElementById('Links_exp').style.visibility=="visible"){
      document.getElementById("Anavi").style.top="41%";
    }
}
function storenext(){
			if (localStorage.getItem("last") == null) {
				localStorage.setItem("last" , "2");
			}
			else {
				var x = Number(localStorage.getItem("last")) % 10 + 1;
				var xx = x.toString();
				localStorage.setItem("last" , xx );
			}
}
function storeprev(){
	if ( (localStorage.getItem("last") == null) || (localStorage.getItem("last") == "1") ) {
		localStorage.setItem("last" , "10");
	}
	else {
		var x = Number(localStorage.getItem("last")) - 1;
		var xx = x.toString();
		localStorage.setItem("last" , xx );
	}
}

function checklast(){
	var index = localStorage.getItem("last");
	if (index == null) {
		index = "1";
	}
	document.getElementById("switch"+index).checked=true;
}
function dispPage(){
	for (let i = 1; i < 11; i ++){
		var index = Number (localStorage.getItem("last"));
		if (index == i){
			document.getElementById("page"+i).style.visibility = "visible";
		}
		else {
			document.getElementById("page"+i).style.visibility = "hidden";
		}
	}
}
function dispTuto(){
	document.getElementById("Tuto_0").style.visibility = "visible";
	document.getElementById("susumu").style.visibility = "visible";
	document.getElementById("susumu").style.zIndex = 3;
	document.getElementById("FReturn").style.visibility = "visible";
	document.getElementById("FReturn").style.zIndex = 3;

	document.getElementById("Lance").style.visibility = "hidden";
	document.getElementById("Lance").style.zIndex = -3;
	document.getElementById("Gorman").style.visibility = "hidden";
	document.getElementById("Gorman").style.zIndex = -3;
	document.getElementById("Doherty").style.visibility = "hidden";
	document.getElementById("Doherty").style.zIndex = -3;
	document.getElementById("Blair").style.visibility = "hidden";
	document.getElementById("Blair").style.zIndex = -3;
	document.getElementById("SReturn").style.visibility = "hidden";
	document.getElementById("SReturn").style.zIndex = -3;
	document.getElementById("continue").style.visibility = "hidden";
	document.getElementById("continue").style.zIndex = -3;
	document.getElementById("SelectTitle").style.visibility = "hidden";
	document.getElementById("SelectTitle").style.zIndex = -3;
	if (localStorage.getItem("player") != null){ hide(localStorage.getItem("player")); }
}
function check(){
	if (localStorage.getItem("checked") == null){
		dispTuto();
		localStorage.setItem("checked", "checked");
	}
	else if (localStorage.getItem("checked") == "checked"){
		pass();
	}
}
function pass(){
	dispGame();
	var app = Elm.Main.init({
		node: document.getElementById('myapp'), 
		flags: localStorage.getItem("player")
  	});
}

function dispHome(){
	document.getElementById("MainLogo").style.visibility = "hidden";

	document.getElementById("Lance").style.visibility = "hidden";
	document.getElementById("Lance").style.zIndex = -3;
	document.getElementById("Gorman").style.visibility = "hidden";
	document.getElementById("Gorman").style.zIndex = -3;
	document.getElementById("Doherty").style.visibility = "hidden";
	document.getElementById("Doherty").style.zIndex = -3;
	document.getElementById("Blair").style.visibility = "hidden";
	document.getElementById("Blair").style.zIndex = -3;
	document.getElementById("SReturn").style.visibility = "hidden";
	document.getElementById("SReturn").style.zIndex = -3;
	document.getElementById("continue").style.visibility = "hidden";
	document.getElementById("continue").style.zIndex = -3;
	document.getElementById("SelectTitle").style.visibility = "hidden";
	document.getElementById("SelectTitle").style.zIndex = -3;
	if (localStorage.getItem("player") != null){ hide(localStorage.getItem("player")); }

	document.getElementById("Manual").style.visibility = "hidden";
	document.getElementById("PreArrow").style.visibility = "hidden";
	document.getElementById("NextArrow").style.visibility = "hidden";
	document.getElementById("slides").style.visibility = "hidden";
	if (localStorage.getItem("last") != null){document.getElementById("page" + localStorage.getItem("last")).style.visibility = "hidden";}
	document.getElementById("HReturn").style.visibility = "hidden";
	document.getElementById("HReturn").style.zIndex = -3;

	switchLink("About");
	document.getElementById("About_exp").style.visibility = "hidden";
	document.getElementById("Anavi").style.visibility = "hidden";
	document.getElementById("About").style.visibility = "hidden";
	document.getElementById("About").style.zIndex = -3;
	document.getElementById("Links").style.visibility = "hidden";
	document.getElementById("Links").style.zIndex = -3;
	document.getElementById("Links_exp").style.visibility = "hidden";
	document.getElementById("AReturn").style.visibility = "hidden";
	document.getElementById("AReturn").style.zIndex = -3;
	

	document.getElementById("HomeTitle").style.visibility = "visible";
	document.getElementById("HomeLogo").style.visibility = "visible";
	document.getElementById("New").style.visibility = "visible";
	document.getElementById("New").style.zIndex = 2;
	document.getElementById("Help").style.visibility = "visible";
	document.getElementById("Help").style.zIndex = 2;
	document.getElementById("More").style.visibility = "visible";
	document.getElementById("More").style.zIndex = 2;
}
function dispSelect(){
	document.getElementById("Lance").style.visibility = "visible";
	document.getElementById("Lance").style.zIndex = 2;
	document.getElementById("Gorman").style.visibility = "visible";
	document.getElementById("Gorman").style.zIndex = 2;
	document.getElementById("Doherty").style.visibility = "visible";
	document.getElementById("Doherty").style.zIndex = 2;
	document.getElementById("Blair").style.visibility = "visible";
	document.getElementById("Blair").style.zIndex = 2;
	document.getElementById("SReturn").style.visibility = "visible";
	document.getElementById("SReturn").style.zIndex = 2;
	document.getElementById("continue").style.visibility = "visible";
	document.getElementById("continue").style.zIndex = 2;
	document.getElementById("SelectTitle").style.visibility = "visible";
	document.getElementById("SelectTitle").style.zIndex = 2;
	unhide(localStorage.getItem('player'));
	document.getElementById("HomeTitle").style.visibility = "hidden";
	document.getElementById("HomeLogo").style.visibility = "hidden";
	document.getElementById("New").style.visibility = "hidden";
	document.getElementById("New").style.zIndex = -3;
	document.getElementById("Help").style.visibility = "hidden";
	document.getElementById("Help").style.zIndex = -3;
	document.getElementById("More").style.visibility = "hidden";
	document.getElementById("More").style.zIndex = -3;

	document.getElementById("Tuto_0").style.visibility = "hidden";
	document.getElementById("susumu").style.visibility = "hidden";
	document.getElementById("susumu").style.zIndex = -3;
	document.getElementById("FReturn").style.visibility = "hidden";
	document.getElementById("FReturn").style.zIndex = -3;
}
function dispGame(){
	document.getElementById("Lance").style.visibility = "hidden";
	document.getElementById("Lance").style.zIndex = -3;
	document.getElementById("Gorman").style.visibility = "hidden";
	document.getElementById("Gorman").style.zIndex = -3;
	document.getElementById("Doherty").style.visibility = "hidden";
	document.getElementById("Doherty").style.zIndex = -3;
	document.getElementById("Blair").style.visibility = "hidden";
	document.getElementById("Blair").style.zIndex = -3;
	document.getElementById("SReturn").style.visibility = "hidden";
	document.getElementById("SReturn").style.zIndex = -3;
	document.getElementById("continue").style.visibility = "hidden";
	document.getElementById("continue").style.zIndex = -3;
	document.getElementById("SelectTitle").style.visibility = "hidden";
	document.getElementById("SelectTitle").style.zIndex = -3;
	if (localStorage.getItem("player") != null){ hide(localStorage.getItem("player")); }
	document.getElementById("Tuto_0").style.visibility = "hidden";
	document.getElementById("susumu").style.visibility = "hidden";
	document.getElementById("susumu").style.zIndex = -2;
	document.getElementById("FReturn").style.visibility = "hidden";
	document.getElementById("FReturn").style.zIndex = -2;
}
function dispHelp(){
	document.getElementById("Manual").style.visibility = "visible";
	document.getElementById("Manual").style.zIndex = 3;
	document.getElementById("PreArrow").style.visibility = "visible";
	document.getElementById("NextArrow").style.visibility = "visible";
	document.getElementById("slides").style.visibility = "visible";
	document.getElementById("HReturn").style.visibility = "visible";
	document.getElementById("HReturn").style.zIndex = 3;
	checklast();
	dispPage();
	document.getElementById("HomeTitle").style.visibility = "hidden";
	document.getElementById("HomeLogo").style.visibility = "hidden";
	document.getElementById("New").style.visibility = "hidden";
	document.getElementById("New").style.zIndex = -3;
	document.getElementById("Help").style.visibility = "hidden";
	document.getElementById("Help").style.zIndex = -3;
	document.getElementById("More").style.visibility = "hidden";
	document.getElementById("More").style.zIndex = -3;
}
function dispAbout(){
	document.getElementById("About_exp").style.visibility = "visible";
	document.getElementById("Anavi").style.visibility = "visible";
	document.getElementById("About").style.visibility = "visible";
	document.getElementById("About").style.zIndex = 2;
	document.getElementById("Links").style.visibility = "visible";
	document.getElementById("Links").style.zIndex = 2;
	document.getElementById("AReturn").style.visibility = "visible";
	document.getElementById("AReturn").style.zIndex = 2;

	document.getElementById("HomeTitle").style.visibility = "hidden";
	document.getElementById("HomeLogo").style.visibility = "hidden";
	document.getElementById("New").style.visibility = "hidden";
	document.getElementById("New").style.zIndex = -3;
	document.getElementById("Help").style.visibility = "hidden";
	document.getElementById("Help").style.zIndex = -3;
	document.getElementById("More").style.visibility = "hidden";
	document.getElementById("More").style.zIndex = -3;
}