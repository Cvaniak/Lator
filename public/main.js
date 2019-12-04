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
var TIMV = {"user": "t", "math":"millis()"}
var MINUSV = "-"
// const Rematrix = require('rematrix');



function axis0(){
  this.show = function()
  {
    push(); translate(10,0,0); box(20,5,5); pop();
    push(); translate(0,15,0); box(5,30,5); pop();
    push(); translate(0,0,20); box(5,5,40); pop();
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

  this.dhTable = null;

  this.timeValues = {};

  this.show = function() {
    this.timeUpdate();
    applyMatrix(...this.rtMatrix);
    normalMaterial();
    box(this.ps,this.ps,this.ps*3);
  }

  this.rtMatrixUser = function(inp){
       applyMatrix(...inp);
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
    // applyDataToMatrixRT()
  }

  this.updateRtMatrix = function(inp){
    console.dir(inp)
    this.rtMatrix = inp;
  }

  this.timeUpdate = function(){

    var parser = new formulaParser.Parser();
    parser.setVariable("t", millis())
    for (var pointT in this.timeValues)
    {
    var point = this.timeValues[pointT];
      var a = parser.parse(point.v)

      this.rtMatrix[point.y*4 + point.x] = a.result;

      // console.dir(this.rtMatrix)
    }
  }
}

// console.log(parser.parse('sin(PI()/2)'));


function applyDataToMatrixRT(){
    var tab
    for (var part in partGroup)
    {
      // console.log(part);
        // tab.push(partGroup[part].rtMatrix);
        tab = (partGroup[part].rtMatrix) //.reduce(Rematrix.multiply);
        console.log(tab);
        for (var i = 0; i <4; i++)
        {
            for (var j = 0; j <4; j++){
                if(Number(tab[j*4+i]))
                {
                  rtInput[part][j*4+i].value( (Math.round(Number(tab[j*4+i])*10000 )/ 10000).toString());
                }
                else
                {
                  rtInput[part][j*4+i].value((tab[j*4+i]).toString());
                }
            }
        }
    }
}



function changeValueOfMatrixRT(idT1, idT2){
    if(typeof(idT1)=="number"){
      idT = idT2;
    }
    else{
      idT = this.idPart;
    }
    console.log(idT);
    console.dir(this);

    for (var i = 0; i <4; i++)
    {
        for (var j = 0; j <4; j++){
          if( ( rtInput[idT][i*4+j].value() ).includes(TIMV.user) ){
            // rtInput[idT][i*4+j].value(1);
            partGroup[idT].timeValues[i*4+j]= {x:j, y:i, v:rtInput[idT][i*4+j].value()};
          }
          else{
          // rtInputFixed[idT][i*4+j] = rtInput[idT][i*4+j];
          delete partGroup[idT].timeValues[i*4+j];
          rtInputValue[idT][i*4+j] = Number(rtInput[idT][i*4+j].value());
          // rtInputValueFixed[idT][j*4+i] = Number(rtInput[idT][i*4+j].value());
          }
        }
    }

  if((partGroup.length != 0)){
    // console.dir(rtInputValueFixed[idT])
    partGroup[idT].updateRtMatrix(rtInputValue[idT]);
  }
}

function rtButtonPressed(){
  console.log(this.matrix)
  switch (this.matrix) {
    case "None":
      break;
    case "x":
      // rtInput[this.idPart] = createXRotationMatrix();
      // changeValueOfMatrixRT(-1, this.idPart);

      // partGroup[this.idPart].updateRtMatrix();
      // applyDataToMatrixRT();
      break;
    case "y":
      break;
    case "z":
      break;
    default:
      break;

  }
}


function changeValueOfArrayDh(){
  console.dir(this);
  dhInputValue[this.idPart][this.idX] = this.value();
  for ( var x in dhInputValue[this.idPart]){
    if(this.idPart < id){
      partGroup[this.idPart].dhArray[this.idX] = Number(this.value());
      partGroup[this.idPart].updateDh()
    }
  }
}

function addPart(){
  // moveAddbutton();
  var tempPart = new part_1(dhInputValue[id]);
  partGroup.push(tempPart);

  createMatrixRT(width, 0, 40, 30);

  partGroup[id].updateDh();
  id++;
  moveAddbutton();
  addDhArray();
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

let rtInputFixed = [];
let rtInputValue = [];
let rtInputValueFixed = [];

let partGroup = [];

let inputMatrix = {};
let rtInput = []

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

  createUI();

}

function draw() {

  let rad = millis() / 10;
  // Set rotation angles
  let ct = cos(rad);
  let st = sin(rad);
  orbitControl();
  background(250);
  rotateX(90);
  push();
  a0.show();
  for (var part in partGroup)
  {
    // console.log(part);
    if(radio.value() == 1){
      // partGroup[part].dh();
    }
    else{
      partGroup[part].rt();
    }
      partGroup[part].show()
      a0.show()
  }
  // resetMatrix();
  pop();
}

// createUnitMatrix
