#obj-diff

I needed a way of calculating the changes between two arrays of objects with ease

Outputs an object with 3 properties: added, removed, unchanged

Note that the third parameter (the comparator) is not required - if not provided a default (a == b) is used
 
##Example usage

    var items = [{
      id: 1
    }, {
      id: 2
    }, {
      id: 3
    }];
    
    var from = [items[0], items[1]];
    var to = [items[1], items[2]];
    
    var result = require('obj-diff')(from, to, function(a, b) { return (a.id == b.id); });
    
    console.log(result);
    
    /*
      outputs:
      
      { 
        added: [ { id: 3 } ],
        removed: [ { id: 1 } ],
        unchanged: [ { id: 2 } ] 
      }
    */
    
