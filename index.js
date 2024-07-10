import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js"
import { getDatabase,
         ref,
         push,
         onValue,
         remove } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://leads-tracker-app-a4479-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref(database, "fm")

const fmInputEl = document.getElementById("fm-input")
const addButtonEl = document.getElementById("add-button")
const deleteAllButtonEl = document.getElementById("delete-all-button")
const ulEl = document.getElementById("fm-list")

function render(fm) {
    let listItems = ""
    for (let i = 0; i < fm.length; i++) {
        listItems += `
            <li>${fm[i]}</li>
        `
    }
    ulEl.innerHTML = listItems
}

onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const fm = Object.values(snapshotValues)
        render(fm)
    } 
})

deleteAllButtonEl.addEventListener("dblclick", function() {
    // Remove the last child element (bottom-most) from ulEl
    ulEl.removeChild(ulEl.lastElementChild);

    // Optionally, if you also want to remove it from the database or other reference
    // remove(referenceInDB);
});


addButtonEl.addEventListener("click", function() {
    push(referenceInDB, fmInputEl.value)
    fmInputEl.value = ""
})