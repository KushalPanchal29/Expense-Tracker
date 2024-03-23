import React from 'react'
import { useForm } from "react-hook-form"
import List from './List';
import { default as api } from '../store/apiSlice'

export default function Form() {

  const{register, handleSubmit, resetField} = useForm();  
  const[addTransaction] = api.useAddTransactionMutation();

  const onSubmit = async (data) => {
    if(!data) return {};
    await addTransaction(data).unwrap();
    resetField('name');
    resetField('amount');
  }

  return (
    <div className='form max-w-sm mx-auto w-96'>
        <h1 className='font-bold pb-4 text-xl'>Transactions</h1>

        <form id='form' onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-4'>
                <div className='input-group'>
                    <input type='text' {...register('name')} placeholder='Salary, House Rent, SIP' className='form-input appearance-none block w-full bg-white-200 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none'></input>
                    <select {...register('type')} className='form-input appearance-none my-5 block w-full bg-white-200 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'>
                        <option value="Investment" defaultValue>Investment</option>
                        <option value="Expense" defaultValue>Expense</option>
                        <option value="Savings" defaultValue>Savings</option>
                    </select>
                    <div className='input-group'>
                        <input type='text' {...register('amount')} placeholder='Amount' className='form-input h-12 my-5 appearance-none block w-full bg-white-200 text-gray-700 border border-gray-500 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'></input>
                    </div>
                    <div className='submit-btn'>
                        <button className='border py-2 text-white bg-indigo-500 w-full'>Make Transaction</button>
                    </div>
                </div>
            </div>
        </form>
        <List>
        </List>
    </div>
  )
}
