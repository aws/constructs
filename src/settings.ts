import { Construct } from './construct';
import * as consts from './private/consts';

/**
 * Global settings for this library.
 *
 * Mostly here to enable backwards compatibility with the AWS CDK.
 */
export class ConstructScopeSettings {
  public static of(scope: Construct): ConstructScopeSettings {
    return new ConstructScopeSettings(scope);
  }

  private constructor(private readonly scope: Construct) { }

  public disableStackTraces() {
    this.scope.node.setContext(consts.DISABLE_STACK_TRACE, true);
  }

  public set infoMetadataKey(key: string) {
    this.scope.node.setContext(consts.CUSTOM_INFO_KEY, key);
  }

  public set warningMetadataKey(key: string) {
    this.scope.node.setContext(consts.CUSTOM_WARNING_KEY, key);
  }

  public set errorMetadataKey(key: string) {
    this.scope.node.setContext(consts.CUSTOM_ERROR_KEY, key);
  }
}