import { Injectable, signal } from '@angular/core';
import { Expense } from '../models/expense.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExpanseService {

  private expemseSignal = signal<Expense[]>([]);

  constructor(private http: HttpClient) { }

  getExpenses() {
    this.http.get<Expense[]>('http://localhost:3000/expenses')
      .subscribe(expenses => {
        this.expemseSignal.set(expenses);
      });
  }

  get expenses(){
    return this.expemseSignal;
  }

  //ADD expense
  addExpense(expense: Expense) {
    this.http.post<Expense>('http://localhost:3000/expenses', expense)
      .subscribe(() => this.expenses() )
  }

  //delete expense
  deleteExpense(id: number) {
    this.http.delete(`http://localhost:3000/expenses/${id}`)
    .subscribe(() => this.expenses())
  }

  //update expense
  updateExpense(id: string, updatedExpense: Expense){
    this.http.put<Expense>(`http://localhost:3000/expenses/${id}`, updatedExpense)
      .subscribe(() => this.expenses())
  }

  //get expense by id
  getExpenseById(id: number) {
    return this.expemseSignal().find(expense => expense.id === id);
  }
}
