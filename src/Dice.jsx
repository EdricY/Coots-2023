import * as twgl from "twgl.js";
import React, { useEffect, useRef, useState } from "react";
import * as icons from "./assets/iconAssets";

const imgs = {}
for (let key in icons) {
  imgs[key] = new Image();
}

let loaded = 0;
Object.keys(imgs).forEach(key => {
  imgs[key].src = icons[key];
  imgs[key].onload = () => {loaded ++};
});


// f1dd7e yellow
// c3d4e7 blue
// f7c7b3 pink

const diceFacesMap = new Map(Object.entries({
  1: {
    faces: ["egg", "egg", "flour", "flour", "flour", "flour",],
    colors: ["#f1dd7e", "#f1dd7e", "#c3d4e7", "#c3d4e7", "#f7c7b3", "#f7c7b3"],
  },
  2: {
    faces: ["corn", "corn", "corn", "fish", "fish", "fish",],
    colors: ["#f7c7b3", "#f7c7b3", "#c3d4e7", "#c3d4e7", "#f1dd7e", "#f1dd7e"],
  },
  3: {
    faces: ["sugar", "egg", "sugar", "sugar", "flour", "fish",],
    colors: ["#f7c7b3", "#f7c7b3", "#c3d4e7", "#c3d4e7", "#f1dd7e", "#f1dd7e"],
  },
  4: {
    faces: ["sugar", "butter", "sugar", "butter", "flour", "fish",],
    colors: ["#f7c7b3", "#f7c7b3", "#c3d4e7", "#c3d4e7", "#f1dd7e", "#f1dd7e"],
  },
}))

console.log(diceFacesMap)
const rollTime = 700;
export default function DiceElement({ diceId, callback }) {
  const ref = useRef();
  const [diceObj, setDiceObj] = useState();
  const [lastRollTime, setLastRollTime] = useState(Date.now());
  const [faces] = useState(diceFacesMap.get(diceId).faces);
  const [colors] = useState(diceFacesMap.get(diceId).colors);
  useEffect(() => {
    if (!ref.current) return;

    let loadint = callUntilSuccess(() => {
      if (loaded !== Object.keys(imgs).length) {
        console.log("waiting for imgs to load ", loaded)
        return false;
      }
      const dice = new Dice(
        ref.current,
        faces,
        colors,
      );
      dice.roll(0, rollTime, 0.01 + Math.random() / 1000);
      setDiceObj(dice);
      return true;
    }, 100)

    return () => clearInterval(loadint)
  }, [ref.current]);

  useAnimationFrame(() => {
    if (!diceObj) return true;
    diceObj?.drawScene();
    return diceObj.isDoneRolling(Date.now());
  }, [diceObj, lastRollTime]);

  const onClick = () => {
    if (!diceObj.isDoneRolling(Date.now())) return;
    callback?.(faces[diceObj.faceIdx], colors[diceObj.faceIdx])
    setLastRollTime(Date.now());
    diceObj.roll(Math.floor(Math.random() * 6), rollTime, 0.01 + Math.random() / 1000);
  }


  return <div className="relative">
    <canvas ref={ref} width="120" height="120"></canvas>
    <button
      className="absolute inset-0 transparent-btn"
      onClick={onClick}></button>
  </div>

}

// based on https://css-tricks.com/using-requestanimationframe-with-react-hooks/
const useAnimationFrame = (callback, deps) => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef();

  const animate = () => {
    const shouldStop = callback();
    if (!shouldStop) {
      requestRef.current = requestAnimationFrame(animate);
    }
  };

  useEffect(() => {
    requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, deps);

};


function callUntilSuccess(func, intTime=100) {
  const success = func();
  if (success) return;
  let interval = setInterval(() => {
    const success = func();
    if (success) clearInterval(interval);
  }, intTime);
  return interval;
}

const faceCoords = [
  { x: 0, y: Math.PI / -2 },
  { x: 0, y: Math.PI / 2 },
  { x: Math.PI / 2, y: 0 },
  { x: Math.PI / -2, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: Math.PI },
];

