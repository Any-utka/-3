let transactions = []; // Массив для хранения транзакций

/**
 * Функция для отображения транзакции в таблице.
 * @param {Object} transaction - Транзакция для отображения.
 */
function renderTransaction(transaction) {
    const tableBody = document.getElementById('transactionTableBody');
    const newRow = tableBody.insertRow();

    newRow.innerHTML = `
        <td>${transactions.length}</td>
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${transaction.description.substring(0, 20)}</td>
        <td><button onclick="deleteTransaction(${transactions.length - 1})">Удалить</button></td>
    `;


    if (transaction.amount >= 0) {
        newRow.style.backgroundColor = 'lightgreen';
    } else {
        newRow.style.backgroundColor = 'salmon';
    }

    calculateTotal(); // Пересчет общей суммы после добавления транзакции
}

function addTransaction(event) {
    event.preventDefault();

    const date = document.getElementById('dateInput').value;
    const amount = parseFloat(document.getElementById('amountInput').value);
    const category = document.getElementById('categoryInput').value;
    const description = document.getElementById('descriptionInput').value;

    const newTransaction = {
        date: date,
        amount: amount,
        category: category,
        description: description
    };

    transactions.push(newTransaction);
    renderTransaction(newTransaction);

    // Очистка полей формы
    document.getElementById('dateInput').value = '';
    document.getElementById('amountInput').value = '';
    document.getElementById('categoryInput').value = 'Доход'; // Сброс категории на "Доход"
    document.getElementById('descriptionInput').value = '';
}

function deleteTransaction(index) {
    transactions.splice(index, 1);
    redrawTable();
    calculateTotal(); // Пересчет общей суммы после удаления транзакции
}

function redrawTable() {
    const tableBody = document.getElementById('transactionTableBody');
    tableBody.innerHTML = '';
    transactions.forEach((transaction, index) => {
        renderTransaction(transaction, index);
    });
}

function calculateTotal() {
    let total = 0;
    transactions.forEach(transaction => {
        total += transaction.amount;
    });

    const totalAmountElement = document.getElementById('totalAmount');
    totalAmountElement.textContent = `Общая сумма транзакций: ${total}`;
}

// Обработчик события при отправке формы
const form = document.getElementById('transactionForm');
form.addEventListener('submit', addTransaction);
