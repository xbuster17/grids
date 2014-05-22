var cv1 = document.getElementById('canvasFront');
var cv = document.getElementById('canvasBack');
var ctx1 = cv1.getContext('2d');
var ctx = cv.getContext('2d');
rV = parseInt(Math.random(0)*256);
gV = parseInt(Math.random(0)*256);
bV = parseInt(Math.random(0)*256);
cv1.height = cv1.h = window.innerHeight; 
cv1.width  = cv1.w = window.innerWidth;
cv.height = cv.y = window.innerHeight;
cv.width  = cv.x = window.innerWidth;
cv.s = cv.x + cv.y;
var pixelMultiplier = 20;
//grid xA yA
xA = new Array ( Math.floor(cv.x/pixelMultiplier) );
yA = new Array ( Math.floor(cv.y/pixelMultiplier) );
	for ( var i=0; i<cv.x/pixelMultiplier; i++ ) {
		for( var b=0; b<cv.y/pixelMultiplier; b++ ) {
			yA[b] = b* pixelMultiplier;
		};
		xA[i] = i* pixelMultiplier;
	};
tId = "timerId";
// create pixel
var pixel = new Pixel();
//fit on resize
function fitToEdges(){
	cv1.height = cv1.h = window.innerHeight;
	cv1.width  = cv1.w = window.innerWidth;
	cv.height = cv.y = window.innerHeight;
	cv.width  = cv.x = window.innerWidth;
	drawBackground();
	drawgrid(pixelMultiplier);
	xA=undefined; yA=undefined; // remake grid
	xA = new Array ( Math.floor(cv.x/pixelMultiplier) );
	yA = new Array ( Math.floor(cv.y/pixelMultiplier) );
	for (var i=0; i<cv.x/pixelMultiplier; i++){
		for (var b=0; b<cv.y/pixelMultiplier; b++){
			yA[b]=b*pixelMultiplier;
		};
		xA[i]=i*pixelMultiplier;
	};
	pixel.x=xA;
	pixel.y=yA;
	showHelp();
};

function showHelp(){
	if ( keyH%2 ) {
		ctx1.font="20px Andale Mono";
		ctx1.fillStyle="orange";
		ctx1.fillText("Hello World!"+" help!.",1,50,cv.x/2);
		ctx1.fillText("-H key toggle help menu.",1,70,cv.x/2);
		ctx1.fillText("-WASD & arrows move pixel.",1,90,cv.x/2);
		ctx1.fillText("-tab key toggles auto ball.",1,110,cv.x/2);
		ctx1.fillText("-1 & 2 inc & dec grid res.",1,130,cv.x/2);
		ctx1.fillText("-spacebar and mouseclick is pixel balls.",1,150,cv.x/2);
		ctx1.fillText("-mouswheel works on some browsers, it's just a circle.",1,170,cv.x/2);
	} else {ctx1.clearRect(0,0,cv.x/2,cv.y)}
};
/*input events                      iiiii   nNnN   N
  			                                nN nN  N 
                                    iiiii   nN  nN N
  			                        iiiii   nN   nNN */
document.addEventListener('mousemove' , captureMouse);
document.addEventListener('mousedown' , clickOn);
document.addEventListener('mousewheel', radius);

function captureMouse(e){
	moX = e.clientX;
	moY = e.clientY;
	drawMousePox();
};
//KEYS!
document.addEventListener('keydown',checkKeyDown,false);
document.addEventListener( 'keyup' ,checkKeyUp  ,false);
tab=0;
keyH=0;
function checkKeyDown(e){
	var keyID = e.keyCode || e.which;//short x-browser
	if (keyID === 38 || keyID === 87){//up arrow or 'w'
		pixel.keyUp=	true;
		e.preventDefault();
	};
	if (keyID === 39 || keyID === 68){//right arrow or 'd'
		pixel.keyRight=	true;
		e.preventDefault();
	};
	if (keyID === 40 || keyID === 83){//down arrow or 's'
		pixel.keyDown=	true;
		e.preventDefault();
	};
	if (keyID === 37 || keyID === 65){//left arrow or 'a'
		pixel.keyLeft=	true;
		e.preventDefault();
	};
	if (keyID === 32){
		pixel.keySpace=	true;
	};
	if ( keyID === 9 ) {e.preventDefault(); tab++;
	};
	if ( keyID === 49 ) {e.preventDefault(); pixelMultiplier++; fitToEdges(); //key '1'
	};
	if ( keyID === 50 ) {e.preventDefault(); pixelMultiplier--; fitToEdges(); //key '2'
	};
	if ( keyID === 72 ) {keyH++; showHelp(); }
};
function checkKeyUp(e){
	var keyID=(e.keyCode) ? e.keyCode : e.which;//x-browser
	if (keyID === 38 || keyID === 87){//up arrow or 'w'
		pixel.keyUp=	false;
		e.preventDefault();
	};
	if (keyID === 39 || keyID === 68){//right arrow or 'd'
		pixel.keyRight=	false;
		e.preventDefault();
	};
	if (keyID === 40 || keyID === 83){//down arrow or 's'
		pixel.keyDown=	false;
		e.preventDefault();
	};
	if (keyID === 37 || keyID === 65){//left arrow or 'a'
		pixel.keyLeft=	false;
		e.preventDefault();
	};
	if (keyID === 32){
		pixel.keySpace=	false;
	};
};
//				&&&&& %%%&& &&&&& &&%&& &%&%&
//		DRAW    &&&&& _________________ &%&%&
//				&&&&& %%%&& &&&&& &&%&& &%&%&
function drawBackground(){
	ctx.fillStyle="black";
    ctx.fillRect(0,0,cv.x,cv.y);
};

