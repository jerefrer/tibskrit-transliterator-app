import TibetanMantraToIastAndPhonetics from "./lib/tibetan-mantra-to-iast-and-phonetics.js";

export { TibetanMantraToIastAndPhonetics };

export const testGroups = [
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
      { tibetan: "ཨོཾ་ཨ་ར་པ་ཙ་ན།", result: "om a ra pa cha na" },
      { tibetan: "བཛྲ་པཱ་ཙ་ཧོ།", result: "vajra pacha ho" },
    ],
  },
];

export function runTests() {
  const results = testGroups.map((group) => {
    const groupResults = {
      name: group.name,
      tests: group.tests.map((test) => {
        const options = { mode: group.phonetics ? "phonetics" : "iast" };
        const transliterated = new TibetanMantraToIastAndPhonetics(
          test.tibetan
        ).transliterate(options);
        const pass = transliterated === test.result;
        return {
          tibetan: test.tibetan,
          expected: test.result,
          actual: transliterated,
          pass,
        };
      }),
    };
    return groupResults;
  });

  return results;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const results = runTests();
  let totalPassed = 0;
  let totalTests = 0;

  console.log("\n=== Tibetan Mantra Transliteration Tests ===\n");

  results.forEach((group) => {
    const passed = group.tests.filter((t) => t.pass).length;
    const total = group.tests.length;
    totalPassed += passed;
    totalTests += total;

    console.log(`${group.name}: ${passed}/${total}`);
    group.tests.forEach((test) => {
      if (!test.pass) {
        console.log(`  ✗ ${test.tibetan}`);
        console.log(`    Expected: ${test.expected}`);
        console.log(`    Got:      ${test.actual}`);
      }
    });
  });

  console.log(
    `\nTotal: ${totalPassed}/${totalTests} (${(
      (totalPassed / totalTests) *
      100
    ).toFixed(1)}%)\n`
  );
  process.exit(totalPassed === totalTests ? 0 : 1);
}
