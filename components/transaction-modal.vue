<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header> Add Transaction </template>
      <div>Hello!</div>
    </UCard>
  </UModal>
</template>

<script setup>
// we need to simulate 2 way biding in our custom modal component
// https://vuejs.org/guide/components/v-model.html
const props = defineProps({
  modelValue: Boolean,
});
const emit = defineEmits("[update:modelValue]");

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
