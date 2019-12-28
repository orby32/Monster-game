new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        isRunningGame: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.isRunningGame = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },

        attack: function() {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits monster for ' + damage
            })
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack();
        },

        specialAttack: function() {
            var damage = this.calculateDamage(10, 20);
            this.turns.unshift({
                isPlayer: false,
                text: 'Player hits monster hard for ' + damage
            })

            this.monsterHealth -= damage;
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack();
        },
        heal: function() {
            
            if(this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.monsterAttack();

            this.turns.unshift({
                isPlayer: false,
                text: 'Player heals for 10'
            })
        },
        giveUp: function() {
            this.isRunningGame =  false;
            this.startGame();
        },

        monsterAttack: function() {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWin();

            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits player for ' + damage
            })
        },
        
        calculateDamage: function(min, max) {
            return Math.floor(Math.random() * max) + min;
        },

        checkWin: function() {
            if(this.monsterHealth <= 0) {
                if(confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.isRunningGame = false;
                }
                    return true;
                } else if (this.playerHealth <= 0) {
                    if (confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.isRunningGame = false;
                }
                return true;
            }
           return false;
        }
    }
});