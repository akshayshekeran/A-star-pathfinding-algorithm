let rows = 50; // Number of rows
let cols = 50; // Number of columns
let maze=[]; // 2D array
let openset=[];
let closedset=[];//to check it is visited or not
let start;
let end;
let w,h;//width and heigth of the blocks;
let lp=0;
let path=[];
function hdist(a,b)
{
  let ans=abs(a-rows)+abs(b-cols);
  return ans;
}
function dis(i,j)
{
  this.x=i;
  this.y=j;
  this.f=Number.MAX_SAFE_INTEGER;//f=g+h
  this.g=Number.MAX_SAFE_INTEGER;
  this.h=Number.MAX_SAFE_INTEGER;//heuristic function
  this.prev=undefined;
  this.wall=false;
  if(random(1)<0.3)
  {
    this.wall=true;
  }  
  this.show=function(col)
  {
    fill(col);
    stroke(0);
    rect(this.x*w,this.y*h,w,h);
  }
}
function setup() {
  createCanvas(400, 400);
  w=width/cols;
  h=height/rows;
  // Initialize the 2D array
  for (let i = 0; i < rows; i++) {
  maze[i] = []; 
  closedset[i] = [];
  for (let j = 0; j < cols; j++) {
    maze[i][j] = new dis(i,j); // Initialize
    closedset[i][j] = 0; // Initialize everything as unvisited
  }
}
  start=maze[0][0];
  start.wall=false;
  end=maze[rows-1][cols-1];
  end.wall=false;
  openset.push(maze[0][0]);
  start.f=0;
  start.g=0;
  start.h=0;
  console.log(maze);
}

function draw() {
  background(0);
  if(openset.length>0)
  {
      let index=0;//index that having lowest f value
      for(let i=0;i<openset.length;i++)
      {
        if(openset[i].f<openset[index].f)index=i;
      }  
      let curr=openset[index];
      openset.splice(index,1);
      if(curr==end)
      {
        console.log("done!");
        lp=1;
      }
      let X=curr.x;
      let Y=curr.y;
      closedset[X][Y]=1;
      let di=[-1,0,0,1,-1,-1,1,1];
      let dj=[0,-1,1,0,-1,1,-1,1];
      for(let i=0;i<8;i++)
      {
        let a=X+di[i];
        let b=Y+dj[i];
        if(a<rows&&a>=0&&b<cols&&b>=0&&closedset[a][b]!=1&&maze[a][b].wall==false)
        {
          let gnew=curr.g+1;
          let hnew=hdist(a,b);
          let fnew=gnew+hnew;
          if(maze[a][b].f>fnew)
          {
            openset.push(maze[a][b]);
            maze[a][b].prev=maze[X][Y];
            maze[a][b].f=fnew;
            maze[a][b].g=gnew;
            maze[a][b].h=hnew;
          }
        }
      }
    path=[];
    temp=curr;
    path.push(curr);
    while(temp.prev)
    {
      path.push(temp.prev);
      temp=temp.prev;
    } 
    
  }
  else
  {
    console.log("no solution");
    lp=1;
  } 
  for(let i=0;i<rows;i++)
  {
    for(let j=0;j<cols;j++)
    {
      if(maze[i][j].wall)maze[i][j].show(0);
      else maze[i][j].show(255);
      
    }  
  }
  for(let i=0;i<openset.length;i++)
  {
    maze[openset[i].x][openset[i].y].show(color(255,0,0));
  }  
  for(let i=0;i<path.length;i++)
  {
    maze[path[i].x][path[i].y].show(color(0,0,255));
  }  
  if(lp==1)noLoop();
}
