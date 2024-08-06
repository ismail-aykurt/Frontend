const ad_input = document.getElementById("ad-input");
const soyad_input = document.getElementById("soyad-input");
const num_input = document.getElementById("num-input");
const delAll_buton = document.getElementById("delAll-buton");
const create_buton = document.getElementById("create-buton");
const alt_container = document.getElementById("tablo-ekle");

const clearInputs = () => {
    ad_input.value = '';
    soyad_input.value = '';
    num_input.value = '';
}

clearInputs();

delAll_buton.addEventListener('click', hepsiniSil);
create_buton.addEventListener('click', tabloOlustur);

function hepsiniSil() {
    alt_container.textContent = '';
}

function tabloOlustur() {
    var tabloDiv = document.createElement("div");
    tabloDiv.className = "divler";  

    var table = document.createElement("table");
    var baslik = table.createTHead();
    var row = baslik.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);

    cell1.innerHTML = "<b>Name</b>";
    cell2.innerHTML = "<b>Surname</b>";
    cell3.innerHTML = "<b>Number</b>";
    cell4.innerHTML = "<b>Delete</b>";

    tabloDiv.appendChild(table);

    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete Table';
    deleteButton.onclick = function () {
        tabloDiv.remove();
    };

    var clearButton = document.createElement('button');
    clearButton.innerHTML = 'Clear';
    clearButton.onclick = function () {
        var rows = table.rows;
        for (var i = 1; i < rows.length; i++) {
            rows[i].cells[0].innerHTML = "";
            rows[i].cells[1].innerHTML = "";
            rows[i].cells[2].innerHTML = "";
        }
    };

    var addButton = document.createElement('button');
    addButton.innerHTML = 'Add';
    addButton.onclick = function () {
        const adInput = ad_input.value.trim();
        const soyadInput = soyad_input.value.trim();
        const numInput = num_input.value.trim();

        if (adInput === '' || soyadInput === '' || numInput === '') {
            alert("Lütfen bilgileri eksiksiz giriniz!");
            return;
        }

        var newRow = table.insertRow();
        const newCell1 = newRow.insertCell();
        const newCell2 = newRow.insertCell();
        const newCell3 = newRow.insertCell();
        const newCell4 = newRow.insertCell();

        newCell1.textContent = adInput;
        newCell2.textContent = soyadInput;
        newCell3.textContent = numInput;
        newCell4.innerHTML = '<button onclick="deleteRow(this)">Delete</button>';

        clearInputs();
    };

    tabloDiv.appendChild(deleteButton);
    tabloDiv.appendChild(clearButton);
    tabloDiv.appendChild(addButton);

    alt_container.appendChild(tabloDiv);
}

function deleteRow(button) {
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}
