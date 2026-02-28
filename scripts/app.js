function hello() {
    console.log("Hello world");
}

// an example of changing the logic excecution of the code
function init() { console.log("hello this is the DOM")
    hello();
 }
//force my logic to run the HTML an CSS first- and when they finish the logic will be excecuted
window.onload = init; // if i udes the parenticis it will run the logic immediately and not wait for the HTML and CSS to load.

