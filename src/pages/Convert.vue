<script setup>
import TibetanUnicodeConverter from "tibetan-ansi-to-unicode";
import { computed, ref, watch } from "vue";
import ClipboardButton from "../components/ClipboardButton.vue";
import RadioButtons from "../components/RadioButtons.vue";
import SliderCheckbox from "../components/SliderCheckbox.vue";
import Storage from "../lib/storage.js";
import TibkritTransliterator from "../lib/tibkrit-transliterator.js";

const defaultText = `ཨོཾ་ཨཱཿཧཱུྃ།
ཨོཾ་ཨཱཿཧཱུྃ་སྭཱ་ཧཱ།
ཨོཾ་ཧཱུྃ་ཏྲཱཾ་ཧྲཱིཿཨཱཿ
འཿཨཿཧཿཤཿསཿམཿ
ཨོཾ་བཛྲ་སཏྭ་ཧཱུྃ།
ན་མཿས་མནྟ་བུདྡྷཱ་ནཱཾ། ཨཱ་བཱི་ར་ཧཱུྃ་ཁཾ།`;

const options = ref(
  Storage.get("options") || {
    capitalize: false,
    phonetics: false,
  }
);

const text = ref(Storage.get("text") || defaultText);

// Detect if text is ANSI-encoded Tibetan (uses Latin characters that map to Tibetan)
function isAnsiEncoded(str) {
  if (!str || str.length === 0) return false;
  // Check if text contains Tibetan Unicode characters
  const hasTibetan = /[\u0F00-\u0FFF]/.test(str);
  if (hasTibetan) return false;
  // Check for common ANSI Tibetan encoding characters (special Latin chars used in encoding)
  const ansiPattern =
    /[ÜÝÞßàáâäãåæçèéêëìîïñóøùúûüýþÿ¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ]/;
  return ansiPattern.test(str);
}

// Convert ANSI-encoded text to Unicode Tibetan
function convertAnsiToUnicode(str) {
  return str
    .split("\n")
    .map((line) => new TibetanUnicodeConverter(line).convert())
    .join("\n");
}

// Handle paste event to detect and convert ANSI text
function handlePaste(event) {
  const pastedText = event.clipboardData?.getData("text");
  if (pastedText && isAnsiEncoded(pastedText)) {
    event.preventDefault();
    const converted = convertAnsiToUnicode(pastedText);
    // Insert at cursor position or replace selection
    const textarea = event.target;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const before = text.value.substring(0, start);
    const after = text.value.substring(end);
    text.value = before + converted + after;
  }
}

const lines = computed(() => {
  return text.value ? text.value.split("\n") : [];
});

const convertedLines = computed(() => {
  const opts = {
    phonetics: options.value.phonetics,
    capitalize: options.value.capitalize,
  };
  return lines.value
    .map((line) => new TibkritTransliterator(line).transliterate(opts))
    .join("\n");
});

watch(text, (value) => {
  Storage.set("text", value);
});

watch(
  options,
  (value) => {
    Storage.set("options", value);
  },
  { deep: true }
);

const transliterationChoices = [
  { value: false, text: "Sanskrit" },
  { value: true, text: "Phonetics" },
];
</script>

<template>
  <div>
    <!-- Controls -->
    <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
      <RadioButtons
        :modelValue="options.phonetics"
        @update:modelValue="options.phonetics = $event"
        :choices="transliterationChoices"
      />
      <SliderCheckbox
        v-model="options.capitalize"
        text="Capitalize each group"
      />
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Tibetan Input -->
      <div class="relative">
        <label
          class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide"
        >
          Tibetan
        </label>
        <textarea
          v-model="text"
          @paste="handlePaste"
          class="w-full min-h-[calc(100vh-280px)] p-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl font-tibetan text-3xl leading-tight resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm transition-shadow"
          placeholder="Enter Tibetan text..."
        ></textarea>
      </div>

      <!-- Transliteration Output -->
      <div class="relative">
        <label
          class="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-wide"
        >
          Transliteration
        </label>
        <div class="relative">
          <ClipboardButton v-if="text" />
          <textarea
            id="transliteration"
            :value="convertedLines"
            readonly
            class="w-full min-h-[calc(100vh-280px)] p-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl font-sans text-base leading-[36px] whitespace-pre-wrap resize-none focus:outline-none shadow-sm"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
