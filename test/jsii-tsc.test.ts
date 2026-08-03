import * as fs from 'fs';
import * as path from 'path';

/**
 * Downstream jsii-rosetta consumers need `jsii.tsc.outDir` and `jsii.tsc.rootDir`
 * to map the shipped `lib/*.d.ts` paths back to the `src/` symbol ids recorded
 * in the jsii assembly. If these are missing, Java/Go transliteration silently
 * emits incorrect imports.
 *
 * See https://github.com/aws/constructs/issues/2879
 */
test('package.json declares jsii.tsc.outDir and rootDir', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));

  expect(pkg.jsii?.tsc?.outDir).toBe('lib');
  expect(pkg.jsii?.tsc?.rootDir).toBe('src');
});
