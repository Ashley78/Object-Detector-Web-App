img=""
status=""
objects=""

function preload(){
    img=loadImage('workroom.jpg');
}

function setup(){
    canvas=createCanvas(640,420);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
}

function modelLoaded(){
    console.log("model is loaded");
    status=true;
    document.getElementById("status").innerHTML="Status = Detecting Object";
    objectDetector.detect(img, gotPoses);
}

function gotPoses(error,results){
    if(error){
        console.error(error);
    }
    if(results){
        console.log(results);
        objects=results;
    }
}
function draw(){
    image(img,0,0,640,420);

    /*fill('#0011ff');
    text("Plant",180,270);
    noFill();
    stroke('#0011ff');
    rect(170,250,150,200);

    fill('#0011ff');
    text("Work Table",280,220);
    noFill();
    stroke('#0011ff');
    rect(270,200,280,200);

    fill('#0011ff');
    text("PlantShelf",30,30);
    noFill();
    stroke('#0011ff');
    rect(20,10,200,400);

    fill('#0011ff');
    text("Plant",540,120);
    noFill();
    stroke('#0011ff');
    rect(530,100,100,320);*/

    if(status != ""){
        for(counter=0; counter<objects.length;counter++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            fill("Black");
            percent=floor(objects[counter].confidence*100);
            text(objects[counter].label+" "+percent+"%",objects[counter].x,objects[counter].y);
            noFill();
            stroke("Orange");
            rect(objects[counter].x,objects[counter].y,objects[counter].width,objects[counter].height);
        }
    }

}