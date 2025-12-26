<script setup>
import { computed, onMounted, ref } from "vue";
import TibkritTransliterator from "../lib/tibkrit-transliterator.js";

const testGroups = ref([]);
const loading = ref(true);

onMounted(async () => {
  testGroups.value = [
    {
      name: "All mantras from Mipham Rinpoché's Le Drip Gyü Chö - Sanskrit transliteration",
      sentences: true,
      phonetics: false,
      tests: [
        { tibetan: "ཨོཾ་ཨཱཿཧཱུྃ།", result: "oṁ āḥ hūṁ" },
        { tibetan: "ཨོཾ་ཨཱཿཧཱུྃ་སྭཱ་ཧཱ།", result: "oṁ āḥ hūṁ svāhā" },
        { tibetan: "ཨོཾ་ཧཱུྃ་ཏྲཱཾ་ཧྲཱིཿཨཱཿ", result: "oṁ hūṁ trāṁ hrīḥ āḥ" },
        { tibetan: "འཿཨཿཧཿཤཿསཿམཿ", result: "āḥ aḥ haḥ śaḥ saḥ maḥ" },
        { tibetan: "ཨོཾ་བཛྲ་སཏྭ་ཧཱུྃ།", result: "oṁ vajra satva hūṁ" },
        {
          tibetan: "ན་མཿས་མནྟ་བུདྡྷཱ་ནཱཾ། ཨཱ་བཱི་ར་ཧཱུྃ་ཁཾ།",
          result: "namaḥ samanta buddhānāṁ    āvīra hūṁ khaṁ",
        },
        { tibetan: "ཨོཾ་མ་ཎི་པདྨེ་ཧཱུྃ།", result: "oṁ maṇi padmé hūṁ" },
        {
          tibetan: "ཨོཾ་ཏཱ་རེ་ཏུཏྟཱ་རེ་ཏུ་རེ་སྭཱ་ཧཱ།",
          result: "oṁ tāré tuttāré turé svāhā",
        },
      ],
    },
    {
      name: "Phonetics tests",
      sentences: true,
      phonetics: true,
      tests: [
        { tibetan: "ཨོཾ་ཨ་ར་པ་ཙ་ན", result: "om a ra pa cha na" },
        { tibetan: "བཛྲ་པཱ་ཙ་ཧོ", result: "vajra pacha ho" },
      ],
    },
  ];

  testGroups.value.forEach((group) => {
    group.tests.forEach((test) => {
      const options = { phonetics: group.phonetics };
      test.transliterated = new TibkritTransliterator(
        test.tibetan
      ).transliterate(options);
      test.pass = test.transliterated === test.result;
    });
  });

  loading.value = false;
});

const stats = computed(() => {
  let passed = 0;
  let total = 0;
  testGroups.value.forEach((group) => {
    group.tests.forEach((test) => {
      total++;
      if (test.pass) passed++;
    });
  });
  return {
    passed,
    total,
    percentage: total > 0 ? ((passed / total) * 100).toFixed(1) : 0,
  };
});

function diffChars(expected, actual) {
  const parts = [];
  let i = 0,
    j = 0;
  while (i < expected.length || j < actual.length) {
    if (expected[i] === actual[j]) {
      parts.push({ value: expected[i], added: false, removed: false });
      i++;
      j++;
    } else if (
      j < actual.length &&
      (i >= expected.length || expected[i] !== actual[j])
    ) {
      parts.push({ value: actual[j], added: true, removed: false });
      j++;
    } else {
      parts.push({ value: expected[i], added: false, removed: true });
      i++;
    }
  }
  return parts;
}
</script>

<template>
  <div>
    <div
      v-if="loading"
      class="text-center py-8 text-slate-500 dark:text-slate-400"
    >
      Loading tests...
    </div>

    <div v-else>
      <!-- Stats -->
      <div
        class="mb-6 p-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"
      >
        <span class="text-slate-600 dark:text-slate-300">Total: </span>
        <span
          :class="
            stats.passed === stats.total
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-600 dark:text-red-400'
          "
          class="font-bold"
        >
          {{ stats.percentage }}% ({{ stats.passed }}/{{ stats.total }})
        </span>
      </div>

      <!-- Test Groups -->
      <div
        v-for="(group, groupIndex) in testGroups"
        :key="groupIndex"
        class="mb-4 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
      >
        <div
          class="p-4 bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600 flex items-center justify-between cursor-pointer"
          @click="group.opened = !group.opened"
        >
          <span class="font-medium text-slate-800 dark:text-slate-200">{{
            group.name
          }}</span>
          <div class="flex items-center gap-3">
            <span class="text-sm text-slate-500 dark:text-slate-400">
              {{ group.tests.filter((t) => t.pass).length }}/{{
                group.tests.length
              }}
            </span>
            <span v-if="group.tests.every((t) => t.pass)" class="text-green-500"
              >✓</span
            >
            <span v-else class="text-red-500">✗</span>
          </div>
        </div>

        <div v-if="!group.opened" class="p-4 space-y-2">
          <div
            v-for="(test, testIndex) in group.tests"
            :key="testIndex"
            class="flex items-start gap-3 p-2 rounded-lg"
            :class="
              test.pass
                ? 'bg-green-50 dark:bg-green-900/20'
                : 'bg-red-50 dark:bg-red-900/20'
            "
          >
            <span :class="test.pass ? 'text-green-500' : 'text-red-500'">
              {{ test.pass ? "✓" : "✗" }}
            </span>
            <div class="flex-1 min-w-0">
              <div
                class="font-tibetan text-lg text-slate-800 dark:text-slate-200 mb-1"
              >
                {{ test.tibetan }}
              </div>
              <div v-if="!test.pass" class="text-sm">
                <span
                  v-for="(part, partIndex) in diffChars(
                    test.result,
                    test.transliterated
                  )"
                  :key="partIndex"
                  :class="{
                    'text-blue-600 dark:text-blue-400 font-bold': part.added,
                    'text-red-600 dark:text-red-400 font-bold line-through':
                      part.removed,
                  }"
                  >{{ part.value.replace(/ /g, "_") }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
