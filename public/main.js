// Author Ignacy Iwaniak
//==================================================

//Gravity Point works for objects added after this point.

//================================================

//Setup Global Variables ------------------------

// Setup Game
//Game Loop -------------------------------------------------------------
// import * as Rematrix from 'rematrix';
var id = 0;
var COSV = "c"
var SINV = "s"
var TIMV = "t"
var MINUSV = "-"
// const Rematrix = require('rematrix');



function createUnitMatrix(i){
  temp = []
  for (var x=0;x<i;x++)
  {
    for (var y=0;y<i;y++)
    {
      temp.push(Number(x==y));
    }
  }
  console.log(temp);
  return temp;
}


function axis0(){
  this.show = function()
  {
    push();
    translate(10,0,0);
    box(20,5,5);
    pop();
    push();
    translate(0,15,0);
    box(5,30,5);
    pop();
    push();
    translate(0,0,20);
    box(5,5,40);
    pop();
  }

  this.dh = function() {
    // rotate
  }

}


function part_1(obr1, tran1, tran2, obr2, parent){ // x, y, z
  var self = this;

  this.id = id;
  // id++;

  if(obr1.constructor === Array){
    console.log(obr1)
    this.dhArray = obr1;
  }
  else {
    this.dhArray = [];
    this.dhArray[0] = obr1;
    this.dhArray[1] = tran1;
    this.dhArray[2] = tran2;
    this.dhArray[3] = obr2;
  }

  // this.dhArrayRotation =

  this.rtMatrix = createUnitMatrix(4);

  this.child = null;
  this.ps = 10;

  this.dhTable = null

  this.show = function() {
    applyMatrix(...this.rtMatrix);
    normalMaterial();
    box(this.ps,this.ps,this.ps*3);
  }

  this.dh = function() {
    // rotateZ(this.dhArray[0]);
    // translate(0,0,this.dhArray[1])
    // translate(this.dhArray[2],0,0)
    // rotateX(this.dhArray[3]);

    // for (var i = 0; i <4; i++)
    // {
    //     for (var j = 0; j <4; j++){
    //       inputGroupFixed[i*4+j] = inputGroup[i*4+j];
    //       inputGroupValue[i*4+j] = Number(inputGroup[i*4+j].value());
    //       inputGroupValueFixed[j*4+i] = Number(inputGroup[i*4+j].value());
    //     }
    // }
    // console.dir(Rematrix.identity().map(a => a));
    // [a,b,c,d].reduce(Rematrix.multiply)
    // var asdfg = Rematrix.identity()

    // console.dir([a,b,c,d].reduce(Rematrix.multiply));
  }

  this.updateDh = function(newDh){
    switch(arguments.length) {
      case 0: break;
      case 1: this.dhArray = newDh;
      default: throw new Error('illegal argument count')
    }

    var a = Rematrix.rotateZ(this.dhArray[0]);
    var b = Rematrix.translate3d(0,0,this.dhArray[1])
    var c = Rematrix.translate3d(this.dhArray[2],0,0)
    var d = Rematrix.rotateX(this.dhArray[3]);
    this.rtMatrix = [a,b,c,d].reduce(Rematrix.multiply);
    applyDataToMatrixRT(this.rtMatrix)
  }

  //
  // this.rtTest = function(){
  //   var r11, r12, r13, r21, r22, r23, r31, r32, r33, tx,  tz , ty , s;
  //    applyMatrix( r11, r12, r13, 0.0,
  //                 r21, r22, r23, 0.0,
  //                 r31, r32, r33, 0.0,
  //                 tx,  ty , tz , s   );
  // }

  this.rtMatrixUser = function(inp){
    // var r11, r12, r13, r21, r22, r23, r31, r32, r33, tx,  tz , ty , s;
    // console.log(inp);

     applyMatrix(...inp);
  }
  this.updateRtMatrix = function(inp){
    this.rtMatrix = inp;
  }

  // this.rt = function(){
  //  applyMatrix.apply(this, this.rtMatrix);
  // }

    // this.createChild = function() {
  //   var tx = this.x;
  //   // this.child = part_1();
  // }
}

