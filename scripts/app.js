
function hello()
{
    console.log("Hello World");
} 
       // an example of changing the logic excecution of the code
function saveTask() {
    console.log("Saving task");
      //get values from the form
    const title = $("#txtTitle").val();
    const description = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();
    //create a new task object
      const task = new Task(title,description,color,date,status,budget);

    // const taskData = `Title: ${title}, Description: ${description}, Color: ${color}, Date: ${date}, Status: ${status}, Budget: ${budget}`;
      
    console.log(task);

     //send to server

    $.ajax({
        type: "POST",     //HTTP verb method - create
        url: API,   //API endpoint, IF I USE xml the same URL but with .xml at the end
        data: JSON.stringify(task),   //Convert the task data to JSON string format
        contentType:"application/json", 
        success: function(created) {
            displayTask(task);
            console.log("Task created:", created);
        },
        error: function(error) {
            console.log( error);


        }
    })

}

// minichallenge 
// use put method to update one of the existing entrys
// tip: you must use the ID - url: API/# -- 
// https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks/#
// modify the entry with the ID=1, using a title that says "Hello my name is - your name"

function updateTask() {

    $.ajax({
        type:"put", //put verb: update
        url: API + "/1",  // task ID
        data: JSON.stringify({title:"Hello my name is Fre"} ),
        contentType:"application/json",
        success: function(response) {
            console.log("Response:", response);
        },
        error: function(error) {
            console.log(error);
        }
    })

}



function displayTask(task) {
    let syntax = `
    <div class="task" style="border-color:${task.color}">
      <div class="info">
        <h4>${task.title}</h4>
        <p>${task.description}</p>
      </div>
      <label class="status">${task.status}</label>
      <div class="date-budget">
        <label>due: ${task.date}</label>
        <label>budget: ${task.budget}</label>
      </div>
    </div>`;
    
  // Inject the new HTML into the DOM Tree(append to the list)
   $("#list").append(syntax);
}

//conet to server
//first we need to define the UrL of server
//stablish connection to the server
const API="https://106api-b0bnggbsgnezbzcz.westus3-01.azurewebsites.net/api/tasks";

function loadTasks() {

    $.ajax({
        type:"GET",  //HTTP method - read
        url: API,  //low task function
        datatype: "json",  //Expected format,  tell sistem that we expect a JSON 
        success: function(data) {
            console.log("Data received", data);},

        error: function(error) {
        console.log("Error", error);}


    })   
}




// an example of changing the logic excecution of the code
function init() { 
    hello();
    console.log("hello this is the DOM")
     
     //hook event
    $("#btnSave").click(saveTask);
     
    // load data from the server
    loadTasks();
}



//force my logic to run the HTML an CSS first- and when they finish the logic will be excecuted
window.onload = init; //this will run the logic immediately and not wait for the HTML and CSS to load.
