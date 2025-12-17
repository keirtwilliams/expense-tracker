let expense = [];
let editingID = null;
  



    //inserting data into expense[]
const form = document.querySelector('#expense-form');
      form.addEventListener("submit", function(eventForm){
      eventForm.preventDefault();


       if(Validation() == false){
         return form;
       }  else {
        renderExpenses();
       }

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
     } else {
       expense.push(newExpense);
       renderExpenses();
       totalExpense();
         }  
   form.reset();
});

   
    function Validation(){
    let ValidateName = document.querySelector("#name").value;
    let ValidateAmount = document.querySelector("#amount").value;
    let ValidateItems = document.querySelector("#items").value;
    let ValidateDate = document.querySelector("#date").value;
    
    if(ValidateName === ""){
      alert("Name must be filled out");
      return false;
    } else if (ValidateName.length < 3){
      alert("Atleast put 5-16 characters");
      return false;
    }
    if(ValidateAmount === ""){
      alert("Amount must be filled out");
      return false;
    }
    if(ValidateItems === ""){
      alert("Category must be filled out");
      return false;
    }
    if(ValidateDate === ""){
      alert("Date must be filled out");
      return false
    } 
      return true;
    }
    
    
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
    
    list.addEventListener("click", function(e){
      if (e.target.classList.contains("delete-btn")){
         const card = e.target.closest(".card");
      const id = card.dataset.id;
      expense = expense.filter(item => item.id != id);
          renderExpenses(); 
      } 
    });

    //modifying of array
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
       
   //expense calculation thru reduce()
  function totalExpense(){
        const initialValue = 0;
     const totalAmount = expense.reduce(
       (acc, currentItem) => acc + Number(currentItem.amount), initialValue, 
        );
      const P = document.querySelector("#total-amount");
      P.textContent = totalAmount;
  }
  
  


