/**
 * Transaction type - income (receita) or expense (despesa)
 */
export type TransactionType = 'income' | 'expense'

/**
 * Transaction category
 */
export type TransactionCategory =
    | 'salary'          // Salário
    | 'freelance'       // Freelance
    | 'investment'      // Investimento
    | 'food'            // Alimentação
    | 'transport'       // Transporte
    | 'entertainment'   // Entretenimento
    | 'bills'           // Contas
    | 'shopping'        // Compras
    | 'health'          // Saúde
    | 'education'       // Educação
    | 'other'           // Outro

/**
 * Transaction interface
 */
export interface Transaction {
    id: string
    description: string
    value: number
    type: TransactionType
    category: TransactionCategory
    date: Date
}

/**
 * Transaction filter
 */
export interface TransactionFilter {
    type: TransactionType | 'all'
    searchQuery: string
}

/**
 * Financial summary
 */
export interface FinancialSummary {
    totalIncome: number
    totalExpense: number
    balance: number
}

/**
 * Category label mapping
 */
export const categoryLabels: Record<TransactionCategory, string> = {
    salary: 'Salário',
    freelance: 'Freelance',
    investment: 'Investimento',
    food: 'Alimentação',
    transport: 'Transporte',
    entertainment: 'Entretenimento',
    bills: 'Contas',
    shopping: 'Compras',
    health: 'Saúde',
    education: 'Educação',
    other: 'Outro',
}
