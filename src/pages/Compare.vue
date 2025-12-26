<script setup>
import * as Diff from "diff";
import { computed, ref } from "vue";
import TibetanMantraToIastAndPhonetics from "../lib/tibetan-mantra-to-iast-and-phonetics.js";

const defaultTibetan = `ཨོཾ་ཨཱཿཧཱུྃ།
ཨོཾ་ཨཱཿཧཱུྃ་སྭཱ་ཧཱ།
ཨོཾ་ཧཱུྃ་ཏྲཱཾ་ཧྲཱིཿཨཱཿ
འཿཨཿཧཿཤཿསཿམཿ
ཨོཾ་བཛྲ་སཏྭ་ཧཱུྃ།
ན་མཿས་མནྟ་བུདྡྷཱ་ནཱཾ། ཨཱ་བཱི་ར་ཧཱུྃ་ཁཾ།`;

const defaultExisting = `oṁ āḥ hūṁ
oṁ āḥ hūṁ svāhā
oṁ hūṁ trāṁ hrīḥ āḥ
āḥ aḥ haḥ śaḥ saḥ maḥ
oṁ vajra sattva hūṁ
namaḥsamanta buddhānāṁ  ābīra hūṁ khaṁ`;

const tibetan = ref(defaultTibetan);
const existing = ref(defaultExisting);

const tibetanLines = computed(() => {
  return tibetan.value ? tibetan.value.split("\n") : [];
});

const existingLines = computed(() => {
  return existing.value ? existing.value.split("\n") : [];
});

const diffLines = computed(() => {
  return tibetanLines.value.map((line, index) => {
    const expected = existingLines.value[index] || "";
    const actual = new TibetanMantraToIastAndPhonetics(line).transliterate({
      mode: "iast",
    });
    const parts = Diff.diffChars(expected, actual);
    return { expected, actual, parts };
  });
});

function correctLine(lineIndex, updatedLine) {
  const lines = existing.value.split("\n");
  lines[lineIndex] = updatedLine;
  existing.value = lines.join("\n");
}

function handleClickPart(lineIndex, clickedPart, parts) {
  let updatedLine = "";
  parts.forEach((part, index) => {
    if (clickedPart === parts[index - 1] && part.added) {
      updatedLine += part.value;
    } else if (clickedPart === part && part.added) {
      updatedLine += part.value;
    } else {
      if (
        part.removed &&
        clickedPart !== part &&
        !(clickedPart === parts[index + 1] && parts[index + 1]?.added)
      ) {
        updatedLine += part.value;
      }
      if (!part.removed && !part.added) {
        updatedLine += part.value;
      }
    }
  });
  correctLine(lineIndex, updatedLine);
}
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <!-- Tibetan Input -->
    <div>
      <label
        class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide"
      >
        Tibetan
      </label>
      <textarea
        v-model="tibetan"
        class="w-full min-h-[calc(100vh-200px)] p-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl font-tibetan text-2xl leading-tight resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
        placeholder="Enter Tibetan text..."
      ></textarea>
    </div>

    <!-- Existing Transliteration -->
    <div>
      <label
        class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide"
      >
        Existing Transliteration
      </label>
      <textarea
        v-model="existing"
        class="w-full min-h-[calc(100vh-200px)] p-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl font-sans text-base leading-[32px] resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
        placeholder="Paste existing transliteration..."
      ></textarea>
    </div>

    <!-- Diff Output -->
    <div>
      <label
        class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide"
      >
        Comparison (click to correct)
      </label>
      <div
        class="w-full min-h-[calc(100vh-200px)] p-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl font-sans text-base leading-[32px] overflow-auto shadow-sm"
      >
        <div
          v-for="(line, lineIndex) in diffLines"
          :key="lineIndex"
          class="mb-1"
        >
          <span
            v-for="(part, partIndex) in line.parts"
            :key="partIndex"
            @click="
              (part.added || part.removed) &&
                handleClickPart(lineIndex, part, line.parts)
            "
            :class="{
              'text-blue-600 dark:text-blue-400 font-bold cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30':
                part.added,
              'text-red-600 dark:text-red-400 font-bold cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/30':
                part.removed,
            }"
            >{{
              part.added || part.removed
                ? part.value.replace(/ /g, "_")
                : part.value
            }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
