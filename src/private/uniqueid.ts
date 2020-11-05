import * as crypto from 'crypto';

/**
 * Resources with this ID are complete hidden from the logical ID calculation.
 */
const HIDDEN_ID = 'Default';

/**
 * Calculates the construct uid based on path components.
 *
 * Components named `Default` (case sensitive) are excluded from uid calculation
 * to allow tree refactorings.
 *
 * @param components path components
 */
export function addressOf(components: string[]) {
  const hash = crypto.createHash('sha1');
  for (const c of components) {
    // skip components called "Default" to enable refactorings
    if (c === HIDDEN_ID) { continue; }

    hash.update(c);
    hash.update('\n');
  }

  // prefix with "c8" so to ensure it starts with non-digit.
  return 'c8' + hash.digest('hex');
}
