
// we need to import some Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// create an Object with the database reference url
const appSettings = {
    databaseURL: "https://we-are-the-champions-f0a71-default-rtdb.europe-west1.firebasedatabase.app/"
}

// we want to connect our app with the project that contains our database
const app = initializeApp(appSettings)
const database = getDatabase(app)

// we need to create a reference before we can push data. A ref is any location within the db
const endorsementsInDB = ref(database, "endorsements") // the 2 params are the db and the ref name we have given it

// our html elements
 const inputFieldEl = document.getElementById("input-field")
 const publishButtonEl = document.getElementById("publish-btn")
 const endorsementsEl = document.getElementById("endorsements")

// when publish button is clicked, add input field contents to our db
// we need to use the push function with our ref and the data to be pushed as arguments

publishButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    // push user input to our db
    push(endorsementsInDB, inputValue)
    
})

// firebase sends new data to its clients as soon as it is updated 
// onValue runs everytime there is an update
// data at a moment in time is called a 'snapshot'. we use onValue() to fetch the snapshot
onValue(endorsementsInDB, function(snapshot) {
let endorsementsArray = Object.entries(snapshot.val()) // convert snapshot obj values to an array of 2 item arrays (key: value)
    clearEndorsementsListEl() // stop duplications
    for ( let i = 0; i < endorsementsArray.length; i++ ) {
        let currentEndorsement = endorsementsArray[i] // good practice
        appendEndorsementToEndorsementsListEl(currentEndorsement)
    }
})

function clearEndorsementsListEl() {
    // endorsementsEl.value = ""
    endorsementsEl.innerHTML = ""
}
// add our endorsement to the page
function appendEndorsementToEndorsementsListEl(endorsement) {
    let endorsementID = endorsement[0] // returns the key from the key/value array 
    let endorsementTitle = endorsement[1] // returns the value from the key/value array 
    
    let newEl = document.createElement("div")
    
    newEl.classList.add("endorsement")
    
    newEl.textContent = endorsementTitle

    // allow us to remove item by double-clicking it
    newEl.addEventListener("dblclick", function() {
        let exactLocationOfEndorsementInDB = ref(database, `endorsements/${endorsementID}`)
        
        remove(exactLocationOfEndorsementInDB)
    })

    endorsementsEl.append(newEl)
}

