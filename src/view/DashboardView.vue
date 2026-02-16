<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-br from-[#667eea] to-[#764ba2] bg-fixed">
    <app-header @open-add-modal="showAddModal = true" />

    <main class="flex-1 py-8 md:py-12">
      <div class="w-full max-w-7xl mx-auto px-6">
        <div v-if="!store.isInitialized" class="flex items-center justify-center min-h-[60vh]">
          <div class="text-center text-white">
            <div class="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-6"></div>
            <p class="text-xl font-semibold mb-2">Inicializando aplicação...</p>
            <p class="text-sm opacity-90 m-0">Gerando 30.000 transações para demonstração</p>
          </div>
        </div>

        <div v-else class="animate-fade-in">
          <financial-summary
            :total-income="store.totalIncome"
            :total-expense="store.totalExpense"
            :balance="store.balance"
          />

          <transaction-filters
            :filter-type="store.filter.type"
            :search-query="store.filter.searchQuery"
            @update:filter-type="store.setFilterType"
            @update:search-query="store.setSearchQuery"
            @clear="store.clearFilters"
          />

          <transaction-list
            :transactions="store.filteredTransactions"
            :total-count="store.transactionCount"
            :filtered-count="store.filteredCount"
            :loading="store.isLoading"
            @delete="handleDeleteClick"
          />
        </div>
      </div>
    </main>

    <app-footer />

    <add-transaction-modal
      v-model="showAddModal"
      :loading="store.isLoading"
      @submit="handleAddTransaction"
    />

    <delete-confirmation-modal
      v-model="showDeleteModal"
      :transaction="transactionToDelete"
      :loading="store.isLoading"
      @confirm="handleDeleteConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTransactionStore } from '@/stores/transaction.store'
import type { Transaction } from '@/types/transaction'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
import FinancialSummary from '@/components/FinancialSummary.vue'
import TransactionFilters from '@/components/TransactionFilters.vue'
import TransactionList from '@/components/TransactionList.vue'
import AddTransactionModal from '@/components/AddTransactionModal.vue'
import DeleteConfirmationModal from '@/components/DeleteConfirmationModal.vue'

const store = useTransactionStore()
const showAddModal = ref(false)
const showDeleteModal = ref(false)
const transactionToDelete = ref<Transaction | null>(null)

onMounted(async () => {
  await store.initialize()
})

const handleAddTransaction = async (data: Omit<Transaction, 'id'>) => {
  try {
    await store.addTransaction(data)
    showAddModal.value = false
  } catch (error) {
    console.error('Failed to add transaction:', error)
  }
}

const handleDeleteClick = (transaction: Transaction) => {
  transactionToDelete.value = transaction
  showDeleteModal.value = true
}

const handleDeleteConfirm = async () => {
  if (transactionToDelete.value) {
    try {
      await store.deleteTransaction(transactionToDelete.value.id)
      showDeleteModal.value = false
      transactionToDelete.value = null
    } catch (error) {
      console.error('Failed to delete transaction:', error)
    }
  }
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-in-out;
}
</style>