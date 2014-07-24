(function ($) {

    function MockServer() {

        var trans = function (date, amount, valuation) {
            return { "date": date + "T00:00:00", amount: amount, valuation: !!valuation };
        };

        var investments = [
            { "id": 1, "name": "Adept Incorporated", sector: "Technology", "transactions": [trans("2010-04-20", 1000), trans("2011-03-19", 500), trans("2012-12-30", -800), trans("2013-06-03", -1500)] },
            { "id": 2, "name": "Global Industries", sector: "Financial", "transactions": [trans("2011-02-06", 1200), trans("2011-08-14", 800), trans("2013-06-30", -1000), trans("2014-06-30", -2500, true)] },
            { "id": 3, "name": "Blue Chip Technology", sector: "Technology", "transactions": [trans("2012-08-10", 1000), trans("2013-02-13", 500), trans("2014-06-30", -1300, true)] },
            { "id": 4, "name": "Fast Foods UK", sector: "Produce", "transactions": [trans("2011-07-15", 300), trans("2014-02-09", -400)] },
            { "id": 5, "name": "Eurobank", sector: "Financial", "transactions": [trans("2010-03-10", 3000), trans("2012-04-27", 1000), trans("2013-12-31", -4140)] },
            { "id": 6, "name": "Tremendous Textiles", sector: "Manufacturing", "transactions": [trans("2011-01-28", 890), trans("2012-06-15", -700)] },
            { "id": 7, "name": "Roboto Robotics", sector: "Technology", "transactions": [trans("2013-02-12", 400), trans("2014-06-09", 200), trans("2014-06-30", -720, true)] },
            { "id": 8, "name": "Europe Pharmaceuticals", sector: "Pharmaceutical", "transactions": [trans("2012-11-01", 590), trans("2013-03-10", 200), trans("2013-06-15", 400), trans("2014-06-30", -1170, true)] },
            { "id": 9, "name": "Tornel Networks", sector: "Technology", "transactions": [trans("2011-12-10", 1470), trans("2014-06-30", -1598, true)] },
            { "id": 10, "name": "Minimeal", sector: "Produce", "transactions": [trans("2012-02-15", 2148), trans("2012-12-30", -500), trans("2013-04-20", -2496)] },
            { "id": 11, "name": "Focus", sector: "Technology", "transactions": [trans("2012-05-02", 798), trans("2014-01-19", -740)] },
            { "id": 12, "name": "Severn Sockets", sector: "Power", "transactions": [trans("2012-08-25", 310), trans("2014-11-01", -400), trans("2013-11-05", -20)] },
            { "id": 13, "name": "Eastern Energy", sector: "Power", "transactions": [trans("2012-09-30", 3020), trans("2013-09-30", 3000), trans("2014-06-30", -6328, true)] },
            { "id": 14, "name": "Pharmacol", sector: "Pharmaceutical", "transactions": [trans("2012-11-20", 1872), trans("2013-05-19", -1000), trans("2014-02-25", -1139)] },
            { "id": 15, "name": "Zebra Corp", sector: "Financial", "transactions": [trans("2012-12-10", 950), trans("2013-03-02", 500), trans("2013-06-18", 500), trans("2014-06-30", -2287, true)] },
            { "id": 16, "name": "Powernet", sector: "Power", "transactions": [trans("2013-01-04", 1487), trans("2014-06-30", -1698, true)] },
            { "id": 17, "name": "Inca Investments", sector: "Financial", "transactions": [trans("2013-03-27", 420), trans("2014-01-15", -300), trans("2014-06-30", -80, true)] }
        ];

        var getFilteredInvestments = function getFilteredInvestments(name) {
            return investments.filter(function (i) {
                return name === "" || i.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
            });
        };

        this.analysis = function (name) {
            return getFilteredInvestments(name).map(toModel);
        };

        this.getInvestment = function (id) {
            var matches = investments.filter(function (i) { return i.id === id; });
            return matches.length === 0 ? null :
                {
                    name: matches[0].name,
                    sector: matches[0].sector,
                    transactions: matches[0].transactions,
                    analysis: toModel(matches[0])
                };
        };

        this.getSectors = function (name) {
            var sectors = {};

            var analysisResults = this.analysis(name);
            for (var i = 0; i < analysisResults.length; i++) {
                var investment = analysisResults[i];
                var sector = sectors[investment.sector];
                if (!sector) {
                    sector = { name: investment.sector, investedAmount: 0, returnAmount: 0 };
                    sectors[investment.sector] = sector;
                }

                sector.investedAmount += investment.investedAmount;
                sector.returnAmount += investment.returnAmount;
            }

            var sectorList = [];
            for (var sector in sectors) {
                sectorList.push(sectors[sector]);
            }

            return sectorList;
        };

        this.getTransactions = function (name) {
            var investments = getFilteredInvestments(name);

            var transactions = investments.reduce(function (list, investment) {
                $.each(investment.transactions, function (i, t) {
                    if ( !t.valuation ) list.push(t);
                })
                return list;
            }, []);

            return transactions;
        };

        var toModel = function toModel(investment) {
            var transactions = investment.transactions;
            var startDate = transactions[0].date;
            var endDate = transactions[investment.transactions.length - 1].date;

            var investedAmount = transactions.filter(function (t) { return t.amount > 0; }).reduce(function (sum, t) { return sum + t.amount; }, 0);
            var returnAmount = transactions.filter(function (t) { return t.amount < 0; }).reduce(function (sum, t) { return sum - t.amount; }, 0);

            return {
                id: investment.id,
                name: investment.name,
                sector: investment.sector,
                startDate: startDate,
                endDate: endDate,
                holdingPeriod: (new Date(Date.parse(endDate)).getTime() - new Date(Date.parse(startDate)).getTime()) / (365.25 * 24 * 3600 * 1000),
                investedAmount: investedAmount,
                returnAmount: returnAmount,
                returnOnInvestment: (returnAmount - investedAmount) / investedAmount,
                open: transactions[investment.transactions.length - 1].valuation
            };
        };
    };

    window.testSPA = window.testSPA || {};
    window.testSPA.mockServer = new MockServer();

})(jQuery);
