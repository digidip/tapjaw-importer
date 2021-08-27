import fs from 'fs';

interface NPMPackageJSon extends Record<string, unknown> {
    name: string;
    version: string;
}

export const npmPackage = (): NPMPackageJSon => {
    return JSON.parse(fs.readFileSync(__dirname + '/../../package.json').toString());
};
