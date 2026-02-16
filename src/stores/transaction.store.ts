import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Transaction, TransactionFilter, FinancialSummary, TransactionType } from '@/types/transaction'
import { transactionService } from '@/services/transaction.service'

export const useTransactionStore = defineStore('transaction', () => {
    // State
    const transactions = ref<Transaction[]>([])
    const filter = ref<TransactionFilter>({
        type: 'all',
        searchQuery: '',
    })
    const isLoading = ref(false)
    const isInitialized = ref(false)

    // Getters
    /**
     * Filtered transactions based on current filter
     */
    const filteredTransactions = computed(() => {
        let result = transactions.value

        // Filter by type
        if (filter.value.type !== 'all') {
            result = result.filter(t => t.type === filter.value.type)
        }

        // Filter by search query
        if (filter.value.searchQuery.trim()) {
            const query = filter.value.searchQuery.toLowerCase()
            result = result.filter(t =>
                t.description.toLowerCase().includes(query)
            )
        }

        return result
    })

    /**
     * Total income
     */
    const totalIncome = computed(() => {
        return transactions.value
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.value, 0)
    })

    /**
     * Total expense
     */
    const totalExpense = computed(() => {
        return transactions.value
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.value, 0)
    })

    /**
     * Balance
     */
    const balance = computed(() => {
        return totalIncome.value - totalExpense.value
    })

    /**
     * Financial summary
     */
    const financialSummary = computed<FinancialSummary>(() => ({
        totalIncome: totalIncome.value,
        totalExpense: totalExpense.value,
        balance: balance.value,
    }))

    /**
     * Transaction count
     */
    const transactionCount = computed(() => transactions.value.length)

    /**
     * Filtered transaction count
     */
    const filteredCount = computed(() => filteredTransactions.value.length)

    // Actions
    /**
     * Initialize store - load transactions
     */
    async function initialize() {
        if (isInitialized.value) {
            return
        }

        isLoading.value = true
        try {
            await transactionService.initialize(30000)
            transactions.value = await transactionService.getTransactions()
            isInitialized.value = true
        } catch (error) {
            console.error('Failed to initialize transactions:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Load transactions from service
     */
    async function loadTransactions() {
        isLoading.value = true
        try {
            transactions.value = await transactionService.getTransactions()
        } catch (error) {
            console.error('Failed to load transactions:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Add a new transaction
     */
    async function addTransaction(transaction: Omit<Transaction, 'id'>) {
        isLoading.value = true
        try {
            const newTransaction = await transactionService.addTransaction(transaction)
            transactions.value = await transactionService.getTransactions()
            return newTransaction
        } catch (error) {
            console.error('Failed to add transaction:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Delete a transaction
     */
    async function deleteTransaction(id: string) {
        isLoading.value = true
        try {
            const success = await transactionService.deleteTransaction(id)
            if (success) {
                transactions.value = await transactionService.getTransactions()
            }
            return success
        } catch (error) {
            console.error('Failed to delete transaction:', error)
            throw error
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Set filter type
     */
    function setFilterType(type: TransactionType | 'all') {
        filter.value.type = type
    }

    /**
     * Set search query
     */
    function setSearchQuery(query: string) {
        filter.value.searchQuery = query
    }

    /**
     * Clear all filters
     */
    function clearFilters() {
        filter.value = {
            type: 'all',
            searchQuery: '',
        }
    }

    return {
        // State
        transactions,
        filter,
        isLoading,
        isInitialized,

        // Getters
        filteredTransactions,
        totalIncome,
        totalExpense,
        balance,
        financialSummary,
        transactionCount,
        filteredCount,

        // Actions
        initialize,
        loadTransactions,
        addTransaction,
        deleteTransaction,
        setFilterType,
        setSearchQuery,
        clearFilters,
    }
})
