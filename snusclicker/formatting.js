class Format {
    constructor() {}

    static smallFormatter = new Intl.NumberFormat(undefined,
        {
            maximumFractionDigits: 1,
            minimumFractionDigits: 1,
            style: 'decimal',
            useGrouping: true,
        });
    static mediumFormatter = new Intl.NumberFormat(undefined,
        {
           maximumFractionDigits: 0,
           style: "decimal",
           useGrouping: true,
        });
    static largeFormatter = new Intl.NumberFormat(undefined,
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,

            style: 'decimal',
            notation: 'compact',
            compactDisplay: 'long'
        })

    static smallIntegerFormatter = new Intl.NumberFormat(undefined,
        {
            maximumFractionDigits: 0,
            style: 'decimal',
            useGrouping: true,
        });
    static mediumIntegerFormatter = new Intl.NumberFormat(undefined,
        {
            maximumFractionDigits: 0,
            style: "decimal",
            useGrouping: true,
        });
    static largeIntegerFormatter = new Intl.NumberFormat(undefined,
        {
            maximumFractionDigits: 0,
            style: 'decimal',
            notation: 'compact',
            compactDisplay: 'long'
        })

    static formatNumber(number) {
        const fixed = number.toFixed(2);

        if (fixed < 100000) // one hundred thousand
        {
            return this.smallFormatter.format(number);
        } else if (fixed < 1000000) // one million
        {
            return this.mediumFormatter.format(number);
        }
        return this.largeFormatter.format(number);
    }
    static formatWholeNumber(number)
    {
        const fixed = number.toFixed(2);

        if (fixed < 100000) // one hundred thousand
        {
            return this.smallIntegerFormatter.format(number);
        } else if (fixed < 1000000) // one million
        {
            return this.mediumIntegerFormatter.format(number);
        }
        return this.largeIntegerFormatter.format(number);
    }
}