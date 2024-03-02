
var siteName= document.getElementById("siteName");
var siteURL= document.getElementById("siteURL");

var bookmarkList=[];




var addBtn =document.getElementById("addBtn");
var indexUpdate=0;


//-----------------------------------------------//

//Retrieve 

//array of object is JSON --> javascript object notation
if(localStorage.getItem("items")!=null){

    bookmarkList=JSON.parse(localStorage.getItem("items"));
    displayData();
}
1
//Create

function addBookmark(){

   var Site={
    name: siteName.value,
    url: siteURL.value,
    
   }
  if (validateForm()){

    bookmarkList.push(Site);
    localStorage.setItem("items",JSON.stringify(bookmarkList))
         clearForm();
         displayData();
  }
  

}

function validateForm(){

    var isNameValid=validationName(siteName.value);
    var isSiteValid=isUrlValid(siteURL.value);
    if(!isNameValid && !isSiteValid){
        alert("Enter more than 3 characters in Name and URL entered is wrong")
        return false;
       }else if(!isNameValid){
        alert("Name entered is less than 3 characters")
        return false;
       }else if(!isSiteValid){
        alert("URL entered is wrong")
        return false;
       }
       
       
return true;
}



function clearForm() {

    siteName.value="";
    siteURL.value="";

}

//Display


function displayData(){

    var cartona="";
    for( var i=0; i<bookmarkList.length ; i++ ){
        cartona+= ` <tr>
        <td> ${i}</td>
        <td> ${bookmarkList[i].name}</td>
        
        <td><button class= "btn btn-secondary btn-sm" onclick =  visitItem(${i}) ">  <i class="fa-solid fa-eye pe-2"></i> visit</button> </td>
        <td><button class= "btn btn-secondary btn-sm" onclick =  deleteItem(${i}) "> <i class="fa-solid fa-trash-can"></i> Delete</button> </td>



    </tr> `
    }

   document.getElementById("tablebody").innerHTML=cartona;
}

//visit 

function visitItem(index) {
    window.open(`https://${bookmarkList[index].url}`);

  }
//Delete

function deleteItem(index){
    bookmarkList.splice(index,1);
    console.log(bookmarkList)
    localStorage.setItem("items",JSON.stringify(bookmarkList));
   
    displayData();  
}


function isUrlValid(siteURL) {
    var res = siteURL.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    if(res == null)
        return false;
    else
        return true;
}

function validationName(siteName){

  return siteName.length>3
}