// object declaration and variables
function Fields(title, category, amount, date) {
    this.title = title;
    this.category = category;
    this.amount = amount;
    this.date = date;
}

let sum = 0;
let fieldsArray = JSON.parse(localStorage.getItem('object')) || [];
let budget = JSON.parse(localStorage.getItem("budget")) || prompt("What's Your budget?");

window.onload = function () {
    const budgetLabel = document.getElementById("budget");
    budgetLabel.innerText = `Your budget: ${budget}`;

    // set budget to local storage
    localStorage.setItem("budget", budget);
    totalAmount();
    checkTotal();
    showTable();
}

function addexpense() {
    // get title, category, money value, date
    let title = document.getElementById("title").value;
    let category = document.getElementById("category").value;
    let amount = document.getElementById("amount").value;
    let date = document.getElementById("date").value;

    // create new fields object
    let newValues = new Fields(title, category, amount, date);

    // append new object to fieldsArray
    fieldsArray.push(newValues);
    // save array to localstorage
    localStorage.setItem("object", JSON.stringify(fieldsArray));

    // reset form values
    document.getElementsByTagName("form")[0].reset();

}

function totalAmount() {
    // sum whole amount properties from Fields in array
    for (i = 0; i < fieldsArray.length; i++) {
        sum += parseInt(fieldsArray[i].amount);
    }
    // change innerHTML for span in total label
    const totalSpan = document.getElementById("total");
    totalSpan.innerText = `${sum} PLN`;
}

function checkTotal() {
    const totalLabel = document.getElementById("total-label");
    if (budget < sum) {
        totalLabel.style.backgroundColor = "red";
        totalLabel.style.boxShadow = "0.2rem 0.2rem 1rem #e03939";
    }
}

function showTable() {
    // find table tbody
    let tbodyRef = document.getElementById('table');

    for (i = 0; i < fieldsArray.length; i++) {
        // Insert a row at the end of table
        var newRow = tbodyRef.insertRow()

        // Insert a cell at the end of the row
        let titleCell = newRow.insertCell(0);
        let categoryCell = newRow.insertCell(1);
        let amountCell = newRow.insertCell(2);
        let dateCell = newRow.insertCell(3);

        // Append a text node to the cell
        let titleText = document.createTextNode(fieldsArray[i].title);
        titleCell.appendChild(titleText);

        let categoryText = document.createTextNode(fieldsArray[i].category);
        categoryCell.appendChild(categoryText);

        let amountText = document.createTextNode(fieldsArray[i].amount + " PLN");
        amountCell.appendChild(amountText);

        let dateText = document.createTextNode(fieldsArray[i].date);
        dateCell.appendChild(dateText);
    }
}

function deleteObject() {
    let title = document.getElementById("delete-title").value;
    for (let i = 0; i < fieldsArray.length; i++) {
        if (fieldsArray[i].title == title) {
            fieldsArray.splice(i, 1);
        }
    }
    // localStorage
    localStorage.setItem("object", JSON.stringify(fieldsArray));
    window.location.reload();
}

function clearAll() {
    let newArray = [];
    fieldsArray = newArray;
    localStorage.clear();
    window.location.reload();
}