class Dice {
  constructor(canvas, faces, colors) {
    this.x = 0;
    this.y = 0;
    this.face = "";
    this.color = "";
    this.faceIdx = 0;
    this.faces = faces;
    this.colors = colors;
    this.resolved = false;
    this.done = true; //externally controlled
    this.canvas = canvas;
    var gl = this.canvas.getContext("webgl");
    this.gl = gl;
    if (!gl) {
      console.error("no webgl :(");
    }
    // setup GLSL program
    this.program = twgl.createProgramFromScripts(gl, ["vertex-shader-3d", "fragment-shader-3d"]);

    // look up where the vertex data needs to go.
    this.positionLocation = gl.getAttribLocation(this.program, "a_position");

    // lookup uniforms
    this.matrixLocation = gl.getUniformLocation(this.program, "u_matrix");
    this.textureLocation = gl.getUniformLocation(this.program, "u_texture");

    // Create a buffer for positions
    this.positionBuffer = gl.createBuffer();
    // Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    // Put the positions in the buffer
    setGeometry(gl);

    // Create a texture.
    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);

    this.mapFaces(faces, colors);

    this.fieldOfViewRadians = degToRad(1);
    this.rotX = degToRad(0);
    this.rotY = degToRad(0);

    this.rotXTarget = Math.PI / 4 + (Math.PI / 2) * Math.floor(Math.random() * 3);
    this.rotYTarget = Math.PI / 4 + (Math.PI / 2) * Math.floor(Math.random() * 3);
    this.rotXVel = 0.001;
    this.rotYVel = 0.001;
    this.rollStopTime = 0;
    // Get the starting time.
  }

  mapFaces(faces, colors) {
    this.faces = faces;
    this.colors = colors;
    const ctx = document.createElement("canvas").getContext("2d");

    ctx.canvas.width = 128;
    ctx.canvas.height = 128;
    const faceInfos = [
      { target: this.gl.TEXTURE_CUBE_MAP_POSITIVE_X, faceColor: colors[0], textColor: "#222", text: faces[0] },
      { target: this.gl.TEXTURE_CUBE_MAP_NEGATIVE_X, faceColor: colors[1], textColor: "#222", text: faces[1] },
      { target: this.gl.TEXTURE_CUBE_MAP_POSITIVE_Y, faceColor: colors[2], textColor: "#222", text: faces[2] },
      { target: this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, faceColor: colors[3], textColor: "#222", text: faces[3] },
      { target: this.gl.TEXTURE_CUBE_MAP_POSITIVE_Z, faceColor: colors[4], textColor: "#222", text: faces[4] },
      { target: this.gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, faceColor: colors[5], textColor: "#222", text: faces[5] },
    ];
    faceInfos.forEach((faceInfo) => {
      const { target, faceColor, textColor, text } = faceInfo;
      generateFace(ctx, faceColor, textColor, text);

      // Upload the canvas to the cubemap face.
      const level = 0;
      const internalFormat = this.gl.RGBA;
      const format = this.gl.RGBA;
      const type = this.gl.UNSIGNED_BYTE;
      this.gl.texImage2D(target, level, internalFormat, format, type, ctx.canvas);
    });
    this.gl.generateMipmap(this.gl.TEXTURE_CUBE_MAP);
    this.gl.texParameteri(this.gl.TEXTURE_CUBE_MAP, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR);
  }

  contains(x, y) {
    let dx = this.x - x;
    let dy = this.y - y;
    return dx * dx + dy * dy < 50 * 50;
  }

  // draw(ctx, x = this.x, y = this.y) {
  //   this.drawScene();
  //   this.canvas.height = 100;
  //   this.canvas.width = 100;
  //   ctx.drawImage(this.gl.canvas, x - 50, y - 50, 100, 100);
  // }

  drawScene() {
    let { program, positionLocation, matrixLocation, textureLocation } = this;
    let gl = this.gl;
    // convert to seconds
    let time = performance.now();
    time *= 0.001;
    // Subtract the previous time from the current time
    var deltaTime = time - this.then;
    // Remember the current time for the next frame.
    this.then = time;

    // webglUtils.resizeCanvasToDisplaySize(this.canvas);
    // this.canvas.height = 100;
    // this.canvas.width = 100;

    // Tell WebGL how to convert from clip space to pixels
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    // Clear the canvas AND the depth buffer.
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Tell it to use our program (pair of shaders)
    gl.useProgram(program);

    // Turn on the position attribute
    gl.enableVertexAttribArray(positionLocation);

    // Bind the position buffer.
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);

    // Tell the position attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 3; // 3 components per iteration
    var type = gl.FLOAT; // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offset);

    // Compute the projection matrix
    var aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    var projectionMatrix = twgl.m4.perspective(this.fieldOfViewRadians, aspect, 1, 2000);

    var cameraPosition = [0, 0, 200];
    var up = [0, 1, 0];
    var target = [0, 0, 0];

    // Compute the camera's matrix using look at.
    var cameraMatrix = twgl.m4.lookAt(cameraPosition, target, up);

    // Make a view matrix from the camera matrix.
    var viewMatrix = twgl.m4.inverse(cameraMatrix);

    var viewProjectionMatrix = twgl.m4.multiply(projectionMatrix, viewMatrix);

    this.rotX = Math.max(this.rollStopTime - Date.now(), 0) * this.rotXVel + this.rotXTarget;
    this.rotY = Math.max(this.rollStopTime - Date.now(), 0) * this.rotYVel + this.rotYTarget;
    var matrix = viewProjectionMatrix;
    matrix = twgl.m4.rotateY(matrix, this.rotY);
    matrix = twgl.m4.rotateX(matrix, this.rotX);

    // Set the matrix.
    gl.uniformMatrix4fv(matrixLocation, false, matrix);

    // Tell the shader to use texture unit 0 for u_texture
    gl.uniform1i(textureLocation, 0);

    // Draw the geometry.
    gl.drawArrays(gl.TRIANGLES, 0, 6 * 6);
  }

  roll(targetIdx, duration, force) {
    this.faceIdx = targetIdx;
    this.rotXTarget = faceCoords[targetIdx].x + Math.random() * 0.5 - 0.25;
    this.rotYTarget = faceCoords[targetIdx].y + Math.random() * 0.5 - 0.25;
    this.rollStopTime = Date.now() + duration;

    this.rotXVel = Math.random() * force + force;
    this.rotYVel = -0.02;
    // Math.random() * -.01 - .01;
  }

  isDoneRolling(now) {
    return now >= this.rollStopTime;
  }
}

