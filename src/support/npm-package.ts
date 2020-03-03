import fs from 'fs';

interface NPMPackageJSon {
    name: string;
    version: string;
    [key: string]: any;
}

export const npmPackage = (): NPMPackageJSon => {
    return JSON.parse(fs.readFileSync(__dirname + '/../../package.json').toString());
};
