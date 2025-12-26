<script setup>
defineProps({
  modelValue: Boolean,
  text: String,
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <label class="flex items-center gap-3 cursor-pointer group">
    <div class="relative">
      <input
        type="checkbox"
        :checked="modelValue"
        @change="emit('update:modelValue', $event.target.checked)"
        class="sr-only peer"
      />
      <div
        class="w-11 h-6 bg-slate-300 dark:bg-slate-600 rounded-full peer peer-checked:bg-indigo-500 transition-colors"
      ></div>
      <div
        class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5"
      ></div>
    </div>
    <span
      class="text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors text-sm"
      :class="{ 'text-slate-700 dark:text-slate-200': modelValue }"
    >
      {{ text }}
    </span>
  </label>
</template>
