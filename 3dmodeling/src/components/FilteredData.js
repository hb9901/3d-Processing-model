export default function FilteredData(iData, nf_value, lf_value){
    let node_standard;
    let link_standard;
    let fData1;
    let fData2;
    // 노드 필터
    // 필터 기준 값을 설정한다.
    node_standard = iData.nodes[parseInt((iData.nodes.length-1)*nf_value/100)].value
    // 필터된 node 배열을 받는다.
    fData1 = iData.nodes.filter(e=>e.value>=node_standard); 
    // 필터된 node에 있는 id를 기준으로 links의 source에 해당 id가 있는지 필터링한다.
    fData2 = fData1.map((log, id) =>(
        iData.links.filter(e => e.source === log.id)
    ))
    // 필터된 link들을 저차원화 한다.
    fData2 = fData2.reduce(function(acc, cur){
        return [...acc,...cur]
    })
    // 필터된 node에 이는 id를 기준으로 links의 target에 해당 id가 있는지 필터링한다.
    fData2 = fData1.map((log, id) =>(
        fData2.filter(e => e.target === log.id)
    ))
    // 필터된 link들을 저차원화 한다.
    fData2 = fData2.reduce(function(acc, cur){
        return [...acc,...cur]
    })

    //필터된 배열들을 최종적으로 그래프 input 형태롤 맞춤
    const rData = {
        nodes: fData1.map((log, id) => ({"id":log.id, "value": log.value })),
        links: fData2.map((log, id) => (
            {"source": log.source,"target":log.target, "weight": log.weight}
        ))
    };

 //links를 weight의 내림차순으로 저렬
rData.links = rData.links.sort(function(a, b){
    return b.weight - a.weight;
})  
// 필터 값에 해당하는 link의 weight 기준 값을 구한다
  rData.links.length > 0 ? link_standard = rData.links[parseInt((rData.links.length-1)*lf_value/100)].weight : link_standard =0

  // 기준 값보다 작은 link들을 필터링한다.
  rData.links = rData.links.filter((e) => e.weight >= link_standard);     
    return rData;
}