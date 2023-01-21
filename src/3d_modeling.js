import React from "react";
import * as THREE from "three"
import ForceGraph3D from "react-force-graph-3d";
import SpriteText from "three-spritetext"
//PM4PY의 Heuristic Model을 json으로 변경한 파일
import test1 from "./test1.json"

//data 정리
const iData = {
  nodes: test1.nodes.map((log, id) => ({"id":log.id, "value": log.value })),
  links: test1.links.map((log, id) => (
      {"source": log.source,"target":log.target, "weight": log.weight}
  ))
};


function App() {

  return (
    <div>
      <ForceGraph3D
       graphData={iData}

		// link에 weight 값을 반영
       linkWidth = {link => {
        return link.weight
       }}

		// node를 텍스트로 띄우고 value 값을 반영
       nodeThreeObject={node => {
        const sprite = new SpriteText(node.id);
        sprite.textHeight = (node.value);
        return sprite;
      }}
      />
    </div>
  );  
}

export default App;