import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    //verifica tipos de movimentação
    if (type != 'outcome' && type != 'income') {
      throw Error('The value type must be "income" or "outcome" ');
    }
    const transactionsRepository = this.transactionsRepository;

    const balance = transactionsRepository.getBalance();

    //verifica saldo antes de criar uma nova transação
    if (balance.total < value && type == 'outcome') {
      throw Error('your balance is insufficient for this operation');
    }
    // cria uma nova transação
    const transaction = transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
