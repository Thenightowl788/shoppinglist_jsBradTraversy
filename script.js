let itemForm=document.querySelector('#item-form')
let itemInput=document.querySelector('#item-input')
let itemList=document.querySelector('#item-list')
let itemFilter=document.getElementById('filter')
let clearBtn=document.getElementById('clear')
let formBtn=itemForm.querySelector("button")
let isEditMode=false

//Display  items when reloading page
function displayItems() {
  let itemsFromStorage=getItemsFromStorage()
  itemsFromStorage.forEach(item => addItemToDOM(item))
}

//CLear UI State
checkUI()

function checkUI() {
  let items=itemList.querySelectorAll('li')
  if (items.length !==0){
    clearBtn.style.display= "block"
    itemFilter.style.display= "block"
  } else{
    clearBtn.style.display= "none"
    itemFilter.style.display= "none"
  }
  
}
// filter
function filterItems(e) {
  let items=itemList.querySelectorAll('li')
  let text=e.target.value.toLowerCase();
  items.forEach(item=>{
    let itemName=item.firstChild.textContent.toLowerCase()
if(itemName.indexOf(text) !=-1){
  item.style.display= 'flex'
}else{
  item.style.display= 'none'

}
  })
 
  
}




//add Item
function onAddItemSubmit(e) {
  e.preventDefault()
  let newItem=itemInput.value
  //Validating form
  if (newItem===''){
    alert('Please add somethinggg')
    return;
  }
// Check for edit mode
if (isEditMode){
  let itemToEdit= itemList.querySelector(".edit-mode")
  removeItem(itemToEdit)
  isEditMode=false
  formBtn.innerHTML=`<i class="fa-solid fa-plus"></i> Add Item `
  formBtn.style.backgroundColor="#333"
}else if(checkIfItemExists(newItem)){
  alert("That item already exists")
  return;
}

  addItemToDOM(newItem)
  addItemToStorage(newItem)

  itemInput.value=''
  itemInput.focus()
  checkUI()
}

function addItemToDOM(item) {
    //Add Item
    let li=document.createElement('li')
    li.append(document.createTextNode(item))
    
    let button=createBtn('remove-item btn-link text-red')
    li.append(button)
    // Add Li to the DOM
    itemList.append(li)
}




function createBtn(classes) {
  let btn=document.createElement('button')
  btn.className=classes
  let i=createIcon("fa-solid fa-xmark")
  btn.append(i)
  
  return btn;
}
function createIcon(classes) {
  let i=document.createElement('i')
  i.className=classes
  return i;  
}

// New Function Add Item to localStorage
function addItemToStorage(item) {
  let itemsFromStorage=getItemsFromStorage()
   //add item to arr
  itemsFromStorage.push(item)
  
   //Convert items to string by JSON and add to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage))
  
   console.log(itemsFromStorage);
  }

  //get items from local Storage
  function getItemsFromStorage() {
    let itemsFromStorage=[]
  
    //retrieve items from localStorage and converse to array with JSON.parse
    if (localStorage.getItem("items")=== null){
      itemsFromStorage=[]
    }else{
      itemsFromStorage=JSON.parse(localStorage.getItem("items"))
    }
    return itemsFromStorage;
  }


//REMOVE ITEMS
function onClickItem(e) {
  if (e.target.tagName ==="I"){
   removeItem(e.target.parentElement.parentElement)
  }else if (e.target.tagName ==="LI"){
    setItemToEdit(e.target)
    console.log(e.target);
  }
}

function setItemToEdit(item) {
isEditMode=true
itemList.querySelectorAll("li")
.forEach(i=> i.classList.remove('edit-mode'))

item.classList.add('edit-mode')
formBtn.innerHTML=`<i class="fa-solid fa-pencil"></i> Update Item`
formBtn.style.backgroundColor="#228B22"
itemInput.value=item.innerText



}

function removeItem(item) {
  if (confirm('Are you sure?')){
    item.remove()

    //Remove item from Storage
    removeItemFromStorage(item.textContent)
    console.log(item.textContent);
    checkUI()

  }
}

function removeItemFromStorage(item) {
let itemsFromStorage=getItemsFromStorage()
//filter out item to be remove
itemsFromStorage= itemsFromStorage.filter( (i)=>i !== item)
// console.log(itemsFromStorage +" item to be removed");
//re-set item to local storage
localStorage.setItem("items",JSON.stringify(itemsFromStorage))
}

function clearAll() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild)
  }
  //clear from localStorage
  localStorage.removeItem("items")
  setTimeout(checkUI, 340)
 
}

//check if item exists
function checkIfItemExists(item) {
  let itemsFromStorage=getItemsFromStorage()
  return itemsFromStorage.includes(item)
}



//Even Listeners


function init() {
  itemForm.addEventListener('submit', onAddItemSubmit)
  itemList.addEventListener("click", onClickItem)  
  clearBtn.addEventListener("click", clearAll)
  itemFilter.addEventListener('input', filterItems)
  document.addEventListener("DOMContentLoaded", displayItems)
  
}
init()