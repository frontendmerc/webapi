export function testFunction(props){

    console.log("Ready: " + props);

    document.getElementById("saveBtn").style.display = "none";
    document.getElementById("textarea").disabled = true;

    document.getElementById("editPlatformDiv").style.display = "none";
    document.getElementById("platformDiv").style.display = "block";

    document.getElementById("editGenresDiv").style.display = "none";
    document.getElementById("genresDiv").style.display = "block";


    var result = [document.getElementById("textarea").value, document.getElementById("platformInput").value, document.getElementById("genresInput").value];
    return result;

}

export function editText(){

    document.getElementById("textarea").disabled = false;
    document.getElementById("saveBtn").style.display = "block";
    
    document.getElementById("editPlatformDiv").style.display = "block";
    document.getElementById("platformDiv").style.display = "none";

    document.getElementById("editGenresDiv").style.display = "block";
    document.getElementById("genresDiv").style.display = "none";
}