/**
 * An entry in the construct metadata table.
 */
export interface MetadataEntry {
  /**
   * The metadata entry type.
   */
  readonly type: string;

  /**
   * The data.
   */
  readonly data: any;

  /**
   * Stack trace at the point of adding the metadata.
   *
   * Only available if `addMetadata()` is called with `stackTrace: true`.
   *
   * @default - no trace information
   */
  readonly trace?: string[];
}

/**
 * Metadata keys used by constructs.
 */
export class ConstructMetadata {
  /**
   * Context type for info level messages.
   */
  public static readonly INFO_METADATA_KEY = 'info';

  /**
   * Context type for warning level messages.
   */
  public static readonly WARNING_METADATA_KEY = 'warning';

  /**
   * Context type for error level messages.
   */
  public static readonly ERROR_METADATA_KEY = 'error';

  private constructor() { }
}