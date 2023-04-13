import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,push,onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://cart-app-2e0d4-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
    
const app = initializeApp(appSettings)
const dataBase = getDatabase(app)
const shoppingListinDB = ref(dataBase,"Shopping List")

const inputFieldEle = document.getElementById("input-field")
const addBtnEle = document.getElementById("addButton")
const shoppingListEle = document.getElementById("shopping list")

addBtnEle.addEventListener("click",function(){
    let inputValue=inputFieldEle.value

    push(shoppingListinDB,inputValue)

    clearInputFieldEle()
})

onValue(shoppingListinDB,function(snapshot){
    clearShoppingList()
    let itemsArray = Object.values(snapshot.val())
    for(let i=0;i<itemsArray.length;i++)
    {
        let currentItem = itemsArray[i]
        appendItemToShoppingListEle(currentItem)
        //console.log(currentItem)
    }
})

function clearShoppingList(){
    shoppingListEle.innerHTML=""
}

function clearInputFieldEle(){
    inputFieldEle.value=""
}

function appendItemToShoppingListEle(itemValue){
    shoppingListEle.innerHTML+=`<li>${itemValue}</li>`
}