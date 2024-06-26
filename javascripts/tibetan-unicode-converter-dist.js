"use strict";

var TibetanUnicodeConverter = function TibetanUnicodeConverter(conversion) {
  return {
    conversion: conversion,
    line: '',
    convert: function convert() {
      var replaced = this.conversion;

      _(wordsMap).each(function (word) {
        replaced = replaced.replace(new RegExp(word.encoded, 'g'), word.tibetan);
      });

      var chars = replaced.split('');

      var _char;

      while (_char = chars.shift()) {
        this.line += this.convertChar(_char);
      }

      return this.line;
    },
    convertChar: function convertChar(_char2) {
      if (_char2 == ' ') return _char2;

      var match = _(charsMap).find(function (object) {
        return _(object.encoded).contains(_char2);
      });

      if (match) return match.tibetan;else return _char2;
    }
  };
};

var charsMap = [{
  tibetan: '༈',
  encoded: 'Ì'
}, {
  tibetan: '་',
  encoded: '-Í'
}, {
  tibetan: '།',
  encoded: 'ÊË'
}, {
  tibetan: '༔',
  encoded: 'Î'
}, {
  tibetan: 'ཿ',
  encoded: 'ï'
}, {
  tibetan: '༴',
  encoded: 'Ï'
}, {
  tibetan: '༄༅',
  encoded: 'É'
}, {
  tibetan: '༄',
  encoded: 'Ò'
}, {
  tibetan: '༅',
  encoded: 'È'
}, {
  tibetan: 'ཛྲ',
  encoded: '‰'
}, {
  tibetan: 'སྭ',
  encoded: '—'
}, {
  tibetan: 'གྲྭ',
  encoded: '™'
}, {
  tibetan: 'ཏྭ',
  encoded: ''
}, {
  tibetan: 'ཌ',
  encoded: '¬'
}, {
  tibetan: 'ངྒ',
  encoded: ']'
}, {
  tibetan: 'བྷ',
  encoded: '£'
}, {
  tibetan: 'ཥ',
  encoded: '®'
}, {
  tibetan: 'ཛྱ',
  encoded: 'ˆ'
}, {
  tibetan: 'ཋ',
  encoded: '«'
}, {
  tibetan: 'ཀྵ',
  encoded: '¯'
}, {
  tibetan: 'རྟ',
  encoded: '½'
}, {
  tibetan: 'ཎྜ',
  encoded: '¼'
}, {
  tibetan: 'རྒྷ',
  encoded: '¾'
}, {
  tibetan: '྄',
  encoded: 'ü'
}, {
  tibetan: 'རྐ',
  encoded: '?'
}, {
  tibetan: 'ིཾ',
  encoded: 'ó'
}, {
  tibetan: 'ཱུ',
  encoded: 'Õ'
}, {
  tibetan: 'ཻཾ',
  encoded: 'ø'
}, {
  tibetan: 'སྐྲ',
  encoded: '„'
}, {
  tibetan: 'ཛྭ',
  encoded: 'Š'
}, {
  tibetan: 'ཧྱ',
  encoded: 'ƒ'
}, {
  tibetan: 'རྒ',
  encoded: '@'
}, {
  tibetan: 'ྭ',
  encoded: 'Ÿ'
}, {
  tibetan: 'ཚྭ',
  encoded: '’'
}, {
  tibetan: 'ཁྭ',
  encoded: '‹'
}, {
  tibetan: 'ཤྭ',
  encoded: '–'
}, {
  tibetan: 'ི',
  encoded: 'ÜÝÞ'
}, {
  tibetan: 'ུ',
  encoded: 'ß¥©°àáâäã³±çå¨²æ§'
}, {
  tibetan: 'ེ',
  encoded: 'èé'
}, {
  tibetan: 'ོ',
  encoded: 'ëì'
}, {
  tibetan: 'ཱུ',
  encoded: 'Ø'
}, {
  tibetan: 'ཾ',
  encoded: 'î'
}, {
  tibetan: 'ྃ',
  encoded: 'ñ'
}, {
  tibetan: 'ཱ',
  encoded: '¡¢Ó'
}, {
  tibetan: 'ཻ',
  encoded: 'ê'
}, {
  tibetan: 'ཀ',
  encoded: '!´'
}, {
  tibetan: 'ཁ',
  encoded: '"'
}, {
  tibetan: 'ག',
  encoded: '#μ'
}, {
  tibetan: 'ང',
  encoded: '$'
}, {
  tibetan: 'ཅ',
  encoded: '%'
}, {
  tibetan: 'ཆ',
  encoded: '&'
}, {
  tibetan: 'ཇ',
  encoded: "'"
}, {
  tibetan: 'ཉ',
  encoded: '(¶'
}, {
  tibetan: 'ཏ',
  encoded: ')·'
}, {
  tibetan: 'ཐ',
  encoded: '*'
}, {
  tibetan: 'ད',
  encoded: '+¸'
}, {
  tibetan: 'ན',
  encoded: ',¹'
}, {
  tibetan: 'པ',
  encoded: 'ý'
}, {
  tibetan: 'ཕ',
  encoded: '.'
}, {
  tibetan: 'བ',
  encoded: '/'
}, {
  tibetan: 'མ',
  encoded: '0'
}, {
  tibetan: 'ཙ',
  encoded: '1'
}, {
  tibetan: 'ཚ',
  encoded: '2'
}, {
  tibetan: 'ཛ',
  encoded: '3'
}, {
  tibetan: 'ཝ',
  encoded: '4'
}, {
  tibetan: 'ཞ',
  encoded: '5º'
}, {
  tibetan: 'ཟ',
  encoded: '6'
}, {
  tibetan: 'འ',
  encoded: '7'
}, {
  tibetan: 'ཡ',
  encoded: '8'
}, {
  tibetan: 'ར',
  encoded: '9'
}, {
  tibetan: 'ལ',
  encoded: ':'
}, {
  tibetan: 'ཤ',
  encoded: ';»'
}, {
  tibetan: 'ས',
  encoded: '<'
}, {
  tibetan: 'ཧ',
  encoded: '='
}, {
  tibetan: 'ཨ',
  encoded: '>'
}, {
  tibetan: 'ཊ',
  encoded: 'ª'
}, {
  tibetan: 'ཁྱ',
  encoded: 'a'
}, {
  tibetan: 'གྱ',
  encoded: 'b'
}, {
  tibetan: 'པྱ',
  encoded: 'c'
}, {
  tibetan: 'ཕྱ',
  encoded: 'd'
}, {
  tibetan: 'བྱ',
  encoded: 'e'
}, {
  tibetan: 'མྱ',
  encoded: 'f'
}, {
  tibetan: 'ཀྲ',
  encoded: 'g'
}, {
  tibetan: 'ཁྲ',
  encoded: 'h'
}, {
  tibetan: 'གྲ',
  encoded: 'i'
}, {
  tibetan: 'ཏྲ',
  encoded: 'j'
}, {
  tibetan: 'ཐྲ',
  encoded: 'k'
}, {
  tibetan: 'དྲ',
  encoded: 'l'
}, {
  tibetan: 'པྲ',
  encoded: 'm'
}, {
  tibetan: 'ཕྲ',
  encoded: 'n'
}, {
  tibetan: 'བྲ',
  encoded: 'o'
}, {
  tibetan: 'མྲ',
  encoded: 'p'
}, {
  tibetan: 'ཤྲ',
  encoded: 'q'
}, {
  tibetan: 'སྲ',
  encoded: 'r'
}, {
  tibetan: 'ཧྲ',
  encoded: 's'
}, {
  tibetan: 'ཀླ',
  encoded: 't'
}, {
  tibetan: 'གླ',
  encoded: 'u'
}, {
  tibetan: 'བླ',
  encoded: 'v'
}, {
  tibetan: 'ཟླ',
  encoded: 'w'
}, {
  tibetan: 'རླ',
  encoded: 'x'
}, {
  tibetan: 'སླ',
  encoded: 'y'
}, {
  tibetan: 'རྐྱ',
  encoded: 'z'
}, {
  tibetan: 'རྔ',
  encoded: 'A'
}, {
  tibetan: 'རྗ',
  encoded: 'B'
}, {
  tibetan: 'ཪྙ',
  encoded: 'C'
}, {
  tibetan: 'རྟ',
  encoded: 'D'
}, {
  tibetan: 'རྡ',
  encoded: 'E'
}, {
  tibetan: 'རྣ',
  encoded: 'F'
}, {
  tibetan: 'རྦ',
  encoded: 'G'
}, {
  tibetan: 'རྨ',
  encoded: 'H'
}, {
  tibetan: 'རྩ',
  encoded: 'I'
}, {
  tibetan: 'རྫ',
  encoded: 'J'
}, {
  tibetan: 'ལྐ',
  encoded: 'K'
}, {
  tibetan: 'ལྒ',
  encoded: 'L'
}, {
  tibetan: 'ལྔ',
  encoded: 'M'
}, {
  tibetan: 'ལྕ',
  encoded: 'N'
}, {
  tibetan: 'ལྗ',
  encoded: 'O'
}, {
  tibetan: 'ལྟ',
  encoded: 'P'
}, {
  tibetan: 'ལྡ',
  encoded: 'Q'
}, {
  tibetan: 'ལྤ',
  encoded: 'R'
}, {
  tibetan: 'ལྦ',
  encoded: 'S'
}, {
  tibetan: 'ལྷ',
  encoded: 'T'
}, {
  tibetan: 'སྐ',
  encoded: 'U'
}, {
  tibetan: 'སྒ',
  encoded: 'V'
}, {
  tibetan: 'སྔ',
  encoded: 'W'
}, {
  tibetan: 'སྤ',
  encoded: '\\'
}, {
  tibetan: 'སྙ',
  encoded: 'X'
}, {
  tibetan: 'སྟ',
  encoded: 'Y'
}, {
  tibetan: 'སྡ',
  encoded: 'Z'
}, {
  tibetan: 'སྒྲ',
  encoded: '…'
}, {
  tibetan: 'སྣ',
  encoded: '['
}, {
  tibetan: 'ཀྱ',
  encoded: '`'
}, {
  tibetan: 'རྒྱ',
  encoded: '{'
}, {
  tibetan: 'སྤྱ',
  encoded: ''
}, {
  tibetan: 'སྐྱ',
  encoded: 'þ'
}, {
  tibetan: 'སྒྱ',
  encoded: '€'
}, {
  tibetan: 'སྤྲ',
  encoded: '‡'
}, {
  tibetan: 'སྦྱ',
  encoded: '‚'
}, {
  tibetan: 'སྤྱ',
  encoded: '₫'
}, {
  tibetan: 'སྨ',
  encoded: '^'
}, {
  tibetan: 'སྩ',
  encoded: '_'
}, {
  tibetan: 'དྲྭ',
  encoded: 'š'
}];
var wordsMap = [{
  tibetan: 'གྱ',
  encoded: 'μb'
}, {
  tibetan: 'ཧཱུྃ',
  encoded: 'oe×ñ'
}, {
  tibetan: 'སིདྡྷི',
  encoded: '<ÜKÜ'
}, {
  tibetan: 'སིདྡྷི',
  encoded: '<Ü-KÜ'
}, {
  tibetan: 'པདྨ',
  encoded: 'ýV'
}, {
  tibetan: 'ཏྤལ',
  encoded: ',:'
}, {
  tibetan: 'ༀ',
  encoded: '>ù'
}, {
  tibetan: 'ཊྭཱཾ',
  encoded: '¤Êî'
}, {
  tibetan: 'ཊྭ',
  encoded: '¤'
}, {
  tibetan: 'ཧཱ',
  encoded: '¼Ô'
}, {
  tibetan: 'སམྦྷ',
  encoded: '<0-£'
}, {
  tibetan: 'ཞྭ',
  encoded: '“'
}, {
  tibetan: 'པཎ',
  encoded: 'ýC'
}, {
  tibetan: 'བྷ་ནྡྷ',
  encoded: '£v'
}, {
  tibetan: 'ཌཱུརྻ',
  encoded: '¬Ù<'
}, {
  tibetan: 'ཌཱུརྻ',
  encoded: '¬Ù4'
}, {
  tibetan: 'བྷྲཱུྃ',
  encoded: '¨Ôñ'
}, {
  tibetan: 'ཛྙཱ',
  encoded: 'ƒÉ'
}, {
  tibetan: 'དིཔྟ',
  encoded: '\\+ÜŠ'
}, {
  tibetan: 'ཤཱུ་ནྱ',
  encoded: '»Õ-‚'
}, {
  tibetan: 'ཏཱ',
  encoded: '·Ô'
}, {
  tibetan: 'ཨོཾཿ',
  encoded: '>ùï'
}];