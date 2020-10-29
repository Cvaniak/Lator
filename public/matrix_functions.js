function createUnitMatrix(i)
{
  temp = []
  for (var x=0;x<i;x++)
  {
    for (var y=0;y<i;y++)
    {
      temp.push(Number(x==y));
    }
  }
  return temp;
}


function createXRotationMatrix(i)
{
  var temp = createUnitMatrix(4);
  var x, y;
  x = 0; y = 0; temp[y*4+x] = "cos(t)";
  x = 1; y = 1; temp[y*4+x] = "cos(t)"
  x = 1; y = 0; temp[y*4+x] = "sin(t)"
  x = 0; y = 1; temp[y*4+x] = "-sin(t)"
  return temp;
}
