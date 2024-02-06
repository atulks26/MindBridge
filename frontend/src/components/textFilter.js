export const filterExplicit = (inputText) => {
    const explicitWords = [];

    let filteredText = inputText;
    explicitWords.forEach((word) => {
        filteredText = filteredText.replace(
            new RegExp(word, "gi"),
            "*".repeat(word.length)
        );
    });

    return filteredText;
};
