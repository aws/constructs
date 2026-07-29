import * as crypto from 'crypto';

/**
 * Constructs with this id are completely hidden from the address calculation.
 */
const HIDDEN_ID = 'Default';

/**
 * Separator used to delimit path components while calculating an address.
 *
 * Ids are sanitized before they become path components (see `sanitizeId()` in
 * `construct.ts`), so that a single component never contains this character.
 * Otherwise one component could hash like several: the single component
 * `a<sep>b` would be fed to the hash exactly like the two components `a` and
 * `b`.
 */
export const ADDR_SEP = '\n';

/**
 * Calculates the construct addr based on path components.
 *
 * Components named `Default` (case sensitive) are excluded from addr
 * calculation to allow tree refactorings.
 */
export function addressOf(components: string[]) {
  const hash = crypto.createHash('sha1');
  for (const c of components) {
    // skip components called "Default" to enable refactorings
    if (c === HIDDEN_ID) { continue; }

    hash.update(c);
    hash.update(ADDR_SEP);
  }

  // prefix with "c8" so to ensure it starts with non-digit.
  return 'c8' + hash.digest('hex');
}
