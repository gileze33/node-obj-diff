var expect = require('chai').expect;
var _ = require('lodash');

var objDiff = require('../lib/index');

describe('obj-diff', function() {
    it('should return an empty "removed" and "added" array if no items have changed', function() {
        var from = [{
            test: 1
        }, {
            test: 2
        }, {
            test: 4
        }];
        var to = from;
        var result = objDiff(from, to, function(a, b) {
            return (a.test === b.test);
        });

        expect(result.added.length).to.equal(0);
        expect(result.removed.length).to.equal(0);
    });

    it('should return an empty "removed" and non empty "added" array if items have just been added', function() {
        var from = [{
            test: 1
        }, {
            test: 2
        }, {
            test: 4
        }];
        var to = _.clone(from);

        var newItem = {
            test: 5
        };
        to.push(newItem);

        var result = objDiff(from, to, function(a, b) {
            return (a.test === b.test);
        });

        expect(result.removed.length).to.equal(0);

        expect(result.added.length).to.not.equal(0);
        expect(result.added[0]).to.equal(newItem);
    });

    it('should return an empty "added" and non empty "removed" array if items have just been removed', function() {
        var removedItem = {
            test: 8
        };

        var from = [{
            test: 1
        }, {
            test: 2
        }, {
            test: 4
        }];
        var to = _.clone(from);
        
        from.push(removedItem);

        var result = objDiff(from, to, function(a, b) {
            return (a.test === b.test);
        });

        expect(result.added.length).to.equal(0);

        expect(result.removed.length).to.not.equal(0);
        expect(result.removed[0]).to.equal(removedItem);
    });

    it('should calculate the "unchanged" array correctly', function() {
        var unchangedItems = [{
            test: 1
        }, {
            test: 2
        }, {
            test: 4
        }];

        var from = _.clone(unchangedItems);
        var to = _.clone(unchangedItems);

        from.push({
            test: 8 // removed item
        });
        to.push({
            test: 14 // added item
        });
        
        var result = objDiff(from, to, function(a, b) {
            return (a.test === b.test);
        });

        for(var i=0; i<unchangedItems.length; i++) {
            expect(result.unchanged[i]).to.equal(unchangedItems[i]);
        }
    });
});