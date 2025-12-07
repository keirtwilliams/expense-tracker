let expense = [];


const form = document.querySelector('#expense-form');
      form.addEventListener("submit", function(event){
      event.preventDefault();

     const name = document.querySelector('#name').value;
     const amount = document.querySelector('#amount').value;
     const items = document.querySelector('#items').value;
     const date = document.querySelector('#date').value;

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

     expense.push(newExpense);
     console.log(expense);
     renderExpenses();
});

const list = document.querySelector('#expense-list');
   function renderExpenses(){
     expense.forEach((expense) => {
     let div = document.createElement('div');
     div.className = 'card';
     div.innerHTML = ` <p>${expense.name}</p>
                       <p>${expense.amount}</p>    
                        <p>${expense.items}</p> 
                        <p>${expense.date}</p>
                    `;
       list.append(div);
         });
   };




