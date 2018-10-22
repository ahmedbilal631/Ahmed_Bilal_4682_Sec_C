////////////////////////////////////////////////////////////////////////////////////////////////
//Date activity is here below
var today = new Date;
var dayName = today.getDay();
var daySelection = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thirsday", "Friday", "Saturday"];
document.getElementById('todin').innerHTML = daySelection[dayName];
var dateis = today.getDate();
var monthno = today.getMonth();
var monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var monthis = monthName[monthno];
var yearis = today.getFullYear();
document.getElementById('todate').innerHTML = dateis + "/" + monthis + "/" + yearis;
//Date activity is above

/////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////
//21102018
var taskArray = [];//Global Array to store/re-store objects from local storage 
var c = 0;//counter for columns
var v = 0;//counter for object elements stored in array
var x = 0;//counter for row id generator
//y = 0;//Update counter
//////////////////////////////////////////////////////////////////
//accessing the localstorage
function getData() {
    var storedData = localStorage.getItem("list_data_key");
    if (storedData) {
        taskArray = JSON.parse(storedData);
    }
}
//Above code is to control storage
/////////////////////////////////////////////////////////////////    
function generateListHead() {
    var tabpr = document.getElementById('pr');//accessing parent table
    var hdrw = document.createElement("tr");//Heading row
    hdrw.setAttribute("class", "first");
    var hdcol = document.createElement("td");
    hdcol.setAttribute("class", "hdcl");
    var hdcolTxt = document.createTextNode("Name");
    hdcol.appendChild(hdcolTxt);
    hdrw.appendChild(hdcol);
    var hdcol = document.createElement("td");
    hdcol.setAttribute("class", "hdcl");
    var hdcolTxt = document.createTextNode("Location");
    hdcol.appendChild(hdcolTxt);
    hdrw.appendChild(hdcol);
    var hdcol = document.createElement("td");
    hdcol.setAttribute("class", "hdcl");
    var hdcolTxt = document.createTextNode("Details");
    hdcol.appendChild(hdcolTxt);
    hdrw.appendChild(hdcol);
    var hdcol = document.createElement("td");
    hdcol.setAttribute("class", "hdcl");
    var hdcolTxt = document.createTextNode("Buttons");
    hdcol.appendChild(hdcolTxt);
    hdrw.appendChild(hdcol);
    tabpr.appendChild(hdrw);//
}
//////////////////////////////////////////////
//Below function is to generate a new row in the task list with buttons
function generateTaskListElements() {
    // getData();//For getting data
    var tabpr = document.getElementById('pr');//accessing parent table
    var newrw = document.createElement("tr");//creating a new row
    var idrw = "id";
    var idname = "fit" + x;
    newrw.setAttribute(idrw, idname);//Id atteribute by variable name
    newrw.setAttribute("class", "nwrw");
    tabpr.appendChild(newrw);//Appended into table
    //Creation of row columns and appending them
    var newcln = document.createElement("td");
    newcln.setAttribute("class", "cl");
    newrw.appendChild(newcln);
    var newcln = document.createElement("td");
    newcln.setAttribute("class", "cl");
    newrw.appendChild(newcln);
    var newcln = document.createElement("td");
    newcln.setAttribute("class", "cl");
    newrw.appendChild(newcln);
    //Creation of row functional buttons and appending them
    var newcln = document.createElement("td");
    //IMP task button
    var impbtn = document.createElement("input");
    impbtn.setAttribute("value", "IMP");
    impbtn.setAttribute("type", "button");
    impbtn.setAttribute("class", "tbBtn");
    var impid = x;
    impbtn.setAttribute("id", impid);
    impbtn.setAttribute("onClick", "impBtn(id);");
    newcln.appendChild(impbtn);
    newrw.appendChild(newcln);
    //DEL task button
    var delbtn = document.createElement("input");
    delbtn.setAttribute("value", "DEL");
    delbtn.setAttribute("type", "button");
    var dlid = x;
    delbtn.setAttribute("id", dlid);
    delbtn.setAttribute("onClick", " delBtn(id);");
    delbtn.setAttribute("class", "tbBtn");
    newcln.appendChild(delbtn);
    newrw.appendChild(newcln);
    //Edit Task button
    var edtbtn = document.createElement("input");
    edtbtn.setAttribute("value", "Edit");
    edtbtn.setAttribute("type", "button");
    var edtid = x;
    edtbtn.setAttribute("id", edtid);
    edtbtn.setAttribute("class", "tbBtn");
    edtbtn.setAttribute("onClick", " edtInterface(id);");//edtInterface();
    newcln.appendChild(edtbtn);
    newrw.appendChild(newcln);
    x = x + 1;
    return x;
}
//Above code is to generate row for task
/////////////////////////////////////////////////////////////////
//button to delete
var s;
// var first;
function delBtn(btnId) {
    // getData();

    var cnode = document.getElementById(btnId);
    var pnode = cnode.parentNode.parentNode;
    pnode.remove();//Removing a full row
    console.log("deleted");
    s = Number(btnId);
    taskArray.splice(s, 1);
    // localStorage.setItem("list_data_key", JSON.stringify(taskArry));
    // document.getElementById('activityTitle').innerHTML = "Deleted Successfully!!";
    x = x - 1;
    c = c - 3;
    v = v - 1;
    return x, v, c;
    refill();
}
//Above lines for deleting a task row with del button

