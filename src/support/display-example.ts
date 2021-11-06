export default (exampleText: string): (() => void) =>
    () => {
        console.log(`\nExamples:\n  ${exampleText}`);
    };
