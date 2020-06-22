export class TextMatcher {
    constructor(quotes) {
        this.quotes = quotes;
    }

    matchQuote(text) {
        let that = this;
        let best = this.quotes.reduce(function (acc, current) {
            let similarityValue = that.similarity(text, current);
            if (similarityValue > acc.score) {
                return {best: current, score: similarityValue}
            }
            return acc;
        }, {best: null, score: -10000})
        console.log(best)
        if (best.score===0) {
            return this.getRandomQuote()
        }
        return best.best

    }



    getRandomQuote() {
        return this.quotes[Math.floor(Math.random() * this.quotes.length)];
    }
    similarity(sample, candidate) {
        if (sample === "") return 1
        let sampleWords = sample.toLowerCase().match(/\b(\w+)\b/g)
        let candidateWords = candidate.toLowerCase().match(/\b(\w+)\b/g)
        return sampleWords.filter(x => candidateWords.includes(x)).length

    }
}