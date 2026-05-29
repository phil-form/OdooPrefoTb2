/*
    Linearithmic O(N log N)
*/

function nLogN(n)
{
    let i = n;
    let logArr = [];
    let nLognArr = [];
    let nArr = [];

    while(n > 1)
    {
        n = Math.floor(n /2);
        for(let j = 0; j < i; j++)
        {
            if(nArr.length < i)
            {
                nArr.push(j);
            }
            nLognArr.push(j);
        }                                                                                                                              
        logArr.push(n);
    }

    n = nArr.length;
    let logN = logArr.length;
    let nLogN = nLognArr.length;
    console.log(logArr, logArr.length);
    console.log(nArr, nArr.length);
    console.log(nLognArr, nLognArr.length);
    console.log(`n = ${n} | log n = ${logN} | n * log(n) = ${nLogN}`);
}

nLogN(8);