function applyDataToMatrixRT(v){
  for (var i = 0; i <4; i++)
  {
      for (var j = 0; j <4; j++){
          inputGroup[i*4+j].value(v[j*4+i]);
      }
  }
}

function changeValueOfMatrixRT(){
  console.log("boom")

      // if(inputGroup.radio.value() == 1)
      //   {
      //     inputGroup[1*4+1].value(COSV);
      //     inputGroup[2*4+2].value(COSV);
      //     inputGroup[1*4+2].value(SINV);
      //     inputGroup[2*4+1].value(MINUSV + SINV);
      //   }

      for (var i = 0; i <4; i++)
      {
          for (var j = 0; j <4; j++){
            inputGroupFixed[i*4+j] = inputGroup[i*4+j];
            inputGroupValue[i*4+j] = Number(inputGroup[i*4+j].value());
            inputGroupValueFixed[j*4+i] = Number(inputGroup[i*4+j].value());
          }
      }
      if(partGroup.length != 0){
        partGroup[this.idPart].updateRtMatrix(inputGroupValueFixed);

      }

}

function createMatrixRT(x, y, w, h ){

    for (var i = 0; i <4; i++)
    {
        for (var j = 0; j <4; j++)
          {
            inputGroup[i*4+j] = createInput(((i===j)*1).toString(), "text");//"r" + (i+1).toString() + (j+1).toString());
            inputGroup[i*4+j].position(x+j*(w+10), y+i*h);
            inputGroup[i*4+j].style('width', (w).toString() + 'px');
            inputGroup[i*4+j].input(changeValueOfMatrixRT)
            inputGroup[i*4+j].idPart = id;
            // inputGroup[i*4+j].idX = i;
            // console.log(i*4 + j)
          }
    }
    inputGroup.radio = createRadio();
    inputGroup.radio.position(x+0*(w+10), y+5*h);
    inputGroup.radio.option('None', 0);
    inputGroup.radio.option('x', 1);
    inputGroup.radio.option('y', 2);
    inputGroup.radio.option('z', 2);
    inputGroup.radio.style('width', '180px');
    inputGroup.radio.input(changeValueOfMatrixRT);

    changeValueOfMatrixRT();
}

function createDh(){
  dhSize = {
    x: 60, y: height, w: 30, h: 30, xspace: 40
  }

  textDh[0] = createSpan('Teta');
  textDh[0].position(dhSize.x + 0*dhSize.xspace , height);
  textDh[1] = createSpan('d');
  textDh[1].position(dhSize.x + 1*dhSize.xspace , height);
  textDh[2] = createSpan('a');
  textDh[2].position(dhSize.x + 2*dhSize.xspace , height);
  textDh[3] = createSpan('alfa');
  textDh[3].position(dhSize.x + 3*dhSize.xspace , height);
}

function moveAddbutton(){

  addButton.position(10, height + 30 + 30*id);
}


function changeValueOfArrayDh(){
  console.dir(this);
  dhInputValue[this.idY][this.idX] = this.value();
  partGroup[this.idY].dhArray[this.idX] = Number(this.value());
  partGroup[this.idY].updateDh()
    // for (var i = 0; i <4; i++){
    //     for (var j = 0; j <4; j++){
    //     }
    // }
}

function addPartArray(){

  dhInput[id] = [];
  dhInputValue[id] = []
  for (var i = 0; i <4; i++){
    dhInput[id][i] = createInput("0");//"r" + (i+1).toString() + (j+1).toString());
    dhInput[id][i].position(60 + i*dhSize.xspace, height + 30 + 30*id);
    dhInput[id][i].style('width', 30 + 'px');
    dhInput[id][i].input(changeValueOfArrayDh)
    dhInput[id][i].idY = id;
    dhInput[id][i].idX = i;
    dhInputValue[id][i] = 0;
  }
}

function addPart(){
  // moveAddbutton();
  var tempPart = new part_1(dhInputValue[id]);
  partGroup.push(tempPart); //dhInput[0].value(),dhInput[1].value(),dhInput[2].value(),dhInput[3].value()
  dhInput[id].part = tempPart;
  console.dir(dhInput[id].part)
  id++;
  moveAddbutton();
  addPartArray();
}

