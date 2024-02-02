function deepComp (argument1, argument2) {
    let result;

    if (typeof argument1 !== typeof argument2) {
        result = false;
    } else if (typeof argument1 === 'number' &&  
               isNaN(argument1) && 
               isNaN(argument2)) {
        result = true;
    } else if (argument1 === null || argument2 === null) {
        result = (argument1 === argument2);
    } else if (Array.isArray(argument1) && Array.isArray(argument2)) {
        result = true;
        if (argument1.length !== argument2.length) {
            result =false;
        }
        for (let i=0; i<argument1.length; i++) {
            if (typeof argument1[i] === "object" && typeof argument2[i] === "object" ||
                typeof argument1[i] === "number" && typeof argument2[i] === "number") {
                if ( !deepComp (argument1[i], argument2[i]) ) {
                    result =false;
                    break;
                } else {
                    continue;
                }
            }
            if (argument1[i] !== argument2[i]) {
                result =false;
                break;
            }
        }
    } else if ( typeof argument1 === "object" && 
                !Array.isArray(argument1) && !Array.isArray(argument2) ) {
        if (Object.keys(argument1).length !== Object.keys(argument2).length) {
            result = false;
        } else {
            result = true;
            for (let key1 in argument1) {
                if (typeof argument1[key1] === "object" && typeof argument2[key1] === "object" ||
                    typeof argument1[key1] === "number" && typeof argument2[key1] === "number") {
                    if ( !deepComp (argument1[key1], argument2[key1]) ){
                        result = false;
                        break;
                    } else {
                        continue;
                    }
                }
                if ( !(key1 in argument2) || argument1[key1] !== argument2[key1]) {
                    result = false;
                    break;
                }
            }
        }
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