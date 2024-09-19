const objDoProp = function (obj, prop, def, enm, mut) {
  return Object.defineProperty(obj, prop, {
    value: def,
    writable: mut,
    enumerable: enm,
    configurable: mut
  });
};
const objDefProp=(obj, prop, def) => objDoProp (obj, prop, def, false, true);
const objDefEnum=(obj, prop, def) => objDoProp (obj, prop, def, true, true);
objDefProp(String.prototype,"rm",function rm(re){
  return this.replace(re,'');
});
objDefProp(Array.prototype,"joinWords",function joinWords(re){
  return this.join(' ');
});
objDefProp(String.prototype,"splitWords",function splitWords(re){
  return this.split(' ');
});

const lcs = function lcs(seq1, seq2) {
  "use strict";
  let arr1 = [...seq1??[]];
  let arr2 = [...seq2??[]];
  if (arr2.length > arr1.length) {
    [arr1, arr2] = [arr2, arr1];
  }
  const dp = Array(arr1.length + 1).fill(0).map(() => Array(arr2.length + 1).fill(0));
  const dp_length = dp.length;
  for (let i = 1; i !== dp_length; i++) {
    const dpi_length = dp[i].length;
    for (let x = 1; x !== dp_length; x++) {
      if (arr1[i - 1] === arr2[x - 1]) {
        dp[i][x] = dp[i - 1][x - 1] + 1
      } else {
        dp[i][x] = Math.max(dp[i][x - 1], dp[i - 1][x])
      }
    }
  }
  return dp[arr1.length][arr2.length]
};
const wordMatch = function wordMatch(str1, str2) {
  return lcs(str1, str2) >= Math.floor(0.8 * Math.max(str1?.length ?? 0, str2?.length ?? 0));
}
const lcws = function lcws(seq1, seq2) {
  "use strict";
  let arr1 = seq1.replace(/[^a-zA-Z ]/g, ' ').toLowerCase().splitWords();
  let arr2 = seq2.replace(/[^a-zA-Z ]/g, ' ').toLowerCase().splitWords();
  if (arr2.length > arr1.length) {
    [arr1, arr2] = [arr2, arr1];
  }
  const dp = Array(arr1.length + 1).fill(0).map(() => Array(arr2.length + 1).fill(0));
  const dp_length = dp.length;
  for (let i = 1; i !== dp_length; i++) {
    const dpi_length = dp[i].length;
    for (let x = 1; x !== dp_length; x++) {
      if (wordMatch(arr1[i - 1], arr2[x - 1])) {
        dp[i][x] = dp[i - 1][x - 1] + 1
      } else {
        dp[i][x] = Math.max(dp[i][x - 1], dp[i - 1][x])
      }
    }
  }
  return dp[arr1.length][arr2.length]
};
const lessErr = function lessErr(str) {
  return String(str).toLowerCase()
                     .replace(/[^a-zA-Z ]/g, ' ')
                     .rm(/Exception|Error/gi)
                     .rm(/Err/gi)
                     .splitWords()
                     .filter(x => x && x?.length)
                     .joinWords();
}
const phraseMatch = function wordMatch(str1, str2) {
  return lcws(str1, str2) >= Math.floor(0.8 * Math.max(String(str1).splitWords().length, String(str2).splitWords().length));
}
