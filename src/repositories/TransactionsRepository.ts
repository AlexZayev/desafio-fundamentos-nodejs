import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    const transactions = this.transactions;

    return transactions;
  }

  public getBalance(): Balance {
    const transactions = this.transactions;
    //inicializa objeto
    const balance: Balance = { income: 0, outcome: 0, total: 0 };

    //calcula o saldo
    transactions.map(t => {
      if (t.type === 'income') {
        balance.income += t.value;
      } else if (t.type === 'outcome') {
        balance.outcome += t.value;
      }
      balance.total = balance.income - balance.outcome;
    });
    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    //console.log({ title, value, type });

    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
