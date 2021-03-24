function range(start, end, step) {
    let arr = [];

    const rangeSingleStep = function(start, end){
        end = end >= 0 ? --end : ++end;
        let index = end - start > 0 ? 1 : -1;
        let arr = [...new Array(Math.abs(end - start + index)).keys()];
        return index > 0 
            ? arr.map( i => i + start )
            : arr.map( i => start - i );
    }

    switch (arguments.length) {
        case 0:
            return undefined;
            break;
    
        case 1:
            arr = [...new Array(Math.abs(start)).keys()];
            return start >=0 
                ? arr
                : arr.map(i=>-i);
            break;

        case 2:
            return rangeSingleStep(start, end);
            break;
    
        case 3:
            if (step === 0) {
                return rangeSingleStep(start, end).map(i=>start);
            }
            arr = rangeSingleStep(start, end);
            return arr.filter( i => {
                return ( i - start ) % step === 0
            })
            break;
    }
}