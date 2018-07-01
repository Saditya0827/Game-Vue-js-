new Vue({
    el: '#app',
    data: {
        playerHealth : 100,
        monsterHealth : 100,
        isGameRunning: false,
        turns: []
    },
    methods: {
        startGame : function (){
            this.isGameRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack : function(){
            var damage = this.calculateDamage(10, 3);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer : true,
                text : "Player hits Monster for : " + damage
            });
            if(this.checkWin()){
                return;
            }
            this.monsterAttack();
        },
        specialAttack: function(){
            var damage = this.calculateDamage(20, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer : true,
                text : "Player hits hard Monster for : " + damage
            });
            if(this.checkWin()){
                return;
            }

            this.monsterAttack();
        },
        heal: function(){
            if(this.playerHealth <= 90){
                this.playerHealth += 10;
            }
            else{
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer : true,
                text : "Player heals for 10"
            });
            this.monsterAttack();
        },
        giveUp: function(){
            this.isGameRunning = false;
        },
        monsterAttack: function (){
            var damage = this.calculateDamage(12, 6);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer : false,
                text : "Monster hits Player for : " + damage
            });
            this.checkWin();
        },
        calculateDamage : function ( max, min){
            return Math.max(Math.floor(Math.random() * max ) + 1, min);
        },
        checkWin: function () {
            if(this.monsterHealth<1){
                if(confirm('You Won! New Game?')){
                    this.startGame();
                }
                else{
                    this.isGameRunning = false;
                }
                    return true;
            }
            else if(this.playerHealth<1){
                if(confirm('You lost! New Game ?')){
                    this.startGame();
                }
                else{
                    this.isGameRunning = false;
                }
                return true;
            }
            return false;
        }
    }
});