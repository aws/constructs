import type { IConstruct } from './construct';

/**
 * A mixin is a reusable piece of functionality that can be applied to constructs
 * to add behavior, properties, or modify existing functionality without inheritance.
 */
export interface IMixin {
  /**
   * Determines whether this mixin can be applied to the given construct.
   */
  supports(construct: IConstruct): boolean;

  /**
   * Applies the mixin functionality to the target construct.
   */
  applyTo(construct: IConstruct): void;
}
