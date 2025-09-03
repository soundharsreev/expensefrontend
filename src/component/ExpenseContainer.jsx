import React,{useState,useEffect} from 'react'
import Form from './Form'
import History from './history'
import {v4 as uid} from 'uuid'
import Balancecontainer from './Balancecontainer'




function ExpenseContainer(){
      const EXPENSE=[]

 const[expense, setexpense]=useState([])
 async function addexpense(title, amount) {
  try
   { 
    const response = await fetch("https://expensetracker-1gsx.onrender.com/post",
     { method: "POST", 
      headers: { "Content-Type": "application/json" },
       body: JSON.stringify({ title, amount })
       });
        const data = await response.json();
         console.log(data) 

        setexpense([...expense, data.expense]);

        }catch (error) 
        {
           console.error("Error creating expense:", error);
           }
}
async function getExpenses(){
  const response = await fetch("https://expensetracker-1gsx.onrender.com/get")
  const data = await response.json();
  setexpense(data.expense);
}
useEffect(()=>{
  getExpenses();
},[])


   async function deleteExpense(id){  
     await fetch(`https://expensetracker-1gsx.onrender.com/delete/${id}`,{
      method:"DELETE",
     });
     getExpenses()

    }
  return (
    <div className='expense-container'>
      <Balancecontainer expense={expense}/>
        <Form addExpense={addexpense}/>
        <History expense={expense}  deleteExpense={deleteExpense}/>
    </div>
  );
}

export default ExpenseContainer