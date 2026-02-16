import type { Transaction, TransactionType, TransactionCategory } from '@/types/transaction'

/**
 * Descriptions for income transactions
 */
const incomeDescriptions = [
    'Salário mensal',
    'Freelance - Projeto web',
    'Freelance - Design',
    'Investimento - Dividendos',
    'Venda de produto',
    'Consultoria',
    'Bônus',
    'Comissão',
    'Rendimento de investimento',
    'Cashback',
]

/**
 * Descriptions for expense transactions
 */
const expenseDescriptions = [
    'Supermercado',
    'Restaurante',
    'Uber',
    'Gasolina',
    'Netflix',
    'Spotify',
    'Conta de luz',
    'Conta de água',
    'Internet',
    'Aluguel',
    'Farmácia',
    'Academia',
    'Roupas',
    'Eletrônicos',
    'Livros',
    'Cinema',
    'Shopping',
    'Delivery',
    'Café',
    'Presente',
]

/**
 * Income categories
 */
const incomeCategories: TransactionCategory[] = ['salary', 'freelance', 'investment', 'other']

/**
 * Expense categories
 */
const expenseCategories: TransactionCategory[] = [
    'food',
    'transport',
    'entertainment',
    'bills',
    'shopping',
    'health',
    'education',
    'other',
]

/**
 * Generate a random date within the last year
 */
function randomDate(): Date {
    const now = new Date()
    const pastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate())
    const timestamp = pastYear.getTime() + Math.random() * (now.getTime() - pastYear.getTime())
    return new Date(timestamp)
}

/**
 * Generate a random value based on transaction type
 */
function randomValue(type: TransactionType): number {
    if (type === 'income') {
        // Income: R$ 500 - R$ 15.000
        return Math.floor(Math.random() * 14500) + 500
    } else {
        // Expense: R$ 10 - R$ 3.000
        return Math.floor(Math.random() * 2990) + 10
    }
}

/**
 * Generate a unique ID
 */
function generateId(index: number): string {
    return `txn_${Date.now()}_${index}_${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Generate mock transactions
 * @param count Number of transactions to generate
 * @returns Array of transactions
 */
export function generateMockTransactions(count: number): Transaction[] {
    const transactions: Transaction[] = []

    for (let i = 0; i < count; i++) {
        // 30% income, 70% expense for more realistic data
        const type: TransactionType = Math.random() < 0.3 ? 'income' : 'expense'

        const descriptions = type === 'income' ? incomeDescriptions : expenseDescriptions
        const categories = type === 'income' ? incomeCategories : expenseCategories

        const transaction: Transaction = {
            id: generateId(i),
            description: descriptions[Math.floor(Math.random() * descriptions.length)],
            value: randomValue(type),
            type,
            category: categories[Math.floor(Math.random() * categories.length)],
            date: randomDate(),
        }

        transactions.push(transaction)
    }

    // Sort by date (most recent first)
    return transactions.sort((a, b) => b.date.getTime() - a.date.getTime())
}
