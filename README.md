# tibetan-mantra-to-iast-and-phonetics

A naive attempt at converting the mantras from Unicode Tibetan into
IAST (International Alphabet of Sanskrit Transliteration) and phonetics.

## Installation

```bash
npm install tibetan-mantra-to-iast-and-phonetics
```

### Basic Usage

```javascript
import { TibetanMantraToIastAndPhonetics } from "tibetan-mantra-to-iast-and-phonetics";

// Transliterate to IAST
const tibetan = "ཨོཾ་མ་ཎི་པདྨེ་ཧཱུྃ།";
const transliterator = new TibetanMantraToIastAndPhonetics(tibetan);
const iast = transliterator.transliterate({ mode: "iast" });
console.log(iast); // "oṁ maṇi padmé hūṁ"

// Transliterate to phonetics
const phonetics = transliterator.transliterate({ mode: "phonetics" });
console.log(phonetics); // "om mani padme hung"
```

### Options

The `transliterate()` method accepts an options object:

- `mode`: `'iast'` (default) or `'phonetics'`
- `capitalize`: `true` or `false` (default) - Capitalizes the first letter

```javascript
const result = transliterator.transliterate({
  mode: "iast",
  capitalize: true,
});
```

### Running Tests

The package includes a test suite that can be imported and used:

```javascript
import {
  testGroups,
  runTests,
} from "tibetan-mantra-to-iast-and-phonetics/tests";

// Get test data
console.log(testGroups);

// Run all tests
const results = runTests();
console.log(results);
```

Or run tests from the command line:

```bash
npm test
```

## TODO

- Find the right transliteration for all the rules marked "to check"

## Credits

A zillion thanks to everybody involved in building an maintaining Vue.js,
jQuery, SemanticUI, Sugar.js, Underscore.js, DevDocs, Zeal and Google Chrome
for making web development so easy and enjoyable.

Through the virtue coming from this work, may all beings human and
otherwise reach absolute freedom.

## License

This software is licensed under the MIT License.

Copyright Padmakara, 2021-present.

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the
following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
USE OR OTHER DEALINGS IN THE SOFTWARE.
