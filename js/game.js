var config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 1600,
    height: 1200,
    physics: {
        default: 'arcade'
    },
    scene: {
        key: 'main',
       
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var turretSpace = 2;
var path;
var turrets;
var enemies;
var roberts;
var turretButton = false;
var turret2Button = false;
var gold = 300;
var goldText;
var life = 100;
var lifeText;
var startgame = false;
var gameOver = false;

var ENEMY_SPEED = 1/20000;
var ROBERT_SPEED = 1/10000;







var map =  [[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];



function preload() {    
    //this.load.atlas('sprites', 'assets/spritesheet.png', 'assets/spritesheet.json');
    this.load.image('mapOne', 'assets/updatedMap.png');
    this.load.image('bullet', 'assets/bullet.png');
    this.load.image('arrow', 'assets/arrow.png');
    this.load.image('tower', 'assets/tower.png');
    this.load.image('tower2', 'assets/tower2.png');
    this.load.image('enemy', 'assets/enemy.png');
    this.load.image('robert', 'assets/robert1.png');
    this.load.image('towerOneButton', 'assets/towerOneButton.png');
    this.load.image('towerTwoButton', 'assets/towerTwoButton.png');
    this.load.image('uibar', 'assets/bottombar.jpg');
    this.load.image('startButton', 'assets/startbutton.jpg');
    this.load.image('gameOver', 'assets/gameover.jpg');
    

   

};


function create() {
    game.scene.pause("main");
    this.add.image(800,600, 'mapOne');
  // this graphics element is only for visualization,
  // its not related to our path
  var graphics = this.add.graphics();
  drawGrid(graphics);

  // the path for our enemies
  // parameters are the start x and y of our paths
  path = this.add.path(200, -25);
  path.lineTo(200, 300);
  path.lineTo(400, 300);
  path.lineTo(400, 600);
  path.lineTo(100, 600);
  path.lineTo(100, 1000);
  path.lineTo(600, 1000);
  path.lineTo(600, 200);
  path.lineTo(800, 200);
  path.lineTo(800, 1000);
  path.lineTo(1500, 1000);
  path.lineTo(1500, 700);
  path.lineTo(1000, 700);
  path.lineTo(1000, 300);
  path.lineTo(1400, 300);
  path.lineTo(1400, -25);
  
  this.add.image(400,1150, 'uibar');

  graphics.lineStyle(3, 0xffffff, 1);
  //visualize the path
  path.draw(graphics);

  //enemies
  enemies = this.physics.add.group({ classType: Enemy, runChildUpdate: true});
  this.nextEnemy = 0;
  roberts = this.physics.add.group({ classType: Robert, runChildUpdate: true});
  this.nextRobert = 0;

  //turrets
  turrets = this.add.group({ classType: Turret, runChildUpdate: true});
  arrowTurrets = this.add.group({ classType: ArrowTurret, runChildUpdate: true});

  const turretOneButton = this.add.image(40, 1150, 'towerOneButton');
  turretOneButton.setInteractive();
  turretOneButton.on('pointerdown', () => { turretButton = true; });
  this.input.on('pointerdown', placeTurret);

  const turretTwoButton = this.add.image(120, 1150, 'towerTwoButton');
  turretTwoButton.setInteractive();
  turretTwoButton.on('pointerdown', () => { turret2Button = true; });
  this.input.on('pointerdown', placeTurret2);
  
  
  bullets = this.physics.add.group({classType: Bullet, runChildUpdate: true});
  arrows = this.physics.add.group({classType: Arrow, runChildUpdate: true});
  

  this.physics.add.overlap(enemies, bullets, damageEnemyBullet);
  this.physics.add.overlap(enemies, arrows, damageEnemyArrow);
  this.physics.add.overlap(roberts, bullets, damageRobertBullet);
  this.physics.add.overlap(roberts, arrows, damageRobertArrow);


    
    goldText = this.add.text(950, 1130, 'Gold: ' + gold, { fontSize: '28px', fill: '#000' });
    lifeText = this.add.text(950 ,30, 'Life: ' + life, {fontSize: '28px', fill: '#FEFE54' });
    const startButton = this.add.image(600, 400, 'startButton');
    startButton.setInteractive();
    startButton.on('pointerdown', function() {
        startgame = true;
        startButton.destroy();
    })
 
    
}


//Damage creep functions

function damageEnemyBullet(enemy, bullet) {  
    // only if both enemy and bullet are alive
    if (enemy.active === true && bullet.active === true) {
        // we remove the bullet right away
        var BULLET_DAMAGE = 50;
        bullet.setActive(false);
        bullet.setVisible(false);    
        
        // decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveDamage(BULLET_DAMAGE);
    }
}

function damageEnemyArrow(enemy, arrow) {  
    // only if both enemy and bullet are alive
    if (enemy.active === true && arrow.active === true) {
        // we remove the bullet right away
        var ARROW_DAMAGE = 100;
        arrow.setActive(false);
        arrow.setVisible(false);    
        
        // decrease the enemy hp with BULLET_DAMAGE
        enemy.receiveDamage(ARROW_DAMAGE);
    }
}

function damageRobertBullet(robert, bullet) {  
    // only if both robert and bullet are alive
    if (robert.active === true && bullet.active === true) {
        // we remove the bullet right away
        var BULLET_DAMAGE = 50;
        bullet.setActive(false);
        bullet.setVisible(false);    
        
        // decrease the robert hp with BULLET_DAMAGE
        robert.receiveDamage(BULLET_DAMAGE);
    }
}



 function damageRobertArrow(robert, arrow) {  

    // only if both robert and bullet are alive
    if (robert.active === true && arrow.active === true) {
        // we remove the bullet right away
        var ARROW_DAMAGE = 100;
        arrow.setActive(false);
        arrow.setVisible(false);    
        
        // decrease the robert hp with BULLET_DAMAGE
        robert.receiveDamage(ARROW_DAMAGE);
    }
}


function drawGrid(graphics) {
    graphics.lineStyle(1, 0x000000, 0.45);
    for(var i = 0; i < 38; i++) {
        graphics.moveTo(0, i * 32);
        graphics.lineTo(1600, i * 32);
    }
    for(var j = 0; j < 50; j++) {
        graphics.moveTo(j * 32, 0);
        graphics.lineTo(j * 32, 1200);
    }
    graphics.strokePath();
}

function update(time, delta) { 
   
    if(gameOver) {
        const gameOverButton = this.add.image(600, 400, 'gameOver');
        gameOverButton.setInteractive();
        gameOverButton.on('pointerdown', function() {
            
            gameOverButton.destroy();
            location.reload();
        return;
        })
    }
    

    if (time > this.nextEnemy && enemies.children.entries.length < 5 && startgame ===true)
    {
        var enemy = enemies.get();
        
        if (enemy)
        {
            enemy.setActive(true);
            enemy.setVisible(true);

            // place the enemy at the start of the path
            enemy.startOnPath();

            this.nextEnemy = time + 500;

        }
    }       

    if (time > this.nextRobert && roberts.children.entries.length < 5 && startgame ===true)
    {
        var robert = roberts.get();
        
        if (robert)
        {
            robert.setActive(true);
            robert.setVisible(true);

            // place the robert at the start of the path
            robert.startOnPath();
 
            this.nextRobert = time + 1750;
        }
    }
    // } else if (enemies.children.entries.length === 5 && this.enemy.children.entries.active === false) {
    //     enemies.children.entries = [];
    // }
    

    

        }       
    }


    for (var i=0; i < enemies.children.entries.length; i++) {
        if (enemies.children.entries[i].active === false) {
            enemies.children.entries.splice(i, 1);
        }
    }

    for (var i=0; i < roberts.children.entries.length; i++) {
        if (roberts.children.entries[i].active === false) {
            roberts.children.entries.splice(i, 1);
        }
    }

    endGame();
}

function canPlaceTurret(i, j) {
    return map[i][j] === 0;
}



function addBullet(x, y, angle) {
    var bullet = bullets.get();
    if (bullet)
    {
        bullet.fire(x, y, angle);
    }
}

function addArrow(x, y, angle) {
    var arrow = arrows.get();
    if (arrow)
    {
        arrow.fire(x, y, angle);
    }
}


function endGame() {
    if (life <= 0 ) {
    gameOver = true;
    }
}

