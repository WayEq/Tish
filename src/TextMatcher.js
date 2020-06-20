export class TextMatcher {
    constructor(quotes) {
        this.quotes = quotes;
    }

    matchQuote(text) {
        let that = this;
        return this.quotes.reduce(function (acc, current) {
            let similarityValue = that.similarity(text, current);
            if (similarityValue > acc.score) {
                return {best: current, score: similarityValue}
            }
            return acc;
        }, {best: null, score: -10000}).best

    }

    similarity(sample, candidate) {
        if (sample === "") return 1
        let sampleWords = sample.toLowerCase().match(/\b(\w+)\b/g)
        let candidateWords = candidate.toLowerCase().match(/\b(\w+)\b/g)
        return sampleWords.filter(x => candidateWords.includes(x)).length

    }
}