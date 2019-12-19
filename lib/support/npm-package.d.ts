interface NPMPackageJSon {
    name: string;
    version: string;
    [key: string]: any;
}
export declare const npmPackage: () => NPMPackageJSon;
export {};