function createUI(){

    createMatrixRT(width, 0, 40, 30)
    console.log(inputGroup);

    addButton = createButton('Add');
    addButton.position(10, height + 30);
    addButton.mousePressed(addPart);

    //DH Table
    createDh();
    addPartArray();

    radio = createRadio();
    radio.position(60 + 5*dhSize.xspace, height + 30);
    radio.option('dh', 1);
    radio.option('matrix', 2);
    // radio.sele = 1;
    radio.style('width', '120px');
    // console.dir(radio.value())
    radio._getInputChildrenArray()[0].checked = true;
    // console.dir(radio.value())

    let a ={"asd" : 1, "sdf" : 2, "dfg" : 3};

    jsonOfPartsIn = createInput();
    jsonOfPartsIn.position(60 + 8*dhSize.xspace, height + 30);
    jsonOfPartsIn.style('width', (200).toString() + 'px');

    jsonOfPartsButtonIn = createButton('LoadJson');
    jsonOfPartsButtonIn.position(60 + 8*dhSize.xspace, height + 60);

    jsonOfPartsOut = createInput(JSON.stringify(a));
    jsonOfPartsOut.position(60 + 8*dhSize.xspace, height + 90);
    jsonOfPartsOut.style('width', (200).toString() + 'px');

    jsonOfPartsButtonOut = createButton('GetJson');
    jsonOfPartsButtonOut.position(60 + 8*dhSize.xspace, height + 120);

}

// SInusy cosinusy, macierze obrotu radio


    // -y
// ____|
// ____|
// ----|________ x
// ---/
// --/
// -/
// z


// o, d, a, alfa
let sliderGroup = [];

let inputGroup = [];
let inputGroupFixed = [];
let inputGroupValue = [];
let inputGroupValueFixed = [];

let partGroup = [];

let inputMatrix = {};

let addButton;
let dhSize;
let textDh = [];
let dhInput = [];
let dhInputValue = [];

// partGroup[0] = new part_1(0,15,0,0);
// partGroup[1] = new part_1(0,50,0,0);
// partGroup[2] = new part_1(0,0,30,0);
var a0 = new axis0();

let myFont;
function preload() {
    myFont = loadFont("./data/Inconsolata.ttf");
}

function setup() {
  angleMode(DEGREES);
  createCanvas(710, 400, WEBGL);
  camera(90, -90, 90, 0, 0, 0);
  normalMaterial();
  debugMode();
  // console.log(a);

  createUI();

  // printMatrix()
  // addButton.mousePressed();
  // jsonOfParts.input(changeValueOfMatrixRT)


  // textFont(myFont);

  // inputGroup[i*4+j].input(changeValueOfMatrixRT);

  // sliderGroup[0] = createSlider(-400, 400, 0);
  // sliderGroup[0].position(10, height + 90);
  // sliderGroup[0].style('width', '80px');
  // sliderGroup[1] = createSlider(-400, 400, 0);
  // sliderGroup[1].position(10, height + 60);
  // sliderGroup[1].style('width', '80px');
}

function draw() {

  let rad = millis() / 10;
  // Set rotation angles
  let ct = cos(rad);
  let st = sin(rad);
  orbitControl();
  // a.obr1 = sliderGroup[0].value();
  // a2.obr1 = sliderGroup[1].value();
  background(250);
  rotateX(90);
  push();
  // translate(0, 20, 0);
  a0.show();
  // a.matrixUser(inputGroupValueFixed);
  // a.show();
  for (var part in partGroup)
  {
    // console.log(part);
    if(radio.value() == 1){
      partGroup[part].dh();}
    else{
      partGroup[part].rt();}
      partGroup[part].show()
      a0.show()
  }
  // a1.dh()
  // a1.show();
  // a2.dh()
  // a2.show();


  // applyMatrix.apply(this, inputGroupValue);
   // console.log(inputGroupValueFixed);

  // rotateX(45);
  // box(10,20,10);
  // resetMatrix();
  pop();
  // textSize(32);
  // fill(0, 102, 153);
  // textFont(myFont);
  // text('Teta',0 ,0);

}
