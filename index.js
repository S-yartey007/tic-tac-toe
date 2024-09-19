const GameBoard = (function() {
 const GameBoard = {
    gameboad: [],
    playerScore: 0,
    computerScore: 0,
    Winner: "",
    cacheDom: function() {
        this.main = document.querySelector("main");
        this.form = this.main.querySelector("form");
        this.select = this.form.querySelector("select")
        this.gameDom = this.main.querySelector(".gameboard");
        this.cells = this.gameDom.querySelectorAll("div[data-cell]");
        this.dialog = this.main.querySelector(".dialog");
        this.choosePlayer = this.main.querySelector(".choose");
        this.cancel = this.main.querySelector(".cancelBtn");
        this.confirm = this.main.querySelector(".confirmBtn");
        this.newGame = this.main.querySelector(".new-Game");
        this.newRound = this.main.querySelector(".new-Round");
        this.declareWinner = this.main.querySelector(".declare-winner");
        this.declareLoser = this.main.querySelector(".declare-loser");
        
    },

    bindevents: function() {
        this.cells.forEach(cell => {
            cell.addEventListener("click",this.handleCell.bind(this));
        })
        this.choosePlayer.addEventListener("click",this.player.bind(this));
        this.confirm.addEventListener("click",this.handleConfirm.bind(this));
        this.cancel.addEventListener("click",this.handleCancel.bind(this));
        this.dialog.addEventListener("close",this.handleDialogClose.bind(this));
        this.newRound.addEventListener("click",this.handleNewRound.bind(this))
        this.newGame.addEventListener("click",this.handNewGame.bind(this))

    },

    handleCell: function(e) {
        let playerChoice = e.target.getAttribute("data-cell").split("");
        playerChoice = {row: playerChoice[0],col:playerChoice[1]};
        this.evaluate(playerChoice,this.computerChoice());
    },

    player: function(e) {
        this.dialog.showModal();
    },

    handleDialogClose: function(e) {
        e.preventDefault();
    },

    handleCancel: function(e) {
       this.dialog.close();
    },

    handleConfirm: function(e) {
        this.playerSign = this.select.value;
        this.createPlayer();
        console.log(this.playerSign);
        this.dialog.close();
    },
    handleNewRound: function() {
        this.gameboad = [[" "," "," "],[" "," "," "],[" "," "," "]]
        this.render();
       
    },
    handNewGame: function() {
        this.declareWinner.setAttribute("style","display:none");
        this.declareLoser.setAttribute("style","display:none");
        GameBoard.init();
    },

    render: function() {
       let board = [];
       this.gameboad.forEach(row => {
        row.forEach(cell => {
            board.push(cell);
        })
       })
       console.log(board);
       for(let i = 0; i < this.cells.length;i++) {
        this.cells[i].textContent = board[i];
       }
       
    },

    gameStatus: function() {
        let counter = 0;
        let regExp = /^[OX]$/
        this.gameboad.forEach(row => {
            row.forEach(elem => {
                if(regExp.test(elem)) counter++;
            })
        })
        return counter;
    },

    createPlayer: function() {
      this.computerSign = this.playerSign === "X" ? "O" : "X";
    },
   
    round: function() {
      
      const regExp = /^$/;
      /* while(this.gameboad[0].some(elem => regExp.test(elem)) || this.gameboad[1].some(elem => regExp.test(elem) || this.gameboad[2].some(elem => regExp.test(elem)))) {
        if(this.Winner === "player" || this.Winner === "computer") {
            break;
        }

        let [row,col] = prompt("Enter position: row and col").split("");
            row = Number(row);
            col = Number(col);
            this.evaluate({row,col},this.computerChoice());
      }
      */



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
     for(let i = 0; i < this.gameboad.length;i++) {
       r_diagonal[i] = this.gameboad[i][i] 
     }
     if (this.gameboad[0][2] === this.gameboad[1][1] && this.gameboad[1][1] === this.gameboad[2][0] && this.gameboad[0][2] !== '') {
         if(this.gameboad[2][0] === this.playerSign) playStatus.diagonal = true;
         else if(this.gameboad[2][0] === this.computerSign) computerSign.diagonal = true;

      }

     if(r_diagonal.every(elem => elem === this.playerSign)) playStatus.diagonal = true;
     else if(r_diagonal.every(elem => elem === this.computerSign)) computerStatus.diagonal = true;

     if(playStatus.row || playStatus.col || playStatus.diagonal) {
        this.playerScore++;
        console.log("You won");
        console.log(this.playerScore);
     } else if(computerStatus.row || computerStatus.col || computerStatus.diagonal) {
        this.computerScore++;
        console.log("You lose");
        console.log(this.computerScore);
     } 
     if(this.playerScore >= 5 || this.computerScore >= 5) {
        this.Winner = this.playerScore > this.computerScore ? "Player" : "Computer";
        if(this.Winner === "Player") {
            this.declareWinner.setAttribute("style","display:block");
            console.log("WINNER")
        } else {
            this.declareLoser.setAttribute("style","display:block");
        }
     }

    },


    evaluate: function(playerChoice,computerChoice) {
        let p_row = Number(playerChoice.row);
        let p_col = Number(playerChoice.col);
        let c_row = Number(computerChoice.row);
        let c_col = Number(computerChoice.col);
        const regExp = /^[XO]$/
        
        console.log(p_row,p_col,c_row,c_col);
        
         if(p_row === c_row && c_col === p_col){
            this.render();
            
        } else if(p_row > 2 || c_row > 2 ||  c_col > 2 || p_col > 2) {
            this.render();

        } else if(regExp.test(this.gameboad[c_row][c_col]))  {
            this.render();
           return;

        } else {
            this.gameboad[p_row][p_col] = this.playerSign;
            this.gameboad[c_row][c_col] = this.computerSign;
            this.render();
        }
        if(this.gameStatus() >= 9) {
            console.log("Draw");
            return;
         }
         this.checkWinner(); 
    },

    init: function() {
        this.cacheDom();
        this.bindevents();
        this.gameboad = [[" "," "," "],[" "," "," "],[" "," "," "]];
        this.render();
        this.playerScore = 0,
        this.computerScore = 0,
        this.Winner = "";
        

    }

 }
 GameBoard.init();
 return GameBoard;
})()
