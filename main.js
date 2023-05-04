song1 = "";
song2 = "";

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

songStatus = "";

function preload()
{
 song1 = loadSound("NaatuNaatu.mp3");
 song2 = loadSound("Janani.mp3");
}

function setup()
{
  canvas = createCanvas(600,600);
  canvas.position(650, 250);
  
  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function gotPoses(results)
{
  if(results.length > 0)
  {
	console.log(results);
	
	rightWristX = results[0].pose.rightWrist.x;
	rightWristY = results[0].pose.rightWrist.y;
	console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);

	leftWristX = results[0].pose.leftWrist.x;
	leftWristY = results[0].pose.leftWrist.y;
	console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
		
  scoreLeftWrist =  results[0].pose.keypoints[9].score;
  console.log("Score of Left Wrist : " + scoreLeftWrist);
  }
}

function draw()
{
  image(video,0,0,600,600);

  songStatus = song1.isPlaying();
  console.log(songStatus);

  if(scoreLeftWrist > 0.5)
  {
    stroke("red");
    fill("blue");
    circle(floor(leftWristX),floor(leftWristY),30);
    song2.stop();
  }
  
  if(songStatus = "false")
  {
    song1.play();
    document.getElementById("song_name").innerHTML = "Naatu-Naatu";
  }

  stroke("magenta");
  fill("yellow");
  circle(floor(rightWristX),floor(rightWristY),30);
}
function play()
{
  song1.setVolume(0.5);
  song1.play();
}
function stop()
{
  song1.stop();
}