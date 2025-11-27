
/*----------------initialization of elements on the page--------------*/

const pairInput = document.getElementById('pairInput');
const pairList = document.getElementById('pairList');
const addBtn = document.getElementById('addBtn');
const deleteBtn = document.getElementById('btnDelete');
const btnSortName = document.getElementById('btnSortName');
const btnSortValue = document.getElementById('btnSortValue');
const checkbox = document.getElementById('checkbox');

let arrayValue = [];
const STORAGE_KEY = 'pairList';

/* ---------------- LOCAL STORAGE FUNCTIONS ---------------- */

function loadData() {                               // Loading Data
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveData() {                               // Save data
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arrayValue));
}

/* ---------------- RENDER LIST ---------------- */

function renderList() {                              // adding elements to the  pairList
    pairList.value = arrayValue.map(v => `${v.name}=${v.value}`).join('\n');
}

/* ---------------- ADD PAIRS ---------------- */

function addPair() {                                  // function for adding new pairs
    const inputValue = pairInput.value.trim();
    const pattern = /^([a-zA-Z0-9а-яА-ЯєЄіІїЇґҐ]+)\s*=\s*([a-zA-Z0-9а-яА-ЯєЄіІїЇґҐ]+)$/;
    const match = inputValue.match(pattern);

    if (!match) {
        alert('Valid format: Name=Value (letters and numbers only)');
        return;
    }

    const [_, name, value] = match;
    arrayValue.push({ name, value });
    pairInput.value = '';
}

/* ---------------- DELETE SELECTED ---------------- */

function deleteSelected() {                             // function for deleting pairs
    const { selectionStart, selectionEnd, value } = pairList;

    if (selectionStart === selectionEnd) {
        alert('Select text to delete');
        return;
    }

    const lines = value.split('\n');
    let charIndex = 0;
    const indexesToDelete = [];

    lines.forEach((line, index) => {
        const lineStart = charIndex;
        const lineEnd = charIndex + line.length;
        if (selectionEnd > lineStart && selectionStart < lineEnd) {
            indexesToDelete.push(index);
        }
        charIndex += line.length + 1;
    });

    for (let i = indexesToDelete.length - 1; i >= 0; i--) {
        arrayValue.splice(indexesToDelete[i], 1);
    }
}

/* ---------------- SORT FUNCTIONS ---------------- */

// functions for sorting by name and values

function sortNames() {
    arrayValue.sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
    );
}

function sortValues() {
    arrayValue.sort((a, b) =>
        a.value.localeCompare(b.value, undefined, { sensitivity: 'base' })
    );
}

/* ---------------- EVENT LISTENERS ---------------- */

function setupMemoryMode() {

    // A function that works when the checkbox is inactive.
    // The function implements CRUD button click events.
    // The function works without saving data to local storage.

    arrayValue = [];
    addBtn.onclick = () => {
        addPair();
        renderList();
    };

    deleteBtn.onclick = () => {
        deleteSelected();
        renderList();
    };

    btnSortName.onclick = () => {
        sortNames();
        renderList();
    };

    btnSortValue.onclick = () => {
        sortValues();
        renderList();
    };
}

function setupStorageMode() {

    // A function that works when the checkbox is inactive.
    // The function implements CRUD button click events.
    // The function works with saving data to local storage.

    arrayValue = loadData();
    renderList();

    addBtn.onclick = () => {
        addPair();
        saveData();
        renderList();
    };

    deleteBtn.onclick = () => {
        deleteSelected();
        saveData();
        renderList();
    };

    btnSortName.onclick = () => {
        sortNames();
        saveData();
        renderList();
    };

    btnSortValue.onclick = () => {
        sortValues();
        saveData();
        renderList();
    };
}

/* ---------------- INITIAL LOAD ---------------- */

window.addEventListener('DOMContentLoaded', () => {    // Initialization on page load
    if (checkbox.checked) {
        setupStorageMode();
    } else {
        setupMemoryMode();
    }
});

/* ---------------- CHECKBOX CHANGE ---------------- */

checkbox.addEventListener('change', () => {      // Reaction to checkbox
    if (checkbox.checked) {
        setupStorageMode();
    } else {
        setupMemoryMode();
    }
});
