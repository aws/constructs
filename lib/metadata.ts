
export interface MetadataEntry {
  readonly type: string;
  readonly data: any;
  readonly trace?: string[];
}

export class ConstructMetadata {
  public static readonly DISABLE_STACK_TRACE_IN_METADATA = 'constructs/disable-stack-trace';
  public static readonly INFO_METADATA_KEY = 'constructs:info';
  public static readonly WARNING_METADATA_KEY = 'constructs:warning';
  public static readonly ERROR_METADATA_KEY = 'constructs:error';

  private constructor() { }
}