import React, { Component } from "react";
import './App.css';
import ForceGraph3D from "react-force-graph-3d";
import { useState } from "react";
import iData from "./components/dataobject"
import RGBscaling from "./components/RGBscaling";
import FilteredData from "./components/FilteredData";
import SpriteText from "three-spritetext";
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';

const extraRenderers = [new CSS2DRenderer()];

function App() {

  let [activity_id, SetId] = useState("");
  let [value, SetValue] = useState("");
  let [nf_value, SetNF_Value] = useState(0);
  let [lf_value, SetLF_Value] = useState(0);
  let fData = FilteredData(iData, nf_value, lf_value);

  return (
    <div className="main">
      <ForceGraph3D
       className="graph"
       extraRenderers={extraRenderers}
       backgroundColor="brown"
       graphData={fData}
       
       linkWidth = {link => {
        return 1+ link.weight/1000
       }}

       nodeThreeObject={node => {
        const nodeEl = document.createElement('div');
        nodeEl.textContent = node.id;
        nodeEl.style.color = "white";
        nodeEl.className = 'node-label';
        return new CSS2DObject(nodeEl);
      }}

      nodeThreeObjectExtend={true}

      //노드 글자로 띄우기
      //  nodeThreeObject={node => {
      //   const sprite = new SpriteText(node.id + '(' + node.value + ')');
      //   sprite.color = node.color;
      //   // sprite.textHeight = 5+(node.value)/2;
      //   return sprite;
      // }}

       //link 진행속도(weight 비례)
      // linkDirectionalParticles="weight"
      // linkDirectionalParticleSpeed={d => d.weight * 0.001}

      // 방향 화살표
      // linkDirectionalArrowLength={3.5}
      // linkDirectionalArrowRelPos={1}
      nodeColor={d=>RGBscaling(d.value, iData.nodeminvalue, iData.nodemaxvalue)}
      linkColor={d=>RGBscaling(d.weight, iData.linkminvalue, iData.linkmaxvalue)}
       onNodeClick={(node)=>{
        // SetId(node.id);
        // SetValue(node.value);
        console.log(node.id);
       }}

      />
      <div className="card">
        <table border="1">
          <tr><td>activity</td><td>{activity_id}</td></tr>
          <tr><td>value</td><td>{value}</td></tr>
        </table>
        <label>Activity
          <input id = "rangefilter" className="filter" type="range" min="1" max="100" step="1" onChange={(e)=>{SetNF_Value(e.target.value)}}/>
          <small>{nf_value}%</small>
          <div></div>
        </label>
        <label>Link
          <input id = "rangefilter" className="filter" type="range" min="0" max="100" step="1" onChange={(e)=>{SetLF_Value(e.target.value)}}/>
          <small>{lf_value}%</small>
        </label>
      </div>
    </div>
  );

}

export default App;