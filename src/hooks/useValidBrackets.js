const loop = (array, open, close,countValid) => {
    for(let i = 0; i < array.length; i++){
        if(array[i] == open){
            for(let j = i; j < array.length; j++){
                if(array[j] == close){
                    countValid += 2
                    break;
                }
            }
        }
    }
    return countValid
}

export function useValidBrackets(str){
    let arr = str.split('').filter(e => e == '{' || e == '}' || e == '(' || e == ')' || e == '[' || e == ']')
    let countValid = 0;
    let countNoValid;

    let openBrackets = ['(','{','[']
    let closeBrackets = [')', '}', ']']

    openBrackets.map((e, i) => countValid = loop(arr, e, closeBrackets[i], countValid))

    countNoValid = arr.length - countValid;

    return { countValid: countValid,countNoValid : countNoValid }

}