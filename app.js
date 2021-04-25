var context;
var shape = new Object();
var board;
var score;
var pac_color;
var start_time;
var time_elapsed;
var interval;
var direction = "right";
var type;
var numMonsters;
var numLives = 5;
var ToWin;
var maxTime;
var users = [{username:"k",password:"k"}];
var monstersSpot = [];
var Username;
var giftSpot = new Object();
var heartSpot = new Object();
var eaten = false;
var eatenHeart = false;
var intervalGift;
var intervalMonsters;
var displayUp;
var displayDown;
var displayLeft;
var displayRight;
var mySound;

let keyDown1;
let keyUp1;
let keyLeft;
let keyRight;

$(document).ready(function() {
	context = canvas.getContext("2d");
	$("#signUp").hide();
	$("#settings").hide();
	$("#game").hide();
	$("#login").hide();
	mySound = document.createElement('audio');
	mySound.src = "Music.mp3";
});

function welcome(){
	$("#signUp").hide();
	$("#settings").hide();
	$("#game").hide();
	$("#login").hide();
	$("#welcome").show();
	clearIntervals(); 
	document.body.style.backgroundImage = "url('images/packman.jpg')";
	document.body.style.backgroundSize = "cover";
}

function sighnUp(){
	document.body.style.background = 'black';
	$("#settings").hide();
	$("#welcome").hide();
	$("#signUp").show();
	$("#game").hide();
	$("#login").hide();
	clearIntervals();
}

function login(){
	clearIntervals();
	document.body.style.background = 'black';
	$("#settings").hide();
	$("#welcome").hide();
	$("#signUp").hide();
	$("#game").hide();
	$("#login").show();
}

function checkValuesLogin(){
	//validate correctness of entered stuff
	Username = $("#UsernameLogin").val();
	var password = $("#passwordLogin").val();
	var found = false;
	for (var i = 0; i < users.length; i++) {
		if((users[i]["username"] === Username) &&  (users[i]["password"] === password)){
			$("#settings").show();
			$("#welcome").hide();
			$("#signUp").hide();
			$("#game").hide();
			$("#login").hide();
			found = true;
			$("#login").children().each(function(i, elm) {
				$(elm).val("");
			});
		}
	}
	if (!found){
		$("#login").children().each(function(i, elm) {
			$(elm).val("");
		});
		alert("Wrong values");
	}
}

function play(){
	var valid = true;
	var numBalls = $("#numBalls").val(); // 50 90
	var numMonstersPlay = $("#numMonsters").val(); // 1 4
	var maxTime = $("#maxTime").val(); // at least 60 
	var keyUp = $("#keyUp").val(); 
	var keyLeft = $("#keyLeft").val(); 
	var keyDown1 = $("#keyDown1").val(); 
	var keyRight = $("#keyRight").val();
	let pickColor25 = $("#color25").val();
	let pickColor15 = $("#color15").val();
	let pickColor5 = $("#color5").val();

	if(!(numBalls >= 50  && numBalls <= 90)){
		valid = false;
		alert("Number of balls shuld be between 50 and 90");
	}

	if(!(numMonstersPlay >= 1  && numMonstersPlay <= 4)){
		valid = false;
		alert("Number of monsters shuld be between 1 and 4");
	}

	if(!(maxTime >= 60 )){
		valid = false;
		alert("The time shuld be higher then 60");
	}

	if(keyUp === keyLeft || keyUp === keyDown1 || keyUp === keyRight || keyLeft === keyDown1 || keyLeft === keyRight || keyRight === keyDown1){
		valid = false;
		alert("The arrows should be different");
	}

	if(pickColor15=== pickColor25 || pickColor15 === pickColor5 || pickColor5 === pickColor25){
		valid = false;
		alert("The colors should be different");
	}

	if(numBalls === "" || numMonstersPlay === "" || maxTime === "" || keyUp === "" || keyDown1 === "" || keyRight=== "" || keyLeft === ""){
		valid = false;
		alert("All fileds should be filled");
	}

	if (!valid){
		$("#numBalls").val(""); 
		$("#numMonsters").val(""); 
		$("#maxTime").val("");
		$("#keyUp").val(""); 
		$("#keyLeft").val(""); 
		$("#keyDown1").val(""); 
		$("#keyRight").val("");
		$("#color25").val("#000000");
		$("#color15").val("#000000");
		$("#color5").val("#000000");
	}

	if (valid){
		$("#settings").hide();
		$("#welcome").hide();
		$("#signUp").hide();
		$("#game").show();
		$("#login").hide();
		document.body.style.background = 'black';
		Start();
	}
}

