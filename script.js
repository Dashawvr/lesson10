// Closures

const userCard = (a)=>{
    let array = {
        key: a,
        balance: 100,
        transactionLimit: 100,
        historyLogs:[]
    }
    const get = ()=> {
        return array;
    }
    const put = (cash)=> {
        array.historyLogs.push({
            operationType:'putCredits',
            credits:cash,
            operationTime: new Date(Date.now())
        });
        return (array.balance += cash, array.historyLogs)
    }
    const take = (money)=> {
        array.historyLogs.push({
            operationType: 'takeCredits',
            credits: money,
            operationTime: new Date(Date.now())
        });
        if (money > array.balance){
            console.error('No money No honey...');
        }else {
            return (array.balance -= money, array.historyLogs)
        }
        // if(limit > money) {
        //     return money -= array.balance;
        // }else {
        //     console.error('No money no honey...');
        // }
    }
    const set = (limit)=>  {
        array.historyLogs.push({
            operationType:'setTransactionLimit',
            credits: limit,
            operationTime:new Date(Date.now())});
        return array.transactionLimit = limit;
    }
    const transfer = (credits,card)=> {
        if(credits <= array.balance && credits <= array.transactionLimit){
            array.historyLogs.push({
                operationType:'transferCredits',
                credits: credits,
                operationTime: new Date(Date.now())
            });
            card.getCardOptions().historyLogs.push({
                operationType:'transferCredits',
                credits:credits,
                operationTime:new Date(Date.now())
            })
            array.balance = array.balance - credits;
            card.getCardOptions().balance = card.getCardOptions().balance + (credits - credits * 0.5);
            return (card.getCardOptions().balance, array.balance, array.historyLogs, card.getCardOptions().historyLogs);
        }
    }
    return ({
        object: array,
        getCardOptions:() => (get()),
        putCredits:(cash)=>(put(cash)),
        takeCredits:(money)=>(take(money)),
        setTransactionLimit:(limit)=>(set(limit)),
        transferCredits:(credits,card)=>(transfer(credits,card))
    })
}
const card1 = userCard(2);
card1.putCredits(200)
card1.getCardOptions()
console.log(card1);