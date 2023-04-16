import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
  databaseURL: 'https://pantry-pal-70e3f-default-rtdb.firebaseio.com/'
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListDB = ref(database, 'shoppingList')

const addButton = document.getElementById('add-button')
const inputText = document.getElementById('input-field')
const shoppingList = document.getElementById('shopping-list')
const clearListButton = document.getElementById('clear-list-button')

addButton.addEventListener('click', function() {
  if(inputText.value == '') {
    window.confirm('Add something!')
  } else {
    let inputValue = inputText.value

    push(shoppingListDB, inputValue)

    clearInput()
  }
})

clearListButton.addEventListener('click', function() {
  remove(shoppingListDB)
})

onValue(shoppingListDB, function(snapshot) {
  if(snapshot.exists()) {
    let itemsArray = Object.entries(snapshot.val())

    clearShoppingList()
  
    for(let i = 0; i < itemsArray.length; i++) {
      let currentItem = itemsArray[i]
      let currentItemID = currentItem[0]
      let currentItemValue = currentItem[1]
  
      addListItem(currentItem)
    }
  } else {
    shoppingList.innerHTML = 'No items here... yet'
  }

  
})

function clearShoppingList() {
  shoppingList.innerHTML = ""
}

function addListItem(item) {
  let itemID = item[0]
  let itemValue = item[1]
  let newEl = document.createElement('li')
  newEl.textContent = itemValue

  newEl.addEventListener('click', function() {
    let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`)
    newEl.style.textDecoration = 'line-through'
    // remove(exactLocationOfItemInDB)
  })

  shoppingList.append(newEl)
}

function clearInput() {
  inputText.value = ''
}