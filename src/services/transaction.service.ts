import type { Transaction } from '@/types/transaction'
import { generateMockTransactions } from '@/utils/mockData'

/**
 * Transaction Service
 * Manages transaction data operations
 */
class TransactionService {
    private transactions: Transaction[] = []

    /**
     * Initialize service with mock data
     */
    async initialize(count: number = 30000): Promise<void> {
        console.log(`Generating ${count} mock transactions...`)
        const startTime = performance.now()

        this.transactions = generateMockTransactions(count)

        const endTime = performance.now()
        console.log(`Generated ${count} transactions in ${(endTime - startTime).toFixed(2)}ms`)
    }

    /**
     * Get all transactions
     */
    async getTransactions(): Promise<Transaction[]> {
        return [...this.transactions]
    }

    /**
     * Get a transaction by ID
     */
    async getTransactionById(id: string): Promise<Transaction | undefined> {
        return this.transactions.find(t => t.id === id)
    }

    /**
     * Add a new transaction
     */
    async addTransaction(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
        const newTransaction: Transaction = {
            ...transaction,
            id: `txn_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
        }

        this.transactions.unshift(newTransaction) // Add to beginning

        // Re-sort by date
        this.transactions.sort((a, b) => b.date.getTime() - a.date.getTime())

        return newTransaction
    }

    /**
     * Delete a transaction
     */
    async deleteTransaction(id: string): Promise<boolean> {
        const index = this.transactions.findIndex(t => t.id === id)

        if (index === -1) {
            return false
        }

        this.transactions.splice(index, 1)
        return true
    }

    /**
     * Get total count
     */
    getCount(): number {
        return this.transactions.length
    }
}

// Export singleton instance
export const transactionService = new TransactionService()
