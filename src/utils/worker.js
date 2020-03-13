'use strict'
import * as bodyPix from "@tensorflow-models/body-pix";

const net = await bodyPix.load({
    architecture: "ResNet50",
    outputStride: 16,
    quantBytes: 1
});

onmessage = function(event) { 
    postMessage("respondo:",event);
}