function radToDeg(r) {
  return (r * 180) / Math.PI;
}

function degToRad(d) {
  return (d * Math.PI) / 180;
}

function generateFace(ctx, faceColor, textColor, imgId) {
  let backImg = imgs[faceColor];
  const { width, height } = ctx.canvas;
  if (backImg) {
    ctx.drawImage(backImg, 0, 0, width, height);
  } else {
    ctx.fillStyle = faceColor;
    ctx.fillRect(0, 0, width, height);
  }

  let img = imgs[imgId]
  ctx.drawImage(img, 0, 0, width, height);

  // const d = img.querySelector("path").getAttribute("d");
  // const path = new Path2D(d);
  // ctx.stroke(path);
}

// Fill the buffer with the values that define a cube.
function setGeometry(gl) {
  var positions = new Float32Array([
    -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1, -1,

    -1, -1, 1, 1, -1, 1, -1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 1,

    -1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, -1,

    -1, -1, -1, 1, -1, -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, 1,

    -1, -1, -1, -1, -1, 1, -1, 1, -1, -1, -1, 1, -1, 1, 1, -1, 1, -1,

    1, -1, -1, 1, 1, -1, 1, -1, 1, 1, -1, 1, 1, 1, -1, 1, 1, 1,
  ]);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    positions.map((x) => x * 1),
    gl.STATIC_DRAW
  );
}
