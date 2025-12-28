import TibetanNormalizer from "tibetan-normalizer";
import { loadReplacements } from "tibetan-sanskrit-transliteration-data";
import normalizeString from "./normalize.js";

function removeUntranscribedPunctuationAndNormalize(
  tibetan,
  keepTrailingTshek = false
) {
  const normalized = TibetanNormalizer.normalize(tibetan);
  return normalized
    .replace(/[༵\u0F04-\u0F0A\u0F0D-\u0F1F\u0F3A-\u0F3F\u0FBE-\uF269]/g, "་")
    .trim()
    .replace(/[ྃྂ]/g, "ཾ")
    .replace(/([༔ཿ])/g, "$1་")
    .replace(/༌།/g, "།")
    .replace(/་$/g, keepTrailingTshek ? "་" : "");
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function last(str) {
  return str.charAt(str.length - 1);
}

// Load and preprocess replacement map from CSV
const rawReplacements = loadReplacements();
const replacementMap = rawReplacements.map((hash) => {
  hash.tibetan = removeUntranscribedPunctuationAndNormalize(hash.tibetan);
  return hash;
});

const TibetanMantraToIastAndPhonetics = function (tibetan) {
  return {
    tibetan: tibetan,
    line: "",
    transliterate: function (options = {}) {
      const mode = options.mode || "iast";
      var replaced = removeUntranscribedPunctuationAndNormalize(
        this.tibetan,
        true
      );
      replacementMap.forEach(function (word) {
        var replacement =
          mode === "phonetics"
            ? word.phonetics || normalizeString(word.transliteration)
            : word.transliteration;
        replaced = replaced.replace(
          new RegExp("(" + word.tibetan + "[^་།༑༔]*)་ནཱཾ", "g"),
          mode === "phonetics" ? "$1་^^^nam" : "$1་^^^nāṃ"
        );
        if (last(replacement) == "a") {
          replacement = replacement.slice(0, -1);
          replaced = replaced.replace(
            new RegExp("(" + word.tibetan + ")ཱ་ཡ་", "g"),
            mode === "phonetics" ? "$1aya " : "$1āya "
          );
          replaced = replaced.replace(
            new RegExp("(" + word.tibetan + ")་ཡ་", "g"),
            "$1aya "
          );
          replaced = replaced.replace(
            new RegExp(word.tibetan + "[་།༑༔]", "g"),
            replacement + "a "
          );
          replaced = replaced.replace(
            new RegExp(word.tibetan + "ཿ", "g"),
            replacement + (mode === "phonetics" ? "ah" : "aḥ")
          );
        }
        replaced = replaced.replace(new RegExp(word.tibetan, "g"), replacement);
      });
      this.line = replaced.replace(/་/g, " ").replace(/ ?\^\^\^/g, "");
      if (options.capitalize) {
        this.line = capitalize(this.line);
        this.line = this.line.replace(
          / {2,}(.)/g,
          (letter) => "    " + letter.toUpperCase()
        );
      } else this.line = this.line.replace(/ {2,}/g, "    ");
      // Apply anusvara style: default is 'ṃ', if 'ṁ' is requested, replace all ṃ with ṁ
      if (options.anusvaraStyle === "ṁ") {
        this.line = this.line.replace(/ṃ/g, "ṁ");
      }
      return this.line.trim();
    },
  };
};

export default TibetanMantraToIastAndPhonetics;
export { loadReplacements, removeUntranscribedPunctuationAndNormalize };
