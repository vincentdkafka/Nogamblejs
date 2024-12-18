
const prompt = require("prompt-sync")();


const ROWS = 3;
const COLS = 3;


const SYMBOLS_COUNT = {
    A : 2,
    B : 4,
    C : 6,
    D : 8,
}

const SYMBOL_VALUE={
    A : 5,
    B : 4,
    C : 3,
    D : 2,
}





const deposit = () => {
    while (true){

        const depositAmount = prompt("Enter the Deposit amount: ");
     const  numberDepositAmount = parseFloat(depositAmount);

     if(isNaN(numberDepositAmount )||numberDepositAmount<=0){
        console.log("invalid deposit amount, try again ")
     }else{
        return numberDepositAmount;
     }
  
    } 
    
};

const getNumberOfLines = () => {
    while(true){
        const lines = prompt("Enter the numbers of lines to bet on (1-3): ");
        const numberOfLines = parseFloat(lines);


        if(isNaN(numberOfLines) || numberOfLines<=0 || numberOfLines >3){
            console.log("Invalid number of Lines, Try again");
            }else{
                return numberOfLines;
            }
    }
    

};


const getBet = (balance, lines) => {
    while(true){
        const bet = prompt("Enter the bet per lines: ");
        const numberBet = parseFloat(bet);


        if(isNaN(numberBet) || numberBet<=0 || numberBet > (balance/ lines) ){
            console.log("Invalid Bet, Try again");
            }else{
                return numberBet;
            }  
    }
};


const spin = () => {
    const symbols = [];
    for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0 ; i<count ; i++){
            symbols.push(symbol);
        }
    }
    
    const reels = [[]];
    for(let i = 0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random()* reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];

            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);


        }
        
        
        
    }

    return reels;


};

const tranpose = (reels) =>{
    const rows = [];
    
    for (let i = 0; i < ROWS; i++) {
        rows.push([]);
        for (let j = 0; j < COLS ; j++) {
            rows[i].push(reels[j][i]);
            
        }

        
    }
    return rows;

};


const printRows = (rows) => {
    for(const row of rows){
        let rowString = "";
        for(const [i, symbol] of row.entries()){
            rowString+= symbol
            if(i!= rows.length-1){
                rowString += " | "
            }
        }
        console.log(rowString)

    }
};


const getWinnings =  (rows, bet, numberOfLines)=>{
    let winnings = 0;

    for (let row = 0; row < numberOfLines; row++) {
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol !=symbols[0]){
                allSame = false;
                break;       
             }
        }

        if(allSame){
            winnings+= bet * SYMBOL_VALUE[symbols[0]]
        }
        
    }

    return winnings

};

const game= ()=>{
let balance = deposit();


while(true){

    console.log("you have a balance of $" + balance);

    const numberOfLines = getNumberOfLines();
    const bet = getBet(balance, numberOfLines);
    balance -=bet*numberOfLines;
    const reels = spin();
    const rows = tranpose(reels);
    printRows(rows);
    const winnings = getWinnings(rows, bet ,numberOfLines);
    balance+=winnings;
    console.log("You Won, $" + winnings.toString());

    if(balance <=0){
        console.log("you ran outta money");
        break;
    }


    const playAgain = prompt("Do you wanna play again (yes/no) ??");
        if (playAgain != "yes") break;
        

}

};


game();




