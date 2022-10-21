//1. Initializing states

let state = {
    balance: 0,
    income: 0,
    expense: 0,
    transactions: [
        // { id: uniqueId(), name: "Buy Guitar", amount: 5000, type: "income" },
        // { id: uniqueId(), name: "Buy Music Speaker", amount: 500, type: "expense" },
        // { id: uniqueId(), name: "Buy Rope", amount: 100, type: "expense" },
    ]
}

//2. rendering balance, expnese and income temporarily
// document.querySelector("#balance").textContent = `$${state.balance}`;
//     document.querySelector("#income").textContent = `$${state.income}`;
//     document.querySelector("#expense").textContent = `$${state.expense}`;


//Declarations

let myTransaction = document.querySelector(".transactionHistory");
let renderBalance = document.querySelector("#balance");
let renderIncome = document.querySelector("#income");
let renderExpense = document.querySelector("#expense");
let addIncome = document.querySelector("#addIncome");
let addExpense = document.querySelector("#addExpense");
let itemName = document.querySelector("#name");
let itemAmount = document.querySelector("#amount");



// 3. loading tracker
function init() {
    let localData= JSON.parse(localStorage.getItem("myTracker"));
        if(localData !==null){
             state=localData;
        }
    update();
    listeners();
}

init();


// 4. Creating elements, taking data from state array and assigning it to create element, also rending expense,balance, income.

function render() {
    myTransaction.innerHTML = ""; // adding each item after click with empty the container and again loop through it to avoid repetition of lists.

    for (let index = 0; index < state.transactions.length; index++) {

        let lists = state.transactions[index];

        let myList = document.createElement
            ("div");
        myList.classList.add("transactionData");
        myTransaction.appendChild(myList);

        if (lists.type == "income") {
            myList.classList.add("bg-green");
        }
        else if (lists.type == "expense") {
            myList.classList.add("bg-red");
        }

        let myLi = document.createElement("li");
        myLi.append(lists.name);
        myList.appendChild(myLi);

        let myData = document.createElement("div");
        myData.classList.add("data");
        myList.appendChild(myData);


        let listAmount = document.createElement("li");
        listAmount.classList.add("money");
        myData.appendChild(listAmount);
        listAmount.textContent = `$${lists.amount}`;

        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("delete");
        myData.appendChild(deleteBtn);
        deleteBtn.textContent = "X";
        deleteBtn.setAttribute("data-id",lists.id);
        deleteBtn.addEventListener("click",deleteItem);
    }
    
}

//5. balance= income - expense
function update() {
    let myTotalBalance=0;
    let totalIncome = 0;
    let totalExpense = 0;

    for (let index = 0; index < state.transactions.length; index++) {
            if(state.transactions[index].type==="income"){
                totalIncome+= state.transactions[index].amount;
            }else if(state.transactions[index].type==="expense"){
                totalExpense+= state.transactions[index].amount;
            }
    }

    // console.log(totalIncome,totalExpense);

    myTotalBalance = totalIncome - totalExpense;

    renderBalance.textContent = `$${myTotalBalance}`;
    renderIncome.textContent = `$${totalIncome}`;
    renderExpense.textContent = `$${totalExpense}`;

    localStorage.setItem("myTracker",JSON.stringify(state)); // adding local storage so that if user refresh the page, data remains saved.
    
    render();
}

//6. button event listeners

function listeners() {
    addIncome.addEventListener("click", addIncomeData);
    addExpense.addEventListener("click", addExpenseData);
    
}


function addIncomeData() {
    addTransactionHistory(itemName.value, itemAmount.value, "income");
}

function addExpenseData() {
    addTransactionHistory(itemName.value, itemAmount.value, "expense");
}

function addTransactionHistory(thisName, thisAmount, type) {

    if (itemName.value || itemAmount.value !== "") {
        state.transactions.push(
            { id: uniqueId(), name: thisName, amount: Number(thisAmount), type: type }
        )
    } else {
        alert("Please enter the data, cannot accept empty fields.")
    }
    itemAmount.value="";
    itemName.value="";
    update();
}

function deleteItem(e){
    let deleteIndex;
    // let a= state.transactions.filter(item=>{
    //     item.id !== e.target.getAttribute("data-id")
    // });
    // console.log(a);
    // console.log(`id is ${e.target.data-id}`);
    let id= parseInt(e.target.getAttribute("data-id"));
   
    for (let index = 0; index < state.transactions.length; index++) {
        if( id ===  state.transactions[index].id){
            deleteIndex= index;
            break;
        }
    }
    // console.log(deleteIndex);
    state.transactions.splice(deleteIndex,1);
    update();
}


// last: generating random id to target and delete that particular item
function uniqueId() {
    return Math.floor(Math.random() * 1000000);
}