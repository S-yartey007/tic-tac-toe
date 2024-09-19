const GameBoard = (function() {
 const GameBoard = {
    gameboad: [],
    Winner: "",
    gameStatus: function() {
        let counter = 0;
        let regExp = /^[OX]$/
        this.gameboad.forEach(row => {
            row.forEach(elem => {
                if(regExp.test(elem)) counter++;
            })
        })
        return counter;
    }
     ,

    createPlayer: function() {
      this.playerSign = prompt("Enter your symbol:").toUpperCase();
      this.computerSign = this.playerSign === "X" ? "O" : "X";
    },

    round: function() {
      
      const regExp = /^$/;
      while(this.gameboad[0].some(elem => regExp.test(elem)) || this.gameboad[1].some(elem => regExp.test(elem) || this.gameboad[2].some(elem => regExp.test(elem)))) {
        if(this.Winner === "player" || this.Winner === "computer") {
            break;
        }

        let [row,col] = prompt("Enter position: row and col").split("");
            row = Number(row);
            col = Number(col);
            this.evaluate({row,col},this.computerChoice());
      }


    },

    computerChoice: function () {
        let {row,col} =  {row: Math.floor(Math.random() * 3),
                          col: Math.floor(Math.random() * 3)
                            };
        return {row,col} 
      }
    ,
    
    print: function() {
        this.gameboad.forEach(row => {
            console.log(row)
        
        });
    },

    checkWinner: function() {
     if(this.gameStatus() >= 9) {
        console.log("Draw");
        return;
     }

     let playStatus = {
        row: false,
        col: false,
        diagonal: false
     }
     let computerStatus = {
        row: false,
        col: false,
        diagonal: false
     }
     this.gameboad.forEach(row => {
        if(row.every(elem => elem === this.playerSign)) {
            playStatus.row = true;
        } else if(row.every(elem => elem === this.computerSign)) {
            computerStatus.row = true;
        }
     })
     let tranposed = [];
     for(let i = 0 ; i < this.gameboad[0].length;i++) {
        tranposed[i] = [];
        for(let j = 0; j < this.gameboad.length;j++) {
            tranposed[i][j] = this.gameboad[j][i];
        }
     }
     tranposed.forEach(row => {
        if(row.every(elem => elem === this.playerSign)) {
            playStatus.col = true;
        } else if(row.every(elem => elem === this.computerSign)) {
            computerStatus.col = true;
        }
     })
     let r_diagonal = []
     let l_diagonal = []
     for(let i = 0; i < this.gameboad.length;i++) {
       r_diagonal[i] = this.gameboad[i][i] 
     }
   /*   for(let i = this.gameboad -1; i > 0; i--) {
        l_diagonal[i] = this.gameboad[i][i];
     } */
     if(r_diagonal.every(elem => elem === this.playerSign)) playStatus.diagonal = true;
     else if(r_diagonal.every(elem => elem === this.computerSign)) computerStatus.diagonal = true;

     if(playStatus.row || playStatus.col || playStatus.diagonal) {
        this.Winner = "player"
        console.log("You won");
     } else if(computerStatus.row || computerStatus.col || computerStatus.diagonal) {
        this.Winner = "computer"
        console.log("You lose")
     } 
     

    },


    evaluate: function(playerChoice,computerChoice) {
        let p_row = playerChoice.row;
        let p_col = playerChoice.col;
        let c_row = computerChoice.row;
        let c_col = computerChoice.col;
        const regExp = /^[XO]$/
        
        console.log([p_row,p_col],[c_col,c_row])
        
        if(p_row === c_row && c_col === p_col){
            this.print();
            
        } else if(p_row > 2 || c_row > 2 ||  c_col > 2 || p_col > 2) {
            this.print();

        } else if(regExp.test(this.gameboad[p_row][p_col]) || regExp.test(this.gameboad[p_row][p_col])  ) {
            this.gameboad[p_row][p_col] = this.playerSign;
            this.gameboad[c_row][c_col] = this.computerSign;
            this.print();

        } else {
            this.gameboad[c_row][c_col] = this.computerSign;
            this.gameboad[p_row][p_col] = this.playerSign;
            this.print();
        }
        if(this.gameStatus() >= 9) {
            console.log("Draw");
            return;
         }
         this.checkWinner();
    },

    init: function() {
        this.gameboad = [["","",""],["","",""],["","",""]]
        this.createPlayer();
        this.print();
        this.round();

    }

 }
 GameBoard.init();
 return GameBoard;
})()

console.log(GameBoard)