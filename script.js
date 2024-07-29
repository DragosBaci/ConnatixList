var itemInput = document.getElementById('itemInput');
var addButton = document.getElementById('addButton');
var itemList = document.getElementById('itemList');
var items = JSON.parse(localStorage.getItem('items') || '[]');

var currentId = items.length ? items[items.length - 1].id + 1 : 1;
function saveToLocalStorage() {
    localStorage.setItem('items', JSON.stringify(items));
}

function addItem(text) {
    var item = { id: currentId++, text: text };
    items.push(item);
    saveToLocalStorage();
    renderList();
}

function removeItem(id) {
    items = items.filter(function (item) { return item.id !== id; });
    saveToLocalStorage();
    renderList();
}

function renderList() {
    itemList.innerHTML = '';
    items.forEach(function (item) {
        var listElement = document.createElement('li');
        listElement.className = 'listElement';

        var itemText = document.createElement('p');
        itemText.textContent = item.text;

        var removeButton = document.createElement('button');
        removeButton.className = 'removeButton';
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', function () { return removeItem(item.id); });
        
        listElement.appendChild(itemText);
        listElement.appendChild(removeButton);
        itemList.appendChild(listElement);
    });
}

addButton.addEventListener('click', function () {
    var text = itemInput.value.trim();
    if (text) {
        addItem(text);
        itemInput.value = '';
    }
});

document.addEventListener('DOMContentLoaded', renderList);
