song1 = "";
song2 = "";

leftwristX = 0;
leftwristY = 0;

rightwristX = 0;
rightwristY = 0;

scorerightWrist = 0;
scoreleftWrist = 0;

song1_status = "";
song2_status = "";

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
	stroke("#FF0000");

	song1_status = song1.isPlaying();
    song2_status = song2.isPlaying() ;


   if(scorerightWrist > 0.2) {

    circle(rightwristX, rightwristY, 20);

	song2.stop();

	if(song1_status == false) {

		song1.play();
		document.getElementById("song").innerHTML = "Song playing : AI music DJ Webapp music"
	}

   }

   if(scoreleftWrist > 0.2) {

    circle(leftwristX, leftwristY, 20);

	song1.stop();

	if(song2_status == false) {

		song2.play();
		document.getElementById("song").innerHTML = "Song playing : Harry Potter's theme"
	}

   }


	}
   


function modelLoaded() {
    console.log("poseNet is initialized");
}

function gotPoses(results) {

    if(results.length > 0) {
        console.log(results);
        scorerightWrist = results[0].pose.keypoints[10].score;
		scoreleftWrist = results[0].pose.keypoints[9].score;
        
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;
    }
}