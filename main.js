
// 2. we need to import some Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
// 4. 
import { getDatabase, ref, push, onValue, remove  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// 1. create an Object with the database reference url
const appSettings = {
    databaseURL: "https://we-are-the-champions-f0a71-default-rtdb.europe-west1.firebasedatabase.app/"
}

// 3. we want to connect our app with the project that contains our database
const app = initializeApp(appSettings)

// 5. 
const database = getDatabase(app)

// 6. we need to create a reference before we can push data. A ref is any location within the db
const booksInDB = ref(database, "books") // the 2 params are the db and the ref name we want to give it

// our html elements
// const inputFieldEl = document.getElementById("input-field")
// const addButtonEl = document.getElementById("add-button")

// when add button is clicked, add input field contents to our db
// we need to use the push function with our ref and the data to be pushed as arguments
/*
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    // push user input to our db
    push(moviesInDB, inputValue)
    
    console.log(`${inputValue} added to database`)
})
*/
const endorsementsEl = document.getElementById("endorsements")

// firebase sends new data to its clients as soon as it is updated 
// onValue runs everytime there is an update
// data at a moment in time is called a 'snapshot'. we use onValue() to fetch the snapshot
onValue(booksInDB, function(snapshot) {
let booksArray = Object.entries(snapshot.val()) // convert snapshot obj values to an array of 2 item arrays (key: value)
    clearBooksListEl() // stop duplications
    for ( let i = 0; i < booksArray.length; i++ ) {
        let currentBook = booksArray[i] // good practice
        appendBookToBooksListEl(currentBook)
    }
})

function clearBooksListEl() {
    endorsementsEl.innerHTML = ""
}

function appendBookToBooksListEl(book) {
    // let bookID = book[0]
    let bookTitle = book[1] // returns the value from the key/value array 
    
    let newEl = document.createElement("div")
    
    newEl.classList.add("book")
    
    newEl.textContent = bookTitle
    /*
    newEl.addEventListener("dblclick", function() {
        let exactLocationOfBookInDB = ref(database, `books/${bookID}`)
        
        remove(exactLocationOfBookInDB)
    }) */
    endorsementsEl.append(newEl)
}

