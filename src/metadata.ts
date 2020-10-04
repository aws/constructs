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
