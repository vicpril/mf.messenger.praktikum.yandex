function rangeSort(start, end, step, isRight) {
    
    return !isRight
        ? justRange(start, end, step).sort(orderSort)
        : justRange(start, end, step).sort(orderSort).reverse();

    function orderSort(a,b) {
        return Math.abs(a - b) > 0;
    }

    function rangeSingleStep(start, end){
        end = end >= 0 ? --end : ++end;
        let index = end - start > 0 ? 1 : -1;
        let arr = [...new Array(Math.abs(end - start + index)).keys()];
        return index > 0 
            ? arr.map( i => i + start )
            : arr.map( i => start - i );
    }

    function justRange(...args) {
        const [start, end, step] = args;

        let arr = [];

        switch (args.filter( arg => typeof arg !== 'undefined' ).length) {
            case 0:
                return undefined;
                break;
        
            case 1:
                arr = [...new Array(Math.abs(start)).keys()];
                return start >=0 
                    ? arr
                    : arr.map(i => i === 0 ? 0 : -i);
                break;

            case 2:
                return rangeSingleStep(start, end);
                break;
        
            case 3:
            default:
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
}

function rangeRight(start, end, step) {
    return rangeSort(start, end, step, true);
}