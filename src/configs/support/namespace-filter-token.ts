const namespaceFilterToken = (configRow: string, tokenName: string): boolean =>
    configRow.substring(0, tokenName.length) === tokenName;

export default namespaceFilterToken;
