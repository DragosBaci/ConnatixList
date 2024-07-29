const itemInput = document.getElementById('itemInput');
const addButton = document.getElementById('addButton');
const itemList = document.getElementById('itemList');

let items = JSON.parse(localStorage.getItem('items') || '[]');
let currentId = items.length ? items[items.length - 1].id + 1 : 1;

function updateLocalStorageList() {
    localStorage.setItem('items', JSON.stringify(items));
}

function addItem(text) {
    let item = { id: currentId++, text: text };
    items.push(item);
    updateLocalStorageList();
    renderList();
}

function removeItem(id) {
    items = items.filter(item => item.id !== id);
    updateLocalStorageList();
    renderList();
}

function createListElement(item) {
    const listElement = document.createElement('li');
    listElement.className = 'listElement';

    const itemText = createItemText(item.text);
    const removeButton = createRemoveButton(item.id);

    listElement.appendChild(itemText);
    listElement.appendChild(removeButton);

    return listElement;
}

function createItemText(text) {
    const itemText = document.createElement('p');
    itemText.textContent = text;
    return itemText;
}

function createRemoveButton(itemId) {
    const removeButton = document.createElement('button');
    removeButton.className = 'removeButton';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeItem(itemId));
    return removeButton;
}

function renderList() {
    itemList.innerHTML = '';
    items.forEach(item => {
        const listElement = createListElement(item);
        itemList.appendChild(listElement);
    });
}


addButton.addEventListener('click', () => {
    var text = itemInput.value.trim();
    if (text) {
        addItem(text);
        itemInput.value = '';
    }
});

document.addEventListener('DOMContentLoaded', renderList);
