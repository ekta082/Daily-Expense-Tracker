const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const addBtn = document.getElementById("add-btn");
const expenseList = document.getElementById("expense-list");
const totalAmount = document.getElementById("total-amount");
const filterCategory = document.getElementById("filter-category");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function updateLocalStorage() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function updateFilterOptions() {
  const categories = [...new Set(expenses.map(e => e.category))];
  filterCategory.innerHTML = `<option value="all">All</option>`;
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    filterCategory.appendChild(option);
  });
}

function renderExpenses() {
  expenseList.innerHTML = "";
  const selectedCategory = filterCategory.value;
  let filtered = expenses;

  if (selectedCategory !== "all") {
    filtered = expenses.filter(e => e.category === selectedCategory);
  }

  let total = 0;
  filtered.forEach((expense, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>₹${expense.amount}</span>
      <span>${expense.category}</span>
      <span>${expense.date}</span>
      <button onclick="deleteExpense(${index})">❌</button>
    `;
    expenseList.appendChild(li);
    total += parseFloat(expense.amount);
  });
  totalAmount.textContent = total.toFixed(2);
}

function addExpense() {
  const amount = amountInput.value;
  const category = categoryInput.value.trim();
  const date = dateInput.value;

  if (!amount || !category || !date) {
    alert("Please fill all fields!");
    return;
  }

  const expense = { amount, category, date };
  expenses.push(expense);
  updateLocalStorage();
  updateFilterOptions();
  renderExpenses();

  amountInput.value = "";
  categoryInput.value = "";
  dateInput.value = "";
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  updateLocalStorage();
  updateFilterOptions();
  renderExpenses();
}

addBtn.addEventListener("click", addExpense);
filterCategory.addEventListener("change", renderExpenses);

updateFilterOptions();
renderExpenses();
