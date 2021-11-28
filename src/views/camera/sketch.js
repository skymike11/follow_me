// Copyright (c) 2018 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
PoseNet using p5.js
=== */
/* eslint-disable */

import ml5 from 'ml5'


export default function run() {
  // Grab elements, create settings, etc.
  var video = document.getElementById('video');
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');


  // The detected positions will be inside an array
  let poses = [];

  // Create a webcam capture
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
      video.srcObject = stream
      video.play();
    });
  }

  // A function to draw the video and poses into the canvas.
  // This function is independent of the result of posenet
  // This way the video will not seem slow if poseNet
  // is not detecting a position
  function drawCameraIntoCanvas() {
    // Draw the video element into the canvas
    ctx.drawImage(video, 0, 0, 640, 480);
    // We can call both functions to draw all keypoints and the skeletons
    drawKeypoints();
    drawSkeleton();
    window.requestAnimationFrame(drawCameraIntoCanvas);
  }
  // Loop over the drawCameraIntoCanvas function
  drawCameraIntoCanvas();

  // Create a new poseNet method with a single detection
  // const poseNet = ml5.poseNet(video, 'single', gotPoses);
  // You can optionally call it for multiple poses
  const poseNet = new ml5.poseNet(video, 'multiple', modelLoaded);

  // A function that gets called every time there's an update from the model
  function modelLoaded(results) {
    console.log("model loaded");
  }

  // Listen to new 'pose' events
  poseNet.on('pose', function (results) {
    poses = results;
  });

  // A function to draw ellipses over the detected keypoints
  function drawKeypoints()  {
    // Loop through all the poses detected
    if(poses!==undefined){
    for (let i = 0; i < poses.length; i++) {
      // For each pose detected, loop through all the keypoints
      for (let j = 0; j < poses[i].pose.keypoints.length; j++) {
        let keypoint = poses[i].pose.keypoints[j];
        // Only draw an ellipse is the pose probability is bigger than 0.2
        if (keypoint.score > 0.2) {
          ctx.fillStyle='rgb(' + Math.floor(255-42.5*i) + ',' +
          Math.floor(255-42.5*j) + ',0)';;

          ctx.beginPath();
          ctx.arc(keypoint.position.x, keypoint.position.y, 5, 0, 2 * Math.PI);

          ctx.stroke();
        }
      }
    }
  }
  }

  // A function to draw the skeletons
  function drawSkeleton() {
    // Loop through all the skeletons detected
    for (let i = 0; i < poses.length; i++) {
      // For every skeleton, loop through all body connections
      for (let j = 0; j < poses[i].skeleton.length; j++) {
        let partA = poses[i].skeleton[j][0];
        let partB = poses[i].skeleton[j][1];
        ctx.strokeStyle='rgb(' + Math.floor(255-42.5*i) + ',' +
        Math.floor(255-42.5*j) + ',0)';;
        ctx.beginPath();
        ctx.moveTo(partA.position.x, partA.position.y);
        ctx.lineTo(partB.position.x, partB.position.y);
        ctx.stroke();
      }
    }
  }
}