function randomSettings(){
	$("#numBalls").val(Math.floor(Math.random() * 41) + 50); 
	$("#numMonsters").val(Math.floor(Math.random() * 4) + 1); 
	$("#maxTime").val(Math.floor(Math.random() * 200) + 60); // TODO: maybe another way
	$("#keyUp").val("Up"); 
	keyRight = 39;
	keyDown1 = 40;
	keyUp1 = 38;
	keyLeft =37;
	$("#keyLeft").val("Left"); 
	$("#keyDown1").val("Down"); 
	$("#keyRight").val("Right");
	$("#color25").val('#'+Math.floor(Math.random()*16777215).toString(16));
	$("#color15").val('#'+Math.floor(Math.random()*16777215).toString(16));
	$("#color5").val('#'+Math.floor(Math.random()*16777215).toString(16));
	displayUp = "ArrowUp";
	displayDown = "ArrowDown";
	displayLeft = "ArrowLeft";
	displayRight = "ArrowRight";
}

function checkValuesSignUp() {
	let valid = true;
	var UsernameS = $("#Username").val()
	var password = $("#password").val();  
	var email = $("#email").val();
	var fullName = $("#fullName").val();
    var number = 0 ;  
    var letter = 0 ;  
    var bigLetter = 0 ;  
      
    if (password.search(/[0-9]/) != -1) {   
        number =1;  
    }  
    if (password.search(/[A-Z]/) != -1) {  
        bigLetter = 1 ;  
    }  
    if (password.search(/[a-z]/) != -1) {  
        letter = 1 ;  
    }  
    if (!((letter || bigLetter) && number)) {  
		alert("your password shuold include letters and numbers");
		valid = false;
	} 
	if (!(/\S+@\S+\.\S+/.test(email))){
		alert("your email is not valid");
		valid = false;
	}
	if(fullName.search(/[0-9]/) != -1){
		alert("your name shuold include only letters");
		valid = false;
	}
	if(!valid){
		$("#myForm").children().each(function(i, elm) {
			$(elm).val("");
		});
		$("#start").val("2018-07-21");
	}
	if (valid === true){
		$("#settings").hide();
		$("#welcome").show();
		$("#signUp").hide();
		$("#game").hide();
		$("#login").hide();
		$("#myForm").children().each(function(i, elm) {
			$(elm).val("");
		});
		$("#start").val("2018-07-21");
		users.push({username:UsernameS,password:password});
	}
  };

