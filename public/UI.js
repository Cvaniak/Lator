
function createUI(){

    // createMatrixRT(width, 0, 40, 30)
    console.log(rtInput);

    addButton = createButton('Add');
    addButton.position(10, height + 30);
    addButton.mousePressed(addPart);

    //DH Table
    createDhText();
    addDhArray();

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


      // sliderGroup[0] = createSlider(-400, 400, 0);
      // sliderGroup[0].position(10, height + 90);
      // sliderGroup[0].style('width', '80px');
      // sliderGroup[1] = createSlider(-400, 400, 0);
      // sliderGroup[1].position(10, height + 60);
      // sliderGroup[1].style('width', '80px');
}



function createDhText(){
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

function addDhArray(){

  dhInput[id] = [];
  dhInputValue[id] = []
  for (var i = 0; i <4; i++){
    dhInput[id][i] = createInput("0");
    dhInput[id][i].position(60 + i*dhSize.xspace, height + 30 + 30*id);
    dhInput[id][i].style('width', 30 + 'px');
    dhInput[id][i].input(changeValueOfArrayDh)
    dhInput[id][i].idPart = id;
    dhInput[id][i].idX = i;
    dhInputValue[id][i] = 0;
  }
}


function moveAddbutton(){

  addButton.position(10, height + 30 + 30*id);
}


function createMatrixRT(x, y, w, h ){
    console.log("createMatrixRT")
    rtInput[id] = [];
    rtInputFixed[id] = [];
    rtInputValue[id] = [];
    rtInputValueFixed[id] = [];
    for (var i = 0; i <4; i++)
    {
        for (var j = 0; j <4; j++)
          {
            rtInput[id][i*4+j] = createInput(((i===j)*1).toString(), "text"); // 
            rtInput[id][i*4+j].position(x+i*(w+10), y+j*h+id*6*h);
            rtInput[id][i*4+j].style('width', (w).toString() + 'px');
            rtInput[id][i*4+j].input(changeValueOfMatrixRT)
            rtInput[id][i*4+j].idPart = id;
            rtInput[id][i*4+j].idX = j;
            rtInput[id][i*4+j].idY = i;
          }
    }
    var buttonValues = ["None", "x", "y", "z"]
    rtInput[id].button= [];
    for (var i = 0; i <4; i++)
    {
      var temp = "button" + buttonValues[i];
      rtInput[id].button[temp] = createButton(buttonValues[i])
      rtInput[id].button[temp].position(x+i*(w+10), y+5*h+id*6*h);
      rtInput[id].button[temp].mousePressed(rtButtonPressed);
      rtInput[id].button[temp].matrix = buttonValues[i];
      rtInput[id].button[temp].idPart = id;
    }
    // rtInput[id].radio = createRadio();
    // rtInput[id].radio.position(x+0*(w+10), y+5*h+id*6*h);
    // rtInput[id].radio.option('None', 0);
    // rtInput[id].radio.option('x', 1);
    // rtInput[id].radio.option('y', 2);
    // rtInput[id].radio.option('z', 2);
    // rtInput[id].radio.style('width', '180px');
    // rtInput[id].radio.input(changeValueOfMatrixRT);

    changeValueOfMatrixRT(1, id);
}
