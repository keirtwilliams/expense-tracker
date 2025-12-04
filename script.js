 const expense = [];
      //a form element should use submit in a evenlistener
 const form = document.querySelector('#expense-form');
      form.addEventListener("submit", (event) => {
       
        //prevent reload
    event.preventDefault();     
    
             //get the elements value
    const name = document.querySelector('#name').value;
    const amount = document.querySelector('#amount').value;
    const category = document.querySelector('#items').value;
    const date = document.querySelector('#date').value;

           //creating element
     let li = document.createElement('li');
         li.textContent = `${name} - ${amount} - ${category} - ${date}`;

     let list = document.querySelector('#expense-list');
      
     //appending the child
    list.appendChild(li);
    console.log(form);
    
        let newExpense = { 
        id: Date.now(),
        name: name,
        amount: amount,
        category: category,
        date: date,
      }
     
         //push a object into the last array
    expense.push(newExpense);
    console.log(expense);

     
        //reset aftert submitting
     form.reset();

     });

   