////////////////////////////////////////////////////////////////
//Function below for the data filling in a generated row by JS
function fill() {
    // v = x;
    var cols = document.getElementsByClassName("cl");
    cols[c].innerHTML = taskArray[v].name;
    cols[c + 1].innerHTML = taskArray[v].loc;
    cols[c + 2].innerHTML = taskArray[v].detail;
    v = v + 1;
    c = c + 3;
    return c, v;
}
//Function above for the data filling in a generated row by JS
////////////////////////////////////////////////////////////////
function degenerateList(caller) {

    var foo = document.getElementById('pr');
    while (foo.firstChild) foo.removeChild(foo.firstChild);
    if (caller === 0) {
        refresh();
    }
}
////////////////////////////////////////////////////////////////
//to reload the saved data from local storage
function refresh() {

    getData();
    x = 0;
    v = 0;
    c = 0;
    if (taskArray.length === 0) {
        generateListHead();
        var notification = document.getElementById("pr");
        var notify = document.createElement("h3");
        notify.setAttribute("class", "pro");
        var txt = document.createTextNode("You have nothing to display!!");
        notify.appendChild(txt);
        notification.appendChild(notify);
        var notify1 = document.createElement("h5");
        notify1.setAttribute("class", "pro");
        var txt1 = document.createTextNode("Click on the 'Add New' button to add some Task!!");
        notify1.appendChild(txt1);
        notification.appendChild(notify1);
    }
    else {
        generateListHead();
        for (var i = 0; i < taskArray.length; i++) {
            generateTaskListElements();
            fill();
        }
        x = taskArray.length;
        v = x;
        c = x * 3;

    }

    return x, v, c;
}
////////////////////////////////////////////////////////////////
//function to refill data from local storage after editing 
//or making any change
function refill() {
    getData();
    x = 0;
    v = 0;
    c = 0;
    for (var i = 0; i < taskArray.length; i++) {
        // generate();
        fill();
    }
    x = taskArray.length;
    v = x;
    c = x * 3;
    return x, v, c;
}
////////////////////////////////////////////////////////////////
//Function to format the list/array of tasks
//from local storage
function formatList() {
    degenerateList();
    localStorage.clear();
    var tabpr = document.getElementById("pr");
    var pro = document.createElement("h2");
    pro.setAttribute("class", "pro");
    tabpr.appendChild(pro);
    var protxt = document.createTextNode("Successfully!!");
    pro.appendChild(protxt);
}
////////////////////////////////////////////////////////////////
// For addition of a new task in the list
//First we opened a new window get values via loading a form
function toAddNew() {
    var myWindow = window.open("AddForm.html", "win1", "width=600,height=400,left=200,top=100");
    if (myWindow === null) {
        alert("Please disable your popup blocker.");
    }
    // alert("New Addition");
}
//////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////
// edit button control
// First we open a task editing window
var editingId = 0;//edit id controller
function edtInterface(editBtnId) {
    editingId = editBtnId;
    localStorage.setItem("edtId", editingId);
    var myWindow = window.open("EditForm.html", "win1", "width=600,height=400,left=200,top=100");
    if (myWindow === null) {
        alert("Please disable your popup blocker.");
    }
    // alert("Editing");
}
//////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////    
//button to delete
function impBtn(btnId) {
    var cnode = document.getElementById(btnId);
    var pnode = cnode.parentNode;
    pnode = pnode.parentNode;
    pnode.setAttribute("class", "imp");//Removing a full row
    console.log("imp");
}
//Above lines for highlight a task row with imp button
///////////////////////////////////////////////////////
//Activity control function are below
function taskSelection0() {
    // var activitySelector = document.getElementById('welcomeNote').innerHTML;
    // document.getElementById('activityTitle').innerHTML = activitySelector;
}
function taskSelection1() {
    var activitySelector = document.getElementById('myToday').innerHTML;
    document.getElementById('activityTitle').innerHTML = activitySelector;
}
function taskSelection2() {
    // var activitySelector = document.getElementById('').innerHTML;
    document.getElementById('activityTitle').innerHTML = "List Formated!!";
    formatList();
}
//add button
function taskSelection3() {
    var activitySelector = document.getElementById('addnew').innerHTML;
    document.getElementById('activityTitle').innerHTML = activitySelector;
}
//Edit button
function taskSelection4() {
    degenerateList();
    var activitySelector = document.getElementById('help').innerHTML;
    document.getElementById('activityTitle').innerHTML = activitySelector;
    var container = document.getElementById("pr");
    var pro = document.createElement("h4");
    pro.setAttribute("class", "pro");
    container.appendChild(pro);
    var protxt = document.createTextNode("For help!");
    pro.appendChild(protxt);
    var hlp = document.createElement("p");
    hlp.setAttribute("class", "pro");
    container.appendChild(hlp);
    var protxt1 = document.createTextNode("Please Contact us here!!");
    hlp.appendChild(protxt1);
    var hlp1 = document.createElement("h4");
    hlp1.setAttribute("class", "pro");
    container.appendChild(hlp1);
    var hlpLnk = document.createElement("a");
    hlpLnk.setAttribute("class", "pro");
    hlpLnk.setAttribute("href", "irumzas2017@gmail.com");
    hlp1.appendChild(hlpLnk);
    var protxt2 = document.createTextNode("irumzas2017@gmail.com");
    hlpLnk.appendChild(protxt2);
    var hlp2 = document.createElement("h4");
    hlp2.setAttribute("class", "pro");
    container.appendChild(hlp2);
    var hlpfb = document.createElement("a");
    hlpfb.setAttribute("class", "pro");
    hlpfb.setAttribute("href", "https://www.facebook.com/saifamervi");
    hlp2.appendChild(hlpfb);
    var protxt3 = document.createTextNode("FB.com/saifamervi");
    hlpfb.appendChild(protxt3);

}
function taskSelection5() {
    degenerateList();
    var activitySelector = document.getElementById('about').innerHTML;
    document.getElementById('activityTitle').innerHTML = activitySelector;
    welcome();
}
//Activity functions are above
/////////////////////////////////
//Welcome not
function welcome() {
    var container = document.getElementById("pr");
    var abtxt0 = document.createElement("h2");
    abtxt0.setAttribute("class", "pro");
    container.appendChild(abtxt0);
    var txt = document.createTextNode("Developed By");
    abtxt0.appendChild(txt);
    var abtxt = document.createElement("h4");
    abtxt.setAttribute("class", "pro");
    container.appendChild(abtxt);
    var txt1 = document.createTextNode("Name : Ahmed Bilal");
    abtxt.appendChild(txt1);
    var abtxt1 = document.createElement("h4");
    abtxt1.setAttribute("class", "pro");
    container.appendChild(abtxt1);
    var txt2 = document.createTextNode("Rollno #4682");
    abtxt1.appendChild(txt2);
    var abtxt2 = document.createElement("h4");
    abtxt2.setAttribute("class", "pro");
    container.appendChild(abtxt2);
    var txt3 = document.createTextNode("Section - C");
    abtxt2.appendChild(txt3);
}
//calling welcome note
welcome();
//////////////////////////////////////////////////////////////////////////////////////////////