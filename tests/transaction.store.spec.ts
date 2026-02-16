import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTransactionStore } from '@/stores/transaction.store'

describe('Transaction Store', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('inicializa com transações vazias', () => {
        const store = useTransactionStore()
        expect(store.transactions).toEqual([])
        expect(store.isInitialized).toBe(false)
    })

    it('calcula total de entradas corretamente', () => {
        const store = useTransactionStore()
        store.transactions = [
            {
                id: '1',
                description: 'Salário',
                value: 5000,
                type: 'income',
                category: 'salary',
                date: new Date()
            },
            {
                id: '2',
                description: 'Freelance',
                value: 1000,
                type: 'income',
                category: 'freelance',
                date: new Date()
            }
        ]
        expect(store.totalIncome).toBe(6000)
    })

    it('calcula total de despesas corretamente', () => {
        const store = useTransactionStore()
        store.transactions = [
            {
                id: '1',
                description: 'Supermercado',
                value: 500,
                type: 'expense',
                category: 'food',
                date: new Date()
            },
            {
                id: '2',
                description: 'Transporte',
                value: 200,
                type: 'expense',
                category: 'transport',
                date: new Date()
            }
        ]
        expect(store.totalExpense).toBe(700)
    })

    it('calcula saldo corretamente', () => {
        const store = useTransactionStore()
        store.transactions = [
            {
                id: '1',
                description: 'Salário',
                value: 5000,
                type: 'income',
                category: 'salary',
                date: new Date()
            },
            {
                id: '2',
                description: 'Aluguel',
                value: 2000,
                type: 'expense',
                category: 'bills',
                date: new Date()
            }
        ]
        expect(store.balance).toBe(3000)
    })

    it('filtra transações por tipo', () => {
        const store = useTransactionStore()
        store.transactions = [
            {
                id: '1',
                description: 'Salário',
                value: 5000,
                type: 'income',
                category: 'salary',
                date: new Date()
            },
            {
                id: '2',
                description: 'Comida',
                value: 500,
                type: 'expense',
                category: 'food',
                date: new Date()
            }
        ]

        store.setFilterType('income')
        expect(store.filteredTransactions.length).toBe(1)
        expect(store.filteredTransactions[0].type).toBe('income')
    })

    it('filtra transações por busca de texto', () => {
        const store = useTransactionStore()
        store.transactions = [
            {
                id: '1',
                description: 'Salário',
                value: 5000,
                type: 'income',
                category: 'salary',
                date: new Date()
            },
            {
                id: '2',
                description: 'Mercado de alimentos',
                value: 500,
                type: 'expense',
                category: 'food',
                date: new Date()
            }
        ]

        store.setSearchQuery('mercado')
        expect(store.filteredTransactions.length).toBe(1)
        expect(store.filteredTransactions[0].description).toContain('Mercado')
    })

    it('limpa filtros corretamente', () => {
        const store = useTransactionStore()
        store.setFilterType('income')
        store.setSearchQuery('teste')

        store.clearFilters()

        expect(store.filter.type).toBe('all')
        expect(store.filter.searchQuery).toBe('')
    })
})
