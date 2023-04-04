import React, { useEffect } from "react";
import './App.css';
import ForceGraph3D from "react-force-graph-3d";
import { useState } from "react";
import iData from "./functions/Dataobject"
//import Dataobject from "./functions/Dataobject"
import RGBscaling from "./functions/RGBscaling";
import FilteredData from "./functions/FilteredData";
import Card from "./components/Card";
import SpriteText from "three-spritetext";
import axios from "axios";
import { CSS2DRenderer, CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { CardContext } from "./context/CardContext";

const extraRenderers = [new CSS2DRenderer()];

function App() {
  const [files, setFiles] = useState("");
  let [activity_id, SetId] = useState(""); 
  let [value, SetValue] = useState(""); 
  let [nf_value, SetNF_Value] = useState(0);
  let [lf_value, SetLF_Value] = useState(0);
  let [string, setString] = useState(false);
  let [arrow, setArrow] = useState(false);
  let [isData, setIsData] = useState(false);
  //let [iData, setIData] = useState()
  let fData = FilteredData(iData, nf_value, lf_value);

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

  const handleChange = e => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      setFiles(e.target.result);
      console.log(files);
    };
  }

  // const SendData = async () =>{
  //   await axios
  //     .post( ,{
  //       csv:files
  //     })
  //     .then((res)=>{
  //       setIsData(true);
  //     })
  //     .catch((err) =>{
  //       console.log(err);
  //     })
  // }

  return (
    isData?
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
      <CardContext.Provider value = {{activity_id, value, nf_value, SetNF_Value, lf_value, SetLF_Value, string, setString, arrow, setArrow, isData, setIsData}}>
       <Card/>
      </CardContext.Provider>
    </div>
    :
    <>
    <div className="main2">
      <div className="intro">
        <div>Build 3d Process Model</div>
      </div>
      <div className="fileuploader">
        <label className = "uploadbutton" for="upload-csv">파일 업로드</label>
        <input type="file" name="photo" id="upload-csv" style={{display:"none"}} onChange={handleChange} />
        <button className="sendtoserver" onClick={()=>setIsData(!isData)}>3d-model 생성</button>
      </div>
    </div>
    </>
  );

}

export default App;