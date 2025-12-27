let expense = [];
let editingID = null;
loadExpensesFromStorage();

    //inserting data into expense[]
const form = document.querySelector('#expense-form');
      form.addEventListener("submit", function(eventForm){
      eventForm.preventDefault();

     const name = document.querySelector('#name').value;
     const amount = document.querySelector('#amount').value;
     const items = document.querySelector('#items').value;
     const date = document.querySelector('#date').value;
     const addbtn = document.querySelector('.add-btn');

      const isValid = Validation(name,amount,items,date);
        if(!isValid){
          return;
        } 
     let newExpense = {
             id: Date.now(),
             name: name,
             amount: amount,
             items: items,
             date: date
     };
      
     if(editingID != null){
       const newExp = expense.find(item => item.id == editingID);
       newExp.name = form.name.value;
       newExp.amount = form.amount.value;
       newExp.items = form.items.value;
       newExp.date = form.date.value;
       addbtn.textContent = "Add Expense";
       editingID = null; 
     } else {
          expense.push(newExpense);
         }  
   CommitState();
   form.reset();
});

      //Basic Validation
    function Validation(name, amount, items, date){
    if(name === ""){
      alert("Name must be filled out");
      return false;
    } 

    if(amount === ""){
      alert("Amount must be filled out");
      return false;
    }
    if(items === ""){
      alert("Category must be filled out");
      return false;
    }
    if(date === ""){
      alert("Date must be filled out");
      return false
    } 
      return true;
    }
    
      //render data
   function renderExpenses(){
    list.innerHTML = "";
     expense.forEach((expense) => {
     let div = document.createElement('div');
     div.setAttribute("data-id", expense.id);
     div.className = 'card';
     div.innerHTML = ` <h1>${expense.name}</h1>
                       <h3>₱${expense.amount}</h3>    
                        <p>${expense.items}</p> 
                        <p>${expense.date}</p>
                       <div class="actions">
                            <button class="edit-btn">Edit</button>
                           <button class="delete-btn">Delete</button>
                        </div>
                    `;
       list.append(div);
         });
   };
      
       //DELTE
const list = document.querySelector('#expense-list');
    list.addEventListener("click", function(e){
      if (e.target.classList.contains("delete-btn")){
         const card = e.target.closest(".card");
      const id = card.dataset.id;
      expense = expense.filter(item => item.id != id);
        CommitState();
      } 
    });

    //modifying of array
   list.addEventListener("click", function(event){
     if(event.target.classList.contains("edit-btn")){
        const card = event.target.closest(".card");
        const id = card.dataset.id;
       const newExp = expense.find(item => item.id == id);
         const addbtn = document.querySelector('.add-btn');
          addbtn.textContent = "Update Expense";
         form.name.value = newExp.name;
         form.amount.value = newExp.amount;
         form.items.value =  newExp.items;
         form.date.value = newExp.date;
        editingID = Number(id);
     }
     CommitState();
   }); 

       
   //expense calculation thru reduce()
  function totalExpense(){
        const initialValue = 0;
     const totalAmount = expense.reduce(
       (acc, currentItem) => acc + Number(currentItem.amount), initialValue, 
        );
      const P = document.querySelector("#total-amount");
      P.textContent = totalAmount;
  }
  
        
  function loadExpensesFromStorage(){    
     let setExpense = localStorage.getItem("expense");
   if(setExpense){
     expense = JSON.parse(setExpense);
      }
      }

 function saveExpensesToStorage() {
  localStorage.setItem("expense", JSON.stringify(expense));
}


//filtering
function getFilteredExpense(){
  return expense.filter(exp => {
      
    if(selectCategory != "All" && exp.items !== selectCategory){
      return false;
    }

    if(searchText != "" && !exp.name.toLowerCase().includes(searchText.toLowerCase())){
      return false;
    }
    return true;
  });
}

function CommitState(){
   renderExpenses();
  saveExpensesToStorage();
  totalExpense();
}