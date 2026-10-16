// react-native-web re-exports react-art as ART, but nothing here uses ART and
// its "art" dependency breaks when bundled by Rollup (top-level `this` in CJS).
export default {};