var rad = 1;
function radius(e){
	rad += e.wheelDelta/120; rad = Math.abs(rad);drawMousePox();return false;
};
function drawMousePox(){
	drawCrc(moX,moY,rad);
	ctx.fillStyle="rgba(50,200,50,1)"
	ctx.fillRect(xA[Math.floor(moX/pixelMultiplier)]+1,yA[Math.floor(moY/pixelMultiplier)]+1,pixelMultiplier-1,pixelMultiplier-1);
	if (tab%2) {	new ball ( (moX/pixelMultiplier) | 0 , (moY/pixelMultiplier) | 0 ) ;};
};

function drawCrc(a,b,c){
	ctx.beginPath();
	ctx.arc(a,b,c,0,7);
	ctx.stroke();
	ctx.closePath();
};

function clickOn(){
	ctx.fillStyle="rgba("+rV+","+gV+","+bV+",.9)";
	new ball ( Math.floor(moX/pixelMultiplier), Math.floor(moY/pixelMultiplier) );
	return false; 
};
//		     ggg     rrrrrrr      i    oooooooo
//grid 	   GGGGGG.  RR    RR     iii   DDD    DdD
//		 GGG        RR    RR           DDD     dDD
//		GGG    GGGg RRRRRRRR     III   DDD     dDD
//		 GGgggggGG  Rr    RRRR  IIII   DDDDDDDDDDd.
//
// see grid xA & yA @ start.
function drawgrid(pixelMult){
	var sx = ~~(pixelMult*(250/cv.x));
	var sy = ~~(pixelMult*(250/cv.y));
	for ( var i=0; i< xA.length; i++ ) {
		for ( var b=0; b< yA.length; b++ ) {
				ctx.fillStyle = "rgba("+ b* sy +",0,"+ i* sx +",.5";
				ctx.fillRect ( xA[i]+1, yA[b]+1, pixelMult-1, pixelMult-1 ) ;
		};
	};
};

drawBackground();
gridtId="null";
gridtId=setInterval( function refreshGrid() {drawgrid(pixelMultiplier)} , 170);
drawgrid(pixelMultiplier);

function ball (x, y) { //thanks MiJyn
    this.x = x;
    this.y = y;

    this.gravity = function() {
        if (this.y < yA.length-1 ) {
            this.y++;
        var rV = Math.floor(Math.random(0)*256);//this uglyness
		var	gV = Math.floor(Math.random(0)*256);//is not
		var	bV = Math.floor(Math.random(0)*256);//from MyJyn
            ctx.fillStyle="rgba("+rV+","+gV+","+bV+",.9)";// xD
            ctx.fillRect(xA[this.x]+1,yA[this.y]+1,pixelMultiplier-1,pixelMultiplier-1);
        } else {
            clearInterval(this.timer);
            var rV = Math.floor(Math.random(0)*256);
			var	gV = Math.floor(Math.random(0)*256);
			var	bV = Math.floor(Math.random(0)*256);
            ctx1.fillStyle="rgba("+rV+","+gV+","+bV+",1)";
            ctx1.fillRect(xA[this.x]+1,yA[this.y]+1,pixelMultiplier-1,pixelMultiplier-1);
        };
    };

    this.timer = setInterval(function() {this.gravity()}.bind(this), 60);
};

/* pPPPPPPPP     |||||   XXX       XXX      
   pPPP   PPPP   |||||    XXX     XXX         
   pPP    PPPP             XXX   XXX     EEEEE  || 
   pPP    PPP               XXX XXX      E      ||
   pPPPPPP       |||||       XXXXX       EEEE   || 
   pPPP          |||||      XXX XXX      E      ||
   pPPP          |||||     XXX   XXX     EEEEE  ||OOOOO
   pPPP          |||||    XXX     XXX  
   pPPP          |||||   XXX       XXX */
function Pixel (){
	this.x=xA;
	this.y=yA;
	this.keyUp=	false;
	this.keyDown=	false;
	this.keyLeft=	false;
	this.keyRight=	false;
	this.keySpace=	false;
	this.yy=0;
	this.xx=0;
};
Pixel.prototype.draw = function () {
	keyPress();
	ctx.fillStyle="rgba(0,255,0,1)";
	ctx.fillRect ( this.x[this.xx]+1, this.y[this.yy]+1, pixelMultiplier-1, pixelMultiplier-1);
};
function keyPress(){
	if (pixel.keyUp && pixel.yy > 0){
		pixel.yy--;
	};
	if (pixel.keyDown && pixel.yy < pixel.y.length-1){
		pixel.yy++;
	};
	if (pixel.keyLeft && pixel.xx > 0){
		pixel.xx--;
	};
	if (pixel.keyRight && pixel.xx < pixel.x.length-1){
		pixel.xx++;
	};
	if (pixel.keySpace){
		new ball ( pixel.x [pixel.xx]/pixelMultiplier , pixel.y [pixel.yy]/pixelMultiplier )
	};
};
pixelTimer = setInterval(function(){pixel.draw()} , 20);