<script setup>
import { ref } from "vue";

const copied = ref(false);

const copyToClipboard = async () => {
  const textarea = document.getElementById("transliteration");
  if (textarea) {
    try {
      await navigator.clipboard.writeText(textarea.value);
      copied.value = true;
      setTimeout(() => {
        copied.value = false;
      }, 1500);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }
};
</script>

<template>
  <button
    @click="copyToClipboard"
    class="absolute top-2 right-2 p-2.5 rounded-lg bg-slate-200/80 dark:bg-slate-700/80 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 z-50 transition-all backdrop-blur-sm"
    :title="copied ? 'Copied!' : 'Copy to clipboard'"
  >
    <!-- Check icon (shown after copy) -->
    <svg
      v-if="copied"
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5 text-emerald-500"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path d="M20 6 9 17l-5-5"></path>
    </svg>
    <!-- Clipboard icon -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>
  </button>
</template>
