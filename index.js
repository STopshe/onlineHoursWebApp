    
  document.getElementById( 
    "info").style.display = "none"; 

  document.getElementById( 
    "backBTN").style.display = "none"; 

    
 


    function checkNum(){

      document.getElementById( 
        "theBTN").style.display = "none";


        document.getElementById( 
          "load").style.display = "initial";


      var telNum="+88"+document.getElementById("phone").value;
      //for invalid number (add code)


      //if valid number entered
      var ref = firebase.database().ref("online_hour_monthly_contractor/May");
      ref.once("value")
      .then(function(snapshot) {
      var hasNum = snapshot.hasChild(telNum); 
      if (hasNum){
        //if number exists
        onPress(telNum);
      } else{
        //if number not in database

        document.getElementById( 
          "load").style.display = "none";

        document.getElementById(
          "theBTN").style.display = "initial";

        $('#t1').toast('show');
      }
    
     });
      
    }
   


//on pressing search
function onPress(num){
  //01302275688
  

//get current month
var date = new Date();
var m = new Array();
m[0] = "January";
m[1] = "February";
m[2] = "March";
m[3] = "April";
m[4] = "May";
m[5] = "June";
m[6] = "July";
m[7] = "August";
m[8] = "September";
m[9] = "October";
m[10] = "November";
m[11] = "December";
var month = m[date.getMonth()];

//database reference
var ref = firebase.database().ref("online_hour_monthly_contractor/"+month+"/"+num);

//looping through list of data    
ref.once('value', function(snapshot) {
  snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;

    var app_duration = childSnapshot.val().app_duration;
    //checking if app duration negative
    var mCheck1 = app_duration.substring(0, 1);
    //console.log(mCheck1);
    var neg = "-"
    var result = mCheck1.localeCompare(neg);
    

    if(result!=0){

    var internet_duration = childSnapshot.val().internet_duration;
    //console.log(internet_duration);

    var offline = formatDate(childSnapshot.val().offline);
    //console.log(offline);

    var online = formatDate(childSnapshot.val().online);
    //console.log(online);



    //creating HTML elements
    var $div1 = $("<div>", {"class": "card"});
    $("#info").append($div1);
    var $ul1 = $("<ul>", {"class": "list-group list-group-flush"});
    $div1.append($ul1);
    var $li1 = $("<li>", {"class": "list-group-item lead", "text": "App Duration: "+app_duration});
    $ul1.append($li1);
    var $li2 = $("<li>", {"class": "list-group-item lead", "text": "Internet Duration: "+internet_duration});
    $ul1.append($li2);
    var $li3 = $("<li>", {"class": "list-group-item lead", "text": "Online at: "+online});
    $ul1.append($li3);
    var $li4 = $("<li>", {"class": "list-group-item lead", "text": "Offline at: "+offline});
    $ul1.append($li4);
    var $a = $("<a>", {"class": "btn btn-primary", "data-toggle": "collapse", "href": "#collapseExample", "role": "button", "aria-expanded": "false", "aria-controls": "collapseExample"});
    $ul1.append($a);
    var $li = $("<li>", {"class": "btn btn-primary", "text": "Internet Sessions"});
    $a.append($li);
    var $div = $("<div>");
    $("#info").append($div);

    //looping through internetSessions
    var netRef = firebase.database().ref("online_hour_monthly_contractor/"+month+"/"+num+"/"+childKey+"/internetSessions");
    netRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      
      var duration = childSnapshot.val().duration;
      // console.log(duration);

    //checking if app duration negative
    var mCheck2 = duration.substring(0, 1);
    var result2 = mCheck2.localeCompare(neg);

    if(result2!=0){

      var startTime = formatDate(childSnapshot.val().startTime);
      // console.log(startTime);
    
      var stopTime = formatDate(childSnapshot.val().stopTime);
      // console.log(stopTime);
      

      //creating HTML elements
      var $div2 = $("<div>", {id: "collapseExample", "class": "collapse"});
      $div.append($div2);
      var $div3 = $("<div>", {"class": "card"});
      $div2.append($div3);
      var $ul = $("<ul>", {"class": "list-group list-group-flush"});
      $div3.append($ul);
      var $li5 = $("<li>", {"class": "list-group-item", "text": "Duration: "+duration});
      $ul.append($li5);
      var $li6 = $("<li>", {"class": "list-group-item", "text": "Start Time: "+startTime});
      $ul.append($li6);
      var $li7 = $("<li>", {"class": "list-group-item", "text": "Stop Time: "+stopTime});
      $ul.append($li7);
      
    }

  });
});


}


  });//foreach ends here
});

document.getElementById( 
  "hide").style.display = "none";

document.getElementById( 
  "info").style.display = "initial";

document.getElementById( 
  "backBTN").style.display = "initial"; 

}

function formatDate(givenDate){
  var d = new Date(givenDate);
        month = '' + (d.getMonth() + 1);
        day = '' + d.getDate();
        year = d.getFullYear();
        hour = d.getHours();
        min = d.getMinutes();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var str = ""+day+"/"+month+"/"+year+"  "+hour+":"+min;
    return str;
  
}

function goBack(){
  location.reload();
}