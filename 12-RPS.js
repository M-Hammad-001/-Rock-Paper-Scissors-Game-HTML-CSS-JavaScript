let score = JSON.parse(localStorage.getItem('score')) ||
      {
        wins : 0,
        lose : 0,
        tie : 0
      };

      document.querySelector('.js-rock-button').addEventListener('click',() => {
        playGame('rock');
      });

      document.querySelector('.js-paper-button').addEventListener('click',() => {
        playGame('paper');
      });

      document.querySelector('.js-scissor-button').addEventListener('click',() => {
        playGame('scissors');
      });

      document.body.addEventListener('keydown',(event) => 
        {
          if(event.key === 'r')
          {
            playGame('rock');
          }
          else if(event.key === 'p')
          {
            playGame('paper');
          }
          else if(event.key === 's')
          {
            playGame('scissors');
          }
        });
      scoreUpdate();

      function playGame(playerMove) {
        const computerMove = pickComputerMove();

        let result = '';

        if (playerMove === 'scissors') {
          if (computerMove === 'rock') {
            result = 'You lose.';
            score.lose ++;
          } else if (computerMove === 'paper') {
            result = 'You win.';
            score.win ++;
          } else if (computerMove === 'scissors') {
            result = 'Tie.';
            score.tie ++;
          }

        } else if (playerMove === 'paper') {
          if (computerMove === 'rock') {
            result = 'You win.';
            score.win ++;
          } else if (computerMove === 'paper') {
            result = 'Tie.';
            sore.tie ++;
          } else if (computerMove === 'scissors') {
            result = 'You lose.';
            score.lose ++;
          }
          
        } else if (playerMove === 'rock') {
          if (computerMove === 'rock') {
            result = 'Tie.';
            score.tie ++;
          } else if (computerMove === 'paper') {
            result = 'You lose.';
            score.lose ++;
          } else if (computerMove === 'scissors') {
            result = 'You win.';
            score.wins ++;
          } 
        }


        localStorage.setItem('score',JSON.stringify(score)); //save the object as string 

        
        document.querySelector('.result').innerHTML = result;

        document.querySelector('.moves').innerHTML = `You Picked <img class="symbols" src="Assets/Images/Rock Paper Scissors_files/${playerMove}-emoji.png"> Computer Picked <img class="symbols"  src="Assets/Images/Rock Paper Scissors_files/${computerMove}-emoji.png">`;
        scoreUpdate();

      }


      function scoreUpdate()
      {
        document.querySelector('.Game-Stats').innerHTML = `Wins:${score.wins}, Losses :${score.lose}, Ties:${score.tie}`;
      }

      function pickComputerMove() {
        const randomNumber = Math.random();

        let computerMove = '';

        if (randomNumber >= 0 && randomNumber < 1 / 3) {
          computerMove = 'rock';
        } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
          computerMove = 'paper';
        } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
          computerMove = 'scissors';
        }

        return computerMove;
      }

      let isautoplaying = false;
      let intervalid;

      function autoplay()
      {
        if(!isautoplaying)
        {
          intervalid = setInterval(() => {
           const playerMove = pickComputerMove();
            playGame(playerMove);
          },1000);
          isautoplaying = true;
        }
        else 
        {
          clearInterval(intervalid);  //to stop 
          isautoplaying = false;
        }
      }
