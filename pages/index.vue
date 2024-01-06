<template>
  <section class="flex items-center justify-between mb-10">
    <h1 class="text-4xl font-extrabold">Summary</h1>
    <div>
      <USelectMenu v-model="selectedView" :options="transactionViewOptions" />
    </div>
  </section>

  <section
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
  >
    <Trend
      color="green"
      title="Income"
      :amount="incomeTotal"
      :lastAmount="prevIncomeTotal"
      :loading="isLoading"
    />
    <Trend
      color="green"
      title="Expense"
      :amount="expenseTotal"
      :lastAmount="prevExpenseTotal"
      :loading="isLoading"
    />
    <Trend
      color="red"
      title="Investments"
      :amount="4000"
      :lastAmount="5000"
      :loading="isLoading"
    />
    <Trend
      color="green"
      title="Savings"
      :amount="2300"
      :lastAmount="3000"
      :loading="isLoading"
    />
  </section>
  <section class="flex justify-between mb-10">
    <div>
      <h2 class="text-2xl font-extrabold">transactions</h2>
      <div class="text-gray-500 dark:text-gray-400">
        You have {{ incomeCount }} incomes and {{ expenseCount }} expenses this
        period
      </div>
    </div>
    <div>
      <TransactionModal v-model="isOpen" @saved="refresh()" />
      <UButton
        icon="i-heroicons-plus-circle"
        color="white"
        variant="solid"
        label="Add"
        @click="isOpen = true"
      />
    </div>
  </section>
  <section v-if="!isLoading">
    <div
      v-for="(transactionsOnDay, date) in transactionsGroupByDate"
      :key="date"
      class="mb-10"
    >
      <DailyTransactionSummary :date="date" :transactions="transactionsOnDay" />
      <Transaction
        v-for="transaction in transactionsOnDay"
        :key="transaction.id"
        :transaction="transaction"
        @deleted="refresh()"
        @edited="refresh()"
      />
    </div>
  </section>
  <section v-else>
    <USkeleton class="h-8 w-full mb-2" v-for="i in 4" :key="i" />
  </section>
</template>

<script setup>
import { transactionViewOptions } from "~/constants";

const user = useSupabaseUser();

const isOpen = ref(false);
const selectedView = ref(
  user.value.user_metadata?.transaction_view ?? transactionViewOptions[1]
);
const { current, previous } = useSelectedTimePeriod(selectedView);

const {
  pending: isLoading,
  refresh,
  transactions: {
    incomeCount,
    expenseCount,
    incomeTotal,
    expenseTotal,
    grouped: { byDate: transactionsGroupByDate }, // alias name for. the byDate (not necessary, just for learning)
  },
} = useFetchTransactions(current);
await refresh();

const {
  refresh: refreshPrevious,
  transactions: {
    incomeTotal: prevIncomeTotal,
    expenseTotal: prevExpenseTotal,
  },
} = useFetchTransactions(previous);
// check video 84, there is a bug
//await refreshPrevious();
</script>
