import { describe, it, expect } from 'vitest'
import { generateMockTransactions } from '@/utils/mockData'

describe('Gerador de Dados Mock', () => {
    it('gera o número correto de transações', () => {
        const transactions = generateMockTransactions(100)
        expect(transactions.length).toBe(100)
    })

    it('gera transações com todos os campos obrigatórios', () => {
        const transactions = generateMockTransactions(10)

        transactions.forEach(transaction => {
            expect(transaction).toHaveProperty('id')
            expect(transaction).toHaveProperty('description')
            expect(transaction).toHaveProperty('value')
            expect(transaction).toHaveProperty('type')
            expect(transaction).toHaveProperty('category')
            expect(transaction).toHaveProperty('date')
        })
    })

    it('gera transações com tipos válidos', () => {
        const transactions = generateMockTransactions(100)

        transactions.forEach(transaction => {
            expect(['income', 'expense']).toContain(transaction.type)
        })
    })

    it('gera transações com valores positivos', () => {
        const transactions = generateMockTransactions(100)

        transactions.forEach(transaction => {
            expect(transaction.value).toBeGreaterThan(0)
        })
    })

    it('gera transações ordenadas por data (mais recente primeiro)', () => {
        const transactions = generateMockTransactions(50)

        for (let i = 0; i < transactions.length - 1; i++) {
            const current = new Date(transactions[i].date).getTime()
            const next = new Date(transactions[i + 1].date).getTime()
            expect(current).toBeGreaterThanOrEqual(next)
        }
    })

    it('gera IDs únicos para cada transação', () => {
        const transactions = generateMockTransactions(100)
        const ids = transactions.map(t => t.id)
        const uniqueIds = new Set(ids)
        expect(uniqueIds.size).toBe(transactions.length)
    })
})
