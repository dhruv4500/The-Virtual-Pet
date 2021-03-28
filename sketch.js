var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feedings;
var lastFed;
//create feed and lastFed variable here

var feed,lastFed;
var feeding;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feeding=createButton("Feed The Dog");
  feeding.position(700,95);
  feeding.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  fedTime = database.ref('feedTime')
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
  getTime();

 
  //write code to display text lastFed time here

  stroke("black");
  fill("white");
  textSize(20);
  if(lastFed >= 12){
    text("Last Fed : " + lastFed % 12 + " PM", 10,20)
  } else if(lastFed == 0){
    text("Last Fed : 12 AM",10,20)
  } else{
    text("Last Fed : " + lastFed + " AM",10,20)
  }

 
  drawSprites();

}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
   foodS-=1;
  //write code here to update food stock and last fed time
  database.ref('/').update({
    Food:foodS

  })

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })

  dog.addImage(sadDog);
}

async function getTime(){
  var response=await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON=await response.json();


  var dateTime=responseJSON.datetime;

  var hour=dateTime.slice(11,13);
//  console.log(hour);

database.ref('/').update({
  'feedTime':hour
})
}