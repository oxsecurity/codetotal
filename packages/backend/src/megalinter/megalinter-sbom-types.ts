export interface Component {
  "bom-ref": string;
  type: string;
  name?: string;
  version?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties?: any[];
  purl?: string;
}

export interface Dependency {
  ref: string;
  dependsOn?: string[];
}

export interface LicenseInfo {
  license: string;
  severity: string;
}

export interface NpmLicense {
  type?: string;
  url?: string;
}
