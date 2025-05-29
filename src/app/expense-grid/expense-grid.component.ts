import { Component, effect, inject, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ExpanseService } from '../services/expanse.service';
import { Expense } from '../models/expense.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-expense-grid',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
  ],
  templateUrl: './expense-grid.component.html',
  styleUrl: './expense-grid.component.css',
})
export class ExpenseGridComponent {
  expenseService = inject(ExpanseService);

  snackBar = inject(MatSnackBar);
  displayedColumns: string[] = [
    'id',
    'title',
    'category',
    'amount',
    'date',
    'actions',
  ];
  dataSource = new MatTableDataSource<Expense>([]);
  totalItems: number = 0;
  pageSize: number = 5;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  expenses = this.expenseService.expenses;

  constructor() {
    this.expenseService.getExpenses();

    effect(() => {
      const expenses = this.expenses();
      this.dataSource.data = expenses;
      this.totalItems = expenses.length;
    });
  }

  onPageChange(e: any) {
    this.pageSize = e.pageSize
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
  }
}
