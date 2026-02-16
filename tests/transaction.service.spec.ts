import { describe, it, expect, beforeEach } from 'vitest'
import { transactionService } from '@/services/transaction.service'

describe('Transaction Service', () => {
    beforeEach(async () => {
        // Inicializa com conjunto pequeno de dados para testes
        await transactionService.initialize(100)
    })

    it('inicializa com o número correto de transações', async () => {
        expect(transactionService.getCount()).toBe(100)
    })

    it('retorna todas as transações', async () => {
        const transactions = await transactionService.getTransactions()
        expect(transactions.length).toBe(100)
    })

    it('encontra transação por ID', async () => {
        const transactions = await transactionService.getTransactions()
        const firstTransaction = transactions[0]
        const found = await transactionService.getTransactionById(firstTransaction.id)
        expect(found).toBeDefined()
        expect(found?.id).toBe(firstTransaction.id)
    })

    it('retorna undefined para ID inexistente', async () => {
        const found = await transactionService.getTransactionById('id-inexistente')
        expect(found).toBeUndefined()
    })

    it('adiciona uma nova transação', async () => {
        const initialCount = transactionService.getCount()
        const newTransaction = {
            description: 'Transação de Teste',
            value: 100,
            type: 'income' as const,
            category: 'salary' as const,
            date: new Date()
        }

        const added = await transactionService.addTransaction(newTransaction)

        expect(added.id).toBeDefined()
        expect(added.description).toBe('Transação de Teste')
        expect(transactionService.getCount()).toBe(initialCount + 1)
    })

    it('deleta uma transação', async () => {
        const transactions = await transactionService.getTransactions()
        const toDelete = transactions[0]
        const initialCount = transactionService.getCount()

        const success = await transactionService.deleteTransaction(toDelete.id)

        expect(success).toBe(true)
        expect(transactionService.getCount()).toBe(initialCount - 1)

        const found = await transactionService.getTransactionById(toDelete.id)
        expect(found).toBeUndefined()
    })

    it('retorna false ao deletar transação inexistente', async () => {
        const success = await transactionService.deleteTransaction('id-inexistente')
        expect(success).toBe(false)
    })

    it('mantém ordem das transações após adicionar', async () => {
        const futureDate = new Date()
        futureDate.setDate(futureDate.getDate() + 10)

        await transactionService.addTransaction({
            description: 'Transação Futura',
            value: 500,
            type: 'income',
            category: 'salary',
            date: futureDate
        })

        const transactions = await transactionService.getTransactions()
        // Deve estar ordenado por data (mais recente primeiro)
        expect(new Date(transactions[0].date).getTime()).toBeGreaterThanOrEqual(
            new Date(transactions[1].date).getTime()
        )
    })
})
