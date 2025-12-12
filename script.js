let expense = [];
let editingID = null;

const form = document.querySelector('#expense-form');
      form.addEventListener("submit", function(event){
      event.preventDefault();

     const name = document.querySelector('#name').value;
     const amount = document.querySelector('#amount').value;
     const items = document.querySelector('#items').value;
     const date = document.querySelector('#date').value;
     const addbtn = document.querySelector('.add-btn');
     
     console.log(name);
     console.log(amount);
     console.log(items);
     console.log(date);

     let newExpense = {
             id: Date.now(),
             name: name,
             amount: amount,
             items: items,
             date: date
     };

     if(editingID != null){
        newExp = expense.find(item => item.id == editingID);
       newExp.name = form.name.value;
       newExp.amount = form.amount.value;
       newExp.items = form.items.value;
       newExp.date = form.date.value;
       addbtn.textContent = "Add Expense";
       editingID = null;  
        renderExpenses();
     } else {
        expense.push(newExpense);
       renderExpenses();
       totalExpense();
    
     }
    console.log(expense);  
    
   form.reset();
});

   function renderExpenses(){
    list.innerHTML = "";
     expense.forEach((expense) => {
     let div = document.createElement('div');
     div.setAttribute("data-id", expense.id);
     div.className = 'card';
     div.innerHTML = ` <p>${expense.name}</p>
                       <p>${expense.amount}</p>    
                        <p>${expense.items}</p> 
                        <p>${expense.date}</p>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    `;
       list.append(div);
         });
   };
     
const list = document.querySelector('#expense-list');
    //DELETE 
    list.addEventListener("click", function(e){
      if (e.target.classList.contains("delete-btn")){
         const card = e.target.closest(".card");
      const id = card.dataset.id;
      expense = expense.filter(item => item.id != id);
          renderExpenses(); 
      } 
    });

    //EDIT
   list.addEventListener("click", function(event){
     if(event.target.classList.contains("edit-btn")){
        const card = event.target.closest(".card");
        const id = card.dataset.id;
        newExp = expense.find(item => item.id == id);
         const addbtn = document.querySelector('.add-btn');
          addbtn.textContent = "Update Expense";
         form.name.value = newExp.name;
         form.amount.value = newExp.amount;
         form.items.value =  newExp.items;
         form.date.value = newExp.date;
        editingID = Number(id);
     }
   });

  function totalExpense(){
        const initialValue = 0;
     const totalAmount = expense.reduce(
       (acc, currentItem) => acc + Number(currentItem.amount), initialValue, 
        );
      const P = document.querySelector("#total-amount");
      P.textContent = totalAmount
  }

  


