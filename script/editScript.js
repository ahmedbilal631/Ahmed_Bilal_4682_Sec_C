////////////////////////////////////////////////////////////////////////////////////////////
var editArry = [];//Global array
var editingId = 0;//Calling id observer
//////////////////////////////////////////////////////////
//Getting back data from local storage
//accessing the localstorage
function getData() {
    var storedData = localStorage.getItem("list_data_key");
    if (storedData) {
        editArry = JSON.parse(storedData);
    }
    editingId = localStorage.getItem("edtId");
}
getData();//called for backup from local storage
//Above code is to control storage
///////////////////////////////////////////////////////////
//Now task editing control function        
function edtBtn() {
    editingId = Number(editingId);
    var oldName = document.getElementById("txtTaskName").value = editArry[editingId].name;
    var oldLoc = document.getElementById("txtLoc").value = editArry[editingId].loc;
    var oldDetail = document.getElementById("txtTaskDetail").value = editArry[editingId].detail;
    console.log("editingActive");
}
edtBtn();//Called to fill data in the fields to change
///////////////////////////////////////////////////////////
////Updating function
function update() {
    editingId = Number(editingId);
    var newName = document.getElementById("txtTaskName").value;
    var newLoc = document.getElementById("txtLoc").value;
    var newDetail = document.getElementById("txtTaskDetail").value;
    editArry[editingId].name = newName;
    editArry[editingId].loc = newLoc;
    editArry[editingId].detail = newDetail;
    // store array to localstorage
    localStorage.setItem("list_data_key", JSON.stringify(editArry));
    document.getElementById('otList').innerHTML = "Updated Successfully!!";
    window.close();//Going back to home screen
}
///////////////////////////////////////////////////////////////////////////////////////////////////