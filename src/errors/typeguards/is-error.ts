export default (obj: unknown): obj is Error => {
    return Boolean(obj instanceof Error || (obj && typeof obj === 'object' && 'obj' in obj && 'stack' in obj));
};
