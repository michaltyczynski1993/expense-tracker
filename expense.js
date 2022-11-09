// object declaration and variables
function Fields(title, category, amount, date) {
    this.title = title;
    this.category = category;
    this.amount = amount;
    this.date = date;
}

let fieldsArray = [];
let budget = prompt("What's Your budget?");

window.onload = function () {
    const budgetLabel = document.getElementById("budget");
    budgetLabel.innerText = `Your budget: ${budget}`;
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
    // reset form values
    document.getElementsByTagName("form")[0].reset();
    addTableItem();
    totalAmount();
    checkTotal();

}

function addTableItem() {
    // find table tbody
    let tbodyRef = document.getElementById('table');
    // get last Field object from list
    let lastChild = fieldsArray[fieldsArray.length - 1];

    // Insert a row at the end of table
    var newRow = tbodyRef.insertRow()

    // Insert a cell at the end of the row
    let titleCell = newRow.insertCell(0);
    let categoryCell = newRow.insertCell(1);
    let amountCell = newRow.insertCell(2);
    let dateCell = newRow.insertCell(3);

    // Append a text node to the cell
    let titleText = document.createTextNode(lastChild.title);
    titleCell.appendChild(titleText);

    let categoryText = document.createTextNode(lastChild.category);
    categoryCell.appendChild(categoryText);

    let amountText = document.createTextNode(lastChild.amount + " PLN");
    amountCell.appendChild(amountText);

    let dateText = document.createTextNode(lastChild.date);
    dateCell.appendChild(dateText);
}

function totalAmount() {
    // sum whole amount properties from Fields in array
    let sum = 0;
    for (i = 0; i < fieldsArray.length; i++) {
        sum += parseInt(fieldsArray[i].amount);
    }
    // change innerHTML for span in total label
    const totalSpan = document.getElementById("total");
    totalSpan.innerText = `${sum} PLN`;
}

function checkTotal() {
    const total = document.getElementById("total").value;
    if (budget < total) {
        document.getElementById("total-label").style.color = "red";
    }
}


