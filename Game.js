window.onload=init;

var can;//캔버스를 가져옴.
var WIDTH;//캔버스 가로
var HEIGHT;//캔버스 세로
var x=10;
var y=130;
var under=y;//y범위의 끝.
var myWidth=20;
var myHeight=20;
var isJump=false;//스페이스바가 눌렸는지를 확인.
var jumpValue=3;
var blockx=300;//장애물의 x좌표
var blockValue=3;
var collide = false;//충돌시 true.
var blocks=Array();//빈 괄호면 무한대로 넣을 수 있는 배열임.
var click = false;//keypress가 된 상태인지를 확인. 이게 있어야 계속 올라가든가 내려가는 동작 구분.
var score=0;//현재 점수

var characterInterval;//계속 위치를 바꾸면서 네모를 그림.
var blockInterval;

function isCollide()
{//장애물과 충돌 여부 체크 함수.
	for(i=0;i<blocks.length;i++)
	{
		if(blocks[i].y === 110)
		{
			if(blocks[i].x-x<myWidth&&blocks[i].x-x>myWidth*(-1))
			{
				if(blocks[i].y-y<myHeight)
				{
					collide=true;
				}
			}
		}
		else
		{
			if(blocks[i].x-x<myWidth&&blocks[i].x-x>myWidth*(-1))
			{
				if(y-blocks[i].y<myHeight)
				{
					collide=true;
				}
			}
		}
	}
}

function init()
{
	var canvas = document.getElementById("canvas");
	can = canvas.getContext('2d');
	WIDTH=parseInt(canvas.style.width); //px말고 숫자만 가져옴.
	HEIGHT=parseInt(canvas.style.height);
	keyInput();//키보드 입력을 받기 시작함.
	//drawCharacter();
	document.getElementById("replay").style.display="none";//none이니까 이 replay가 안 보임.
	characterInterval=setInterval(drawCharacter,10);
	blockInterval=setInterval(drawBlock,10);//장애물 만들어진 속도 조절.
	makeBlockInterval=setInterval(makeBlock,300);
}

function drawCharacter()
{
	can.clearRect(0,0,WIDTH,HEIGHT);//canvas 지우기.
	can.beginPath();//그리기 시작.
	can.fillStyle="green";
	// if(isJump){
	// 	//스페이스바를 눌렀음.
	// 	y-=jumpValue;
	// 	if(y<=40){
	// 		jumpValue*=-1;
	// 	}
	// 	if(y>=under){//밑바닥에 닿았음.
	// 		isJump=false;
	// 		jumpValue*=-1;

	// 	}
	// }

	//keypress에 해당하는 부분.
	if(click)
	{//키가 눌린 상태
		if(isJump)
		{//꾹 눌렀으니까 점점 올라감.
			y-=jumpValue;
			if(y<=0)
			{
				isJump=false;//위에 부딪힌 경우, 키보드에서 손을 뗀 것과 같음.
			}
		}
		else
		{//꾹 누르지 않았으니 점점 내려감.
			y+=jumpValue;
			if(y>=under)
			{
				click=false;
			}
		}
	}
	can.fillRect(x,y,myWidth,myHeight);//안이 채워진 사각형.
	can.closePath();//그리기 끝.
}

function keyInput(){
	//키보드 입력 받는 함수.
	// document.addEventListener("keydown",function(event){
	// 	//keydown시 호출될 함수.
	// 	if(event.keyCode==32){
	// 		//스페이스바를 눌렀을 때.
	// 		//점프한다.
	// 		isJump=true;//스페이스바가 눌렸음.
	// 	}
	// });
	document.addEventListener('keypress',function(event){
		//키보드를 꾹 누르고 있을 때.
		if(event.keyCode==32){
			isJump=true;
			click=true;
			//click=true이면 keypress가 일어난 상태.
		}
	}
	)
document.addEventListener('keyup',function(event){
		//키보드에서 손을 땠을 때.
		if(event.keyCode==32){
			isJump=false;
		}
	}
	)
}


function drawBlock(){
	for(i=0;i<blocks.length;i++){
		//배열.length는 배열의 크기임.
	can.beginPath();
can.fillRect(blocks[i].x,blocks[i].y,blocks[i].width,blocks[i].height);
can.closePath();
blocks[i].x-=blockValue;
if(blocks[i].x<=0){
		//장애물이 왼쪽 벽에 부딪힘.
		// clearInterval(characterInterval);
		// clearInterval(blockInterval);
		blocks.splice(0,1);//배열의 지울 위치의 인덱스와, 지울 개수를 넣음.
		score++;//한 블럭을 통과 = 1점.
		document.getElementById("score").innerHTML=score;//div와 div사이의 HTML요소인 SCORE를 갖고 옴. 
	}
	}
	isCollide();
	if(collide){
		clearInterval(characterInterval);
		clearInterval(blockInterval);
		clearInterval(makeBlockInterval);
		collide=false;
document.getElementById("replay").style.display="block";//replay 버튼이 보임.
document.getElementById("replay").onclick=Replay;//replay 버튼을 누를 수 있게 함.
	}
}

function makeBlock(){
	var block1={
		x:300,
		y:110,
		width:15,
		height:40
	};

	var block2 = {
		x:300,
		y:40,
		width:15,
		height:40
	}

	var arr = [block1, block2];
	var idx = Math.floor(arr.length*Math.random());
	blocks.push(arr[idx]);
}

function Replay(){
	//초기화를 해줘야 함. init만 호출하면 호출 전에 썼던 변수들의 값들을 바꾸지 못하기 때문에 새로고침이 아님.
//캔버스를 가져옴.
//캔버스 가로
//캔버스 세로
 score=0;
x=10;
y=130;
under=y;//y범위의 끝.
 myWidth=20;
 myHeight=20;
 isJump=false;//스페이스바가 눌렸는지를 확인.
 jumpValue=3;
 blockx=300;//장애물의 x좌표
 blockValue=3;
 collide = false;//충돌시 true.
 blocks=Array();//빈 괄호면 무한대로 넣을 수 있는 배열임.
 click = false;//keypress가 된 상태인지를 확인. 이게 있어야 계속 올라가든가 내려가는 동작 구분.
init();
}