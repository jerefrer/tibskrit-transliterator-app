<script setup>
defineProps({
  modelValue: [String, Number, Boolean],
  choices: Array,
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="flex gap-2">
    <button
      v-for="choice in choices"
      :key="choice.value"
      @click="emit('update:modelValue', choice.value)"
      class="px-4 py-2.5 rounded-lg font-medium text-sm transition-all"
      :class="
        choice.value === modelValue
          ? 'bg-indigo-600 text-white shadow-md'
          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
      "
    >
      {{ choice.text }}
    </button>
  </div>
</template>
