import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: string;
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter((transaction: Transaction) => {
        return transaction.type === 'income';
      })
      .map((transaction: Transaction) => transaction.value)
      .reduce((acc: number, cur: number) => {
        return acc + cur;
      });
    const outcome = this.transactions
      .filter((transaction: Transaction) => {
        return transaction.type === 'outcome';
      })
      .map((transaction: Transaction) => transaction.value)
      .reduce((acc: number, cur: number) => {
        return acc + cur;
      });
    const balance = income - outcome;

    return {
      income,
      outcome,
      balance,
    };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({title, value, type});
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
