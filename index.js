import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase,ref,push,onValue,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
    if(snapshot.exists()){
    let itemsArray = Object.entries(snapshot.val())
    clearShoppingList()

    for(let i=0;i<itemsArray.length;i++)
    {
        let currentItem = itemsArray[i]
        let currentItemId = currentItem[0];
        let currentItemValue = currentItem[1];
        appendItemToShoppingListEle(currentItem)
    }
}
else{
    shoppingListEle.innerText="No Items Here...yet"
}
})

function clearShoppingList(){
    shoppingListEle.innerHTML=""
}

function clearInputFieldEle(){
    inputFieldEle.value=""
}

function appendItemToShoppingListEle(item){
    let itemId = item[0]
    let itemValue = item[1]
    // shoppingListEle.innerHTML+=`<li>${itemValue}</li>`
    let newElement = document.createElement("li")
    newElement.textContent = itemValue
    shoppingListEle.append(newElement)
    newElement.addEventListener("click",function(){
      let exactLocationOfIteminDB = ref(dataBase,`Shopping List/${itemId}`)
        remove(exactLocationOfIteminDB)
       // console.log(itemId)
    })
}