interface NPMPackageJSon extends Record<string, unknown> {
    name: string;
    version: string;
}
export declare const npmPackage: () => NPMPackageJSon;
export {};
