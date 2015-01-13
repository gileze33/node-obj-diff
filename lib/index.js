module.exports = function(from, to, compareFn) {
    var result = {
        added: [],
        removed: [],
        unchanged: []
    };

    var matchedFrom = {};
    var matchedTo = {};

    var equals = compareFn || function(a, b) { return (a == b); };

    var i;
    for(i=0; i<to.length; i++) {
        for(var x=0; x<from.length; x++) {
            if(equals(to[i], from[x])) {
                // exists in both
                matchedFrom[x] = true;
                matchedTo[i] = true;
                result.unchanged.push(from[x]);
            }
        }
    }
    for(i=0; i<to.length; i++) {
        if(matchedTo[i] !== true) {
            result.added.push(to[i]);
        }
    }
    for(i=0; i<from.length; i++) { 
        if(matchedFrom[i] !== true) {
            result.removed.push(from[i]);
        }
    }

    return result;
};