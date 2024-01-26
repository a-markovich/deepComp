function deepComp (argument1, argument2) {
    let result;
    
    function objectToArray (obj) {
        let arr = Object.entries(obj).sort();
        for (let i = 0; i<arr.length; i++) {
            if (typeof arr[i][1] === 'object' && 
                !Array.isArray(arr[i][1]) && 
                arr[i][1] !== null
                ) {
                arr[i][1] = objectToArray (arr[i][1]);
            }
        }
        return arr;
    }
    
    function arrayComp (arr1, arr2) {

        let equalArrays = true;

        if (arr1.length !== arr2.length) {
            equalArrays = false;
        } else {
            for (let i = 0; i<arr1.length; i++) {
                if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
                    if(!arrayComp (arr1[i], arr2[i])) {
                        equalArrays = false;
                        break;
                    }
                } else if ( typeof arr1[i] === 'number' && 
                            typeof arr2[i] === 'number' && 
                            isNaN(arr1[i]) && 
                            isNaN(arr2[i]) 
                            ) {
                    continue;
                } else if (arr1[i] !== arr2[i]) {
                    equalArrays = false;
                    break;
                }
            }
        }

        return equalArrays;
    }

    if (typeof argument1 === 'object' && argument1 !== null && !Array.isArray(argument1)) {
        argument1 = objectToArray (argument1);
    }
    if (typeof argument2 === 'object' && argument2 !== null && !Array.isArray(argument2)) {
        argument2 = objectToArray (argument2);
    }
    
    if ( Array.isArray(argument1) && Array.isArray(argument2) ) {
        result = arrayComp (argument1, argument2); 
    } else if ( typeof argument1 === 'number' && 
                typeof argument2 === 'number' && 
                isNaN(argument1) && 
                isNaN(argument2) 
                ) {
                    result = true;
    } else {
                result = (argument1 === argument2);
            }
        
    return result;
}

describe('deepComp - функция глубокого сравнения переданных ей значений', function() {

    var H1={ a:5, b: { b1:6, b2:7 } };
    var H2={ b: { b1:6, b2:7 }, a:5 };
    var H3={ a:5, b: { b1:6 } };
    var H4={ a:5, b: { b1:66, b2:7 } };
    var H5={ a:5, b: { b1:6, b2:7, b3:8 } };
    var H6={ a:null, b:undefined, c:Number.NaN };
    var H7={ c:Number.NaN, b:undefined, a:null };
    var H8={a:5,b:6};
    var H9={c:5,d:6};
    var H10={a:5};
    var A1=[5,7];
    var A2=[5,5,7];
    var A3=[5,8,7];

    const testSet=[
        {argument1:H1, argument2:H2, roots:true},
        {argument1:H1, argument2:H3, roots:false},
        {argument1:H1, argument2:H4, roots:false},
        {argument1:H1, argument2:H5, roots:false},
        {argument1:H6, argument2:H7, roots:true},
        {argument1:H8, argument2:H9, roots:false},
        {argument1:H8, argument2:H10, roots:false},
        {argument1:null, argument2:H10, roots:false},
        {argument1:H10, argument2:null, roots:false},
        {argument1:null, argument2:null, roots:true},
        {argument1:null, argument2:undefined, roots:false},
        {argument1:5, argument2:"5", roots:false},
        {argument1:5, argument2:H1, roots:false},
        {argument1:A1, argument2:H1, roots:false},
        {argument1:A2, argument2:A3, roots:false},
        {argument1: {a:5,b:undefined}, argument2: {a:5,c:undefined}, roots:false},
        {argument1:[5,7], argument2:{0:5,1:7}, roots:false},
        {argument1: [5,7], argument2:{0:5,1:7,length:2}, roots:false},
        {argument1:"aaa", argument2:"bbb", roots:false},
        {argument1:Number.NaN, argument2:Number.NaN, roots:true},
    ];

    for ( let test of testSet ) {
      it(`тест пройден`, function(){
          assert.deepEqual(deepComp(test.argument1, test.argument2), test.roots);
      });
    }
    
});

mocha.run();