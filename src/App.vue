<script setup>
import { useRoute } from "vue-router";
import ThemeToggle from "./components/ThemeToggle.vue";

const route = useRoute();
</script>

<template>
  <div class="min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors">
    <div class="max-w-7xl mx-auto px-4 py-6">
      <!-- Header -->
      <header class="flex items-center justify-between mb-6">
        <div class="flex items-center gap-6">
          <h1 class="text-xl font-semibold text-slate-800 dark:text-slate-100">
            Tibetan Mantra to IAST and Phonetics
          </h1>
          <nav v-if="route.name !== 'tests'" class="flex gap-1">
            <router-link
              to="/"
              class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              :class="
                route.name === 'convert'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              "
            >
              Convert
            </router-link>
            <router-link
              to="/compare"
              class="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              :class="
                route.name === 'compare'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              "
            >
              Compare
            </router-link>
          </nav>
        </div>
        <ThemeToggle />
      </header>

      <!-- Router View -->
      <router-view />
    </div>
  </div>
</template>

<style>
.font-tibetan {
  font-family: TibetanChogyalUnicode-170221, TibetanChogyalUnicode-ID,
    TibetanChogyalUnicode, TibetanMachineUnicode, sans-serif;
}
</style>