function Start() {
	mySound.play();
	var food_remain = $("#numBalls").val();
	$("#chosenAmountBalls").html("There are " + food_remain + " balls");
	$("#totalTime").html("Game is " + $("#maxTime").val() + " seconds");
	$("#numOfMonsters").html("There are " + $("#numMonsters").val() + " monsters in the game");
	document.getElementById("5scoreColor").style.background = $("#color5").val();
	document.getElementById("15scoreColor").style.background = $("#color15").val();
	document.getElementById("25scoreColor").style.background = $("#color25").val();
	$("#chosenUpKey").html("upKey - " + displayUp);
	$("#chosenDownKey").html("downKey - " + displayDown);
	$("#chosenRightKey").html("rightKey - " + displayRight);
	$("#chosenLeftKey").html("leftKey - " + displayLeft);
	$(".life").empty();
	for(var i= 0 ; i < numLives ; i++){
		$(".life").append("<div class='heart'></div>");
	}
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 100;
	
	numMonsters = parseInt($("#numMonsters").val());
	maxTime = $("#maxTime").val();
	var amount5 = Math.floor(food_remain*0.6);
	var amount15 = Math.floor(food_remain*0.3);
	var amount25 =  food_remain - amount5 - amount15;
	type = [amount5,amount15,amount25]
	ToWin = food_remain;
	var pacman_remain = 1;
	start_time = new Date();
	for (var i = 0; i < 10; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if (
				(i == 3 && j == 3) ||
				(i == 3 && j == 4) ||
				(i == 3 && j == 5) ||
				(i == 6 && j == 1) ||
				(i == 6 && j == 2) ||
				(i == 4 && j == 7) ||
				(i == 6 && j == 7) ||
				(i == 5 && j == 7) 
			) {
				board[i][j] = 4; //4 == hotzetz
			} else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					var place = Math.floor(Math.random() * 3);
					while (type[place] == 0){
						place = Math.floor(Math.random() * 3);
					}
					if (place == 0){
						board[i][j] = 5;
						type[place]--;
					}
					else if(place == 1){
						board[i][j] = 15;
						type[place]--;
					}
					else{
						board[i][j] = 25;
						type[place]--;
					}
					food_remain--;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) {
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					if (board[i][j] === 5){
						score += 5;
						ToWin--;
					}
					if (board[i][j] === 15){
						score += 15;
						ToWin--;
					}
					if (board[i][j] === 25){
						score += 25;
						ToWin--;
					}
					board[i][j] = 2; // 2 == packman
				} else {
					board[i][j] = 0;  // 0 == empty
				}
				cnt--;
			}
		}
	}	
	if (ToWin >= 80 && food_remain > 0){
		for(let m =0 ; m< 10 ; m++){
			for(let n =0 ; n < 10 ; n++){
				if(food_remain > 0){
					if(board[n][m] === 0){
						var place = Math.floor(Math.random() * 3);
						while (type[place] === 0){
							place = Math.floor(Math.random() * 3);
						}
						if (place === 0){
							board[n][m] = 5;
							type[place]--;
						}
						else if(place === 1){
							board[n][m] = 15;
							type[place]--;
						}
						else{
							board[n][m] = 25;
							type[place]--;
						}
						food_remain--;
					}
				}
				else{
					break;
				}
			}
		}
	}
	else{
		while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		var place = Math.floor(Math.random() * 3);
		while (type[place] === 0){
			place = Math.floor(Math.random() * 3);
		}
		if (place === 0){
			board[emptyCell[0]][emptyCell[1]] = 5;
			type[place]--;
		}
		else if(place === 1){
			board[emptyCell[0]][emptyCell[1]] = 15;
			type[place]--;
		}
		else{
			board[emptyCell[0]][emptyCell[1]] = 25;
			type[place]--;
		}
		food_remain--;
		}
	}
	let k;
	for(k = 1; k < numMonsters + 1; k++){
		let monster = new Object();
		if (k === 1){
			monster.x = 0;
			monster.y = 0;
			monstersSpot.push(monster);
		}
		if(k === 2){
			monster.x = 0;
			monster.y = 9;
			monstersSpot.push(monster);
		}
		if(k === 3){
			monster.x = 9;
			monster.y = 0;
			monstersSpot.push(monster);
		}
		if(k === 4){
			monster.x = 9;
			monster.y = 9;
			monstersSpot.push(monster);
		}
	}
	giftSpot.x = 4;
	giftSpot.y = 4;

	heartSpot.x = Math.floor(Math.random() * 9);
	heartSpot.y = Math.floor(Math.random() * 9);
	while (board[heartSpot.x][heartSpot.y] == 4){
		heartSpot.x = Math.floor(Math.random() * 9);
		heartSpot.y = Math.floor(Math.random() * 9);
	}	

	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			if (e.srcElement.nodeName !== 'INPUT') {
				keysDown[e.keyCode] = true;
				e.preventDefault();
			}
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			if (e.srcElement.nodeName !== 'INPUT') {
				keysDown[e.keyCode] = false;
				e.preventDefault();
			}
		},
		false
	);
	interval = setInterval(UpdatePosition, 150);
	intervalMonsters = setInterval(moveMonsters, 450);
	if(!eaten){
		intervalGift = setInterval(moveGift, 450);
	}
}

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[keyUp1]) {
		direction = "up";
		return 1;
	}
	if (keysDown[keyDown1]) {
		direction = "down";
		return 2;
	}
	if (keysDown[keyLeft]) {
		direction = "left";
		return 3;
	}
	if (keysDown[keyRight]) {
		direction = "right";
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width;
	nameGame.value = Username;
	lblScore.value = score;
	lblTime.value = time_elapsed;
	drawMonsters();
	if (!eaten){
		drawGift();
	}
	if (!eatenHeart){
		drawHeart();
	}
	for (var i = 0; i < 10; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				if (direction==="right"){
					context.beginPath();
					context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				else if(direction === "up"){
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.65 * Math.PI, 1.3 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 15, center.y - 5, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				else if(direction === "down"){
					context.beginPath();
					context.arc(center.x, center.y, 30, -1.3 * Math.PI, -1.65 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 14, center.y - 5, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
				else{ // left
					context.beginPath();
					context.arc(center.x, center.y, 30, 1.15 * Math.PI, 2.87 * Math.PI); // half circle
					context.lineTo(center.x, center.y);
					context.fillStyle = pac_color; //color
					context.fill();
					context.beginPath();
					context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
					context.fillStyle = "black"; //color
					context.fill();
				}
			} else if (board[i][j] == 5) {
					context.beginPath();
					context.arc(center.x, center.y, 5, 0, 2 * Math.PI); // circle food
					context.fillStyle = $("#color5").val(); //color
					context.fill();
			}
				else if (board[i][j] == 15){
					context.beginPath();
					context.arc(center.x, center.y, 10, 0, 2 * Math.PI); // circle food
					context.fillStyle =  $("#color15").val(); //color
					context.fill();
				}
				else if (board[i][j] == 25){
					context.beginPath();
					context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle food
					context.fillStyle =  $("#color25").val(); //color
					context.fill();
				}
				
			else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j]= 0;
	var x = GetKeyPressed();
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) {
			shape.j--;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 5) {
		score+= 5;
		ToWin--;
	}
	if (board[shape.i][shape.j] == 15) {
		score+= 15;
		ToWin--;
	}
	if (board[shape.i][shape.j] == 25) {
		score+= 25;
		ToWin--;
	}
	board[shape.i][shape.j] = 2; //this line kills my monsters
	var currentTime = new Date();
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 60 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (shape.i == giftSpot.x && shape.j == giftSpot.y){
		if (!eaten){
			score += 50;
		}
		eaten = true;
		window.clearInterval(intervalGift);
	}
	
	if (shape.i == heartSpot.x && shape.j == heartSpot.y){
		if (!eatenHeart){
			numLives++;
			$(".life").empty();
			for(let l = 0 ; l < numLives ; l++){
				$(".life").append("<div class='heart'></div>");
			}
		}
		eatenHeart = true;
	}
	if(!eatenHeart){
		drawHeart();
	}
	if(ToWin === 0|| time_elapsed >= $("#maxTime").val()){  /// TODO: think how to win
		if (score < 100){
			window.alert("You are better than " + score + " points!" );
		}
		else{
			window.alert("Winner!!!");
		}
		clearIntervals();
		
	} else {
		Draw();
	}
	for(let k = 0 ; k< monstersSpot.length;k++){
		if (shape.i == monstersSpot[k].x && shape.j == monstersSpot[k].y){
			if (k === 0){
				numLives -= 2;
				score -= 20;
			}
			else{
				score -= 10;
				numLives--;
			}
			$(".life").empty();
			
			if (numLives <= 0){
				end();
			}
			else{
				for(let l = 0 ; l < numLives ; l++){
					$(".life").append("<div class='heart'></div>");
				}
				ResetMonsters();
			}
			
		}
	}
}

function ResetMonsters(){
	for(let k = 1; k <= monstersSpot.length; k++){
		if (k === 1){
			monstersSpot[k-1].x = 0;
			monstersSpot[k-1].y = 0;			
		}
		if(k === 2){
			monstersSpot[k-1].x = 0;
			monstersSpot[k-1].y = 9;
		}
		if(k === 3){
			monstersSpot[k-1].x = 9;
			monstersSpot[k-1].y = 0;
		}
		if(k === 4){
			monstersSpot[k-1].x = 9;
			monstersSpot[k-1].y = 9;
		}
	}
	drawMonsters();
}

function moveMonsters() {
	drawMonsters();
	for (let i = 0; i < monstersSpot.length; i++){
		let rotation = Math.atan2(shape.j - monstersSpot[i].y, shape.i - monstersSpot[i].x);
		let moveX = Math.round(Math.cos(rotation));
		let moveY = Math.round(Math.sin(rotation));
		let canMove = isLegal(monstersSpot[i].x+moveX,monstersSpot[i].y+moveY,i);
		let foundMove = false;
		if (moveX != 0 && moveY != 0){
			let canMoveX = isLegal(monstersSpot[i].x+moveX, monstersSpot[i].y, i);
			let canMoveY = isLegal(monstersSpot[i].x, monstersSpot[i].y+moveY, i);
			if (canMoveX){
				monstersSpot[i].x += moveX;
				foundMove = true;
			}
			else if (canMoveY){
				monstersSpot[i].y += moveY;
				foundMove = true;
			}
		}
		else if (canMove){
			monstersSpot[i].x += moveX;
			monstersSpot[i].y += moveY;
			foundMove = true;
		}
		if (!foundMove){
			
			let randNum = Math.floor(Math.random() * 4);
			let canMoveMonster = false;
			while (!canMoveMonster){
				if (randNum == 0){
					canMoveMonster = isLegal(monstersSpot[i].x + 1 , monstersSpot[i].y,i);
					if (canMoveMonster){
						monstersSpot[i].x++;
					}
				}
				if (randNum == 1){
					canMoveMonster = isLegal(monstersSpot[i].x - 1 , monstersSpot[i].y,i);
					if (canMoveMonster){
						monstersSpot[i].x--;
					}
				}
				if (randNum == 2){
					canMoveMonster = isLegal(monstersSpot[i].x , monstersSpot[i].y+1,i);
					if (canMoveMonster){
						monstersSpot[i].y++;
					}
				}
				if (randNum == 3){
					canMoveMonster = isLegal(monstersSpot[i].x , monstersSpot[i].y - 1,i);
					if (canMoveMonster){
						monstersSpot[i].y--;
					}
				}
				randNum = Math.floor(Math.random() * 4);
			}
		}
	}
}

function drawMonsters(){
	let cellHeight = (canvas.height / 10);
	let cellWidth = (canvas.width / 10);
	
	for(let i=0;i<monstersSpot.length;i++){
		let monster = new Image();
		monster.src="images/monster" + (i+1) +".gif";
		context.drawImage(monster,monstersSpot[i].x*cellHeight,monstersSpot[i].y*cellWidth,50,50);
	}
}

function drawGift(){
	let cellHeight = (canvas.height / 10);
	let cellWidth = (canvas.width / 10);
	let gift = new Image();
	gift.src = "images/gift.jpg";
	context.drawImage(gift,giftSpot.x*cellHeight,giftSpot.y*cellWidth,50,50);
}

function drawHeart(){
	let cellHeight = (canvas.height / 10);
	let cellWidth = (canvas.width / 10);
	let heart = new Image();
	heart.src = "images/h.png";
	context.drawImage(heart,heartSpot.x*cellHeight,heartSpot.y*cellWidth,50,50);
}

function moveGift(){
	drawGift();
	let randNum = Math.floor(Math.random() * 4);
	let canMoveGift = false;
	while (!canMoveGift){
		if (randNum == 0){
			canMoveGift = isLegal(giftSpot.x + 1 , giftSpot.y,8);
			if (canMoveGift){
				giftSpot.x++;
			}
		}
		if (randNum == 1){
			canMoveGift = isLegal(giftSpot.x - 1 , giftSpot.y,8);
			if (canMoveGift){
				giftSpot.x--;
			}
		}
		if (randNum == 2){
			canMoveGift = isLegal(giftSpot.x , giftSpot.y+1,8);
			if (canMoveGift){
				giftSpot.y++;
			}
		}
		if (randNum == 3){
			canMoveGift = isLegal(giftSpot.x , giftSpot.y - 1,8);
			if (canMoveGift){
				giftSpot.y--;
			}
		}
		randNum = Math.floor(Math.random() * 4);
	}
	
}

function isLegal(x,y,j) {
	if(x > 9 || y > 9 || x < 0 || y < 0){
		return false;
	}
	if (board[x][y] === 4){
		return false;
	} 
	for (let i = 0; i < monstersSpot.length; i++){ //To check that not another monster stands there
		if (i !== j && monstersSpot[i].x === x && monstersSpot[i].y === y){
			return false;
		}
	}
	return true;
}

function end(){
	alert("Loser!");
	clearIntervals();
}

function clearIntervals(){
	window.clearInterval(interval);
	window.clearInterval(intervalMonsters);
	window.clearInterval(intervalGift); /// ? 
	monstersSpot = [];
	mySound.pause();
	mySound.currentTime = 0;
}

function StartNewGame(){
	clearIntervals();
	//ResetMonsters();
	monstersSpot = [];
	numLives = 5;
	
	eaten = false;
	eatenHeart = false;
	$("#settings").show();
	$("#welcome").hide();
	$("#signUp").hide();
	$("#game").hide();
	$("#login").hide();
}

function setKeyUp(){
	$("#keyUp").keydown(function(event) {
		if (event.key.includes("Arrow")){
			$("#keyUp").val(event.key.substring(5));	
		}
		else{
			$("#keyUp").val(event.key);
		}	
		keyUp1 = event.keyCode;
		displayUp = event.key.substring(0);
	});
}

function setKeyLeft(){
	$("#keyLeft").keydown(function(event) {
		if (event.key.includes("Arrow")){
			$("#keyLeft").val(event.key.substring(5));	
		}
		else{
			$("#keyLeft").val(event.key);
		}
		keyLeft = event.keyCode;
		displayLeft = event.key;
	});
}

function setKeyDown1(){
	$("#keyDown1").keydown(function(event) {
		if (event.key.includes("Arrow")){
			$("#keyDown1").val(event.key.substring(5));	
		}
		else{
			$("#keyDown1").val(event.key);
		}
		keyDown1 = event.keyCode;
		displayDown = event.key;
	});
}

function setKeyRight(){
	$("#keyRight").keydown(function(event) {
		if (event.key.includes("Arrow")){
			$("#keyRight").val(event.key.substring(5));	
		}
		else{
			$("#keyRight").val(event.key);
		}
		keyRight = event.keyCode;
		displayRight = event.key;
	});
}