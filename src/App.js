import React, { useEffect } from "react";
import "./App.css";
import * as bodyPix from "@tensorflow-models/body-pix";
import { bindPage, loadVideo, getVideoInputs } from "./utils/bp.Util";

function App() {
       let NET;
       const Width = window.innerWidth /2;
       const Height = window.innerHeight /2;
       useEffect(() => {
              loadTs();
       }, []);


       async function loadTs() {

              // bindPage();
              const net = await bodyPix.load({
                     architecture: "ResNet50",
                     outputStride: 16,
                     quantBytes: 1
              });
              NET = net;
              // const net = null;

              const cv = document.getElementById("finalImg");
              const ctx = cv.getContext("2d");

              loadVideo(null, 'videplayer').then((r) => {
                     StartEverything(net, 'videplayer',cv)
              });
              // const videoInput = await getVideoInputs();
              
              // console.log(videoInput[0]);
       }

       function StartEverything(net,player,cv){
              const vi = document.getElementById(player);
              const LastCv = document.getElementById("segmented");
              let ctx = cv.getContext('2d');
              // cv.setAttribute("width", Width);
              // cv.setAttribute("height", Height);
              LastCv.setAttribute("width", Width);
              LastCv.setAttribute("height", Height);
              ctx.clearRect(0,0,Width,Height);
              let newCanvas = new OffscreenCanvas(Width,Height);
              console.log("canvas:", newCanvas);

              // let xpos = (Width/2) - (vi.videoWidth/2); 
              // let ypos = parseInt( Height) - parseInt( vi.videoHeight ) ;
              // let bitmapRenderer = LastCv.getContext("bitmaprenderer");

              async function RedrawVideo(){
                     // ctx.drawImage(vi,xpos,ypos,vi.videoWidth, vi.videoHeight)
                     // beginBodySeg(newCanvas, vi, net);
                     // bitmapRenderer.transferFromImageBitmap(newCanvas.transferToImageBitmap())
                     // let image = new Image();
                     //  beginBodySeg(LastCv, vi);

                     const segmentacion = await NET.segmentMultiPersonParts(vi);
                     // console.log("seg", segmentacion);
                     if(segmentacion.length > 0){ 
                            const coloredPart = bodyPix.toColoredPartMask(segmentacion);
                            bodyPix.drawPixelatedMask(LastCv, vi, coloredPart,1,0,false,10);
       
                     }
                      if(NET){
                      }
                     // image.id = "pic";
                     // image.src = cv.toDataURL();
                     requestAnimationFrame(RedrawVideo);
              }

              RedrawVideo();


              // requestAnimationFrame(RedrawVideo);
              
              

       }


       async function beginBodySeg(cv, image) {

              if(NET){
                     const segmentacion = await NET.segmentMultiPersonParts(image);
                     // console.log("seg", segmentacion);
                     if(segmentacion.length > 0){ 
                            // let coloredPart = bodyPix.toMask(segmentacion);
                            // let pixelCellWidth = 10;
                            const coloredPart = bodyPix.toColoredPartMask(segmentacion);
                            bodyPix.drawPixelatedMask(cv, image, coloredPart,1,0,false,10);
       
                     }
              }
       }



       return (
              <div className="App">
                     <header className="App-header">
                            <video id="videplayer" ></video>
                            <canvas id="finalImg"></canvas>
                            <canvas id="segmented" />
                     </header>
              </div>
       );
}

export default App;

// const video = document.getElementById("img");
// 
// let image = new Image();
// image.crossOrigin = "anonymous";
// image.src = video.getAttribute("src");
// image.onload = () => {
//        cv.setAttribute("width", video.offsetWidth);
//        cv.setAttribute("height", video.offsetHeight);
//        // ctx.drawImage(image, 0, 0);
//        // beginBodySeg(cv, image,net);
// };


{/* <img
alt="biners"
id="img"
// src="https://scontent.fcul2-1.fna.fbcdn.net/v/t1.0-9/40491555_10214764411896747_1380256554535616512_n.jpg?_nc_cat=102&_nc_sid=13bebb&_nc_ohc=dSDZ6umGqLAAX8hkV_7&_nc_ht=scontent.fcul2-1.fna&oh=a15fe162cd3305e0ed913533769e8369&oe=5E844CCC"
src="https://scontent.fcul2-1.fna.fbcdn.net/v/t1.0-9/s960x960/79315047_2900124386707002_4392144483009953792_o.jpg?_nc_cat=109&_nc_sid=dd7718&_nc_ohc=iQdZOmhkepQAX9c3dkm&_nc_ht=scontent.fcul2-1.fna&_nc_tp=7&oh=7998c9144d9a6337f0f4b1114cefb0af&oe=5E91F33D"
// src="https://scontent.fcul2-1.fna.fbcdn.net/v/t1.0-9/39509724_10214689741470033_5793016253501145088_n.jpg?_nc_cat=100&_nc_sid=85a577&_nc_ohc=I9XQIUned_kAX_gnSYO&_nc_ht=scontent.fcul2-1.fna&oh=1dddbccc3d45e60a318ccfe0f7c47392&oe=5E8EAD23"
/>
 */}


//  <div id="stats"></div>
      
//       <div id="info" >
//         </div>
      
//       <div id="loading" >
//           <div class="spinner-text">
//             Loading BodyPix model...
//           </div>
//           <div class="sk-spinner sk-spinner-pulse"></div>
//         </div>
      
//       <div id='main' >
//         <video id="video" playsinline ></video>
//         <canvas id="output" />
//       </div>
     
//       <ul id="colors"></ul>
      