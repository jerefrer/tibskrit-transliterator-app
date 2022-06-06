var extractTransliteration = function(text) {
  var lines = text.split("\n");
  var transliterationLines = [];
  _(lines).each(function(line) {
    if (line.match(/^[A-Z][ ]*\d*$/)) return; // Page number
    if (line.match(/[ÂĀÊĒÎĪÔŌṐÛŪâāêēîīôōûūf1-9\,\;\.\:\!\?\*\_\(\)]/)) return; // Translation line
    transliterationLines.push(line);
  })
  return transliterationLines.join("\n");
}


var removeUntranscribedPunctuationAndNormalize = function(tibetan, keepTrailingTshek=false) {
  return tibetan
    .replace(/[༵\u0F04-\u0F0A\u0F0D-\u0F1F\u0F3A-\u0F3F\u0FBE-\uF269]/g, '་').trim()
    .replace(/([༔ཿ])/g, '$1་')
    .replace(/༌+/g, '་') // Normalize tshek 3852 into 3851
    .replace(/་+/g, '་')
    .replace(/༌།/g, '།')
    .replace(/་$/g, keepTrailingTshek ? '་' : '')
    .replace(/ༀ/g, 'ཨོཾ')
    .replace(/ཀྵ/g, 'ཀྵ')
    .replace(/[ྃྂ]/g, 'ཾ')
    .replace(/(ཾ)([ཱཱཱེིོིྀུུ])/g, '$2$1') // Fixes malformed syllables with anusvara before vowel
    .replace(/ཱུ/g, 'ཱུ')
    .replace(/ཱི/g, 'ཱི')
    .replace(/ཱྀ/g, 'ཱྀ')
    .replace(/དྷ/g, 'དྷ')
    .replace(/དྡྷ/g, 'དྡྷ')
    .replace(/ྡྷ/g, 'ྡྷ')
    .replace(/བྷ/g, 'བྷ')
    .replace(/གྷ/g, 'གྷ')
    .replace(/བྷ/g, 'བྷ');
}