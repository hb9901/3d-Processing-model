import React, { useMemo, useEffect } from "react";
import ForceGraph3D from "react-force-graph-3d";
import { useState } from "react";
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import axios from "axios";
import { Link } from "react-router-dom";

import { CardContext } from "../context/CardContext";
import iData from "../functions/Dataobject"
//import Dataobject from "../functions/Dataobject"
import RGBscaling from "../functions/RGBscaling";
import FilteredData from "../functions/FilteredData";
import styles from "../styles/Graphpage.module.css"

import Card from "../components/Card";
import Filter from "../components/Filter";
import Options from "../components/Options";

const extraRenderers = [new CSS2DRenderer()];

export function Graphpage(){
    let [activity_id, SetId] = useState(""); 
    let [value, SetValue] = useState(""); 
    let [nf_value, SetNF_Value] = useState(0);
    let [lf_value, SetLF_Value] = useState(0);
    let [string, setString] = useState(false);
    let [arrow, setArrow] = useState(false);
    //let [iData, setIData] = useState()
    let fData = useMemo(()=>FilteredData(iData, nf_value, lf_value), [nf_value, lf_value]);
  
    const [resize, setResize] = useState(window.innerWidth);
  
    const handleResize = () => {
      setResize(window.innerWidth);
    };
  
    useEffect(() => {
      // axios
      //   .get(,{
      //     headers:{
  
      //     }
      //   })
      //   .then((result)=>{
      //     setIdata(Dataobject(result.data));
      //   })
      //   .catch((err) =>{
      //     console.log(err);
      //   })
      if (true) {
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }
    }, []);
  
    return (
      <div className="main">
        <ForceGraph3D 
         width = {window.innerWidth - 205}
         height= {window.innerHeight}
  
         extraRenderers={extraRenderers}
         backgroundColor="#B4C8BB"
         graphData={fData}
         
         linkWidth = {link => {
          return 1+ link.weight/1000
         }}
  
         nodeThreeObject={node => {
          const nodeEl = document.createElement('div');
          if(string){
            nodeEl.textContent = node.id;
            nodeEl.style.color = "white";
            nodeEl.className = 'node-label';
          }
          return new CSS2DObject(nodeEl);
        }}
  
        nodeThreeObjectExtend={true}
  
         //link 진행속도(weight 비례)
        // linkDirectionalParticles="weight"
        // linkDirectionalParticleSpeed={d => {if(flow){return d.weight * 0.001}}}  
  
        // 방향 화살표
        linkDirectionalArrowLength={node => { if(arrow){return 3.5}}}
        linkDirectionalArrowRelPos={node => { if(arrow){return 1}}}
  
        nodeColor={d=>RGBscaling(d.value, iData.nodeminvalue, iData.nodemaxvalue)}
        linkColor={d=>RGBscaling(d.weight, iData.linkminvalue, iData.linkmaxvalue)}
  
        onNodeClick={(node)=>{
          SetId(node.id);
          SetValue(node.value);
        }}
        />

        <div className={styles.sidebar}>
            <CardContext.Provider value = {{activity_id, value}}>
            <Card/>
            </CardContext.Provider>

            <CardContext.Provider value = {{nf_value, SetNF_Value, lf_value, SetLF_Value}}>
            <Filter/>
            </CardContext.Provider>

            <CardContext.Provider value = {{string, setString, arrow, setArrow}}>
            <Options/>
            </CardContext.Provider>
            <Link to="/"><button className={styles.backtohome}>홈으로</button></Link>
        </div>
      </div>
    );
}

export default Graphpage;