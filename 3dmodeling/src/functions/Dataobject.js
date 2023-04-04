import data from '../data/test2.json'

//최솟값 할당
let nodeMinValue = data.nodes[0].value;
data.nodes.map((log, id) => {
    if(nodeMinValue > log.value){
        nodeMinValue = log.value;
        return nodeMinValue;
    }
})

//최댓값 할당
let nodeMaxValue = data.nodes[0].value;
data.nodes.map((log,id) => {
    if(nodeMaxValue < log.value){
        nodeMaxValue = log.value;
        return nodeMaxValue;
    }
})

//최솟값 할당
let linkMinValue = data.nodes[0].value;
data.nodes.map((log, id) => {
    if(linkMinValue > log.value){
        linkMinValue = log.value;
        return linkMinValue;
    }
})

//최댓값 할당
let linkMaxValue = data.nodes[0].value;
data.nodes.map((log,id) => {
    if(linkMaxValue < log.value){
        linkMaxValue = log.value;
        return linkMaxValue;
    }
})

//data를 react-force-graph-3d의 input 형식에 맞게 변경
const dataobject = {
    nodes: data.nodes.map((log, id) => ({"id":log.id, "value": log.value })),
    links: data.links.map((log, id) => (
        {"source": log.source,"target":log.target, "weight": log.weight}
    )),
    nodeminvalue: nodeMinValue,
    nodemaxvalue: nodeMaxValue,
    linkminvalue: linkMinValue,
    linkmaxvalue: linkMaxValue
};

//nodes를 value의 내림차순으로 정렬
dataobject.nodes = dataobject.nodes.sort(function(a, b){
    return b.value - a.value;
})

//links를 weight의 내림차순으로 저렬
dataobject.links = dataobject.links.sort(function(a, b){
    return b.weight - a.weight;
})  

export default dataobject;

// export default function Dataobject(data){
    //     //최솟값 할당
    //     let nodeMinValue = data.nodes[0].value;
    //     data.nodes.map((log, id) => {
    //         if(nodeMinValue > log.value){
    //             nodeMinValue = log.value;
    //             return nodeMinValue;
    //         }
    //     })
    
    //     //최댓값 할당
    //     let nodeMaxValue = data.nodes[0].value;
    //     data.nodes.map((log,id) => {
    //         if(nodeMaxValue < log.value){
    //             nodeMaxValue = log.value;
    //             return nodeMaxValue;
    //         }
    //     })
    
    //     //최솟값 할당
    //     let linkMinValue = data.nodes[0].value;
    //     data.nodes.map((log, id) => {
    //         if(linkMinValue > log.value){
    //             linkMinValue = log.value;
    //             return linkMinValue;
    //         }
    //     })
    
    //     //최댓값 할당
    //     let linkMaxValue = data.nodes[0].value;
    //     data.nodes.map((log,id) => {
    //         if(linkMaxValue < log.value){
    //             linkMaxValue = log.value;
    //             return linkMaxValue;
    //         }
    //     })
    
    //     //data를 react-force-graph-3d의 input 형식에 맞게 변경
    //     const dataobject = {
    //         nodes: data.nodes.map((log, id) => ({"id":log.id, "value": log.value })),
    //         links: data.links.map((log, id) => (
    //             {"source": log.source,"target":log.target, "weight": log.weight}
    //         )),
    //         nodeminvalue: nodeMinValue,
    //         nodemaxvalue: nodeMaxValue,
    //         linkminvalue: linkMinValue,
    //         linkmaxvalue: linkMaxValue
    //     };
    
    //     //nodes를 value의 내림차순으로 정렬
    //     dataobject.nodes = dataobject.nodes.sort(function(a, b){
    //         return b.value - a.value;
    //     })
    
    //     //links를 weight의 내림차순으로 저렬
    //     dataobject.links = dataobject.links.sort(function(a, b){
    //         return b.weight - a.weight;
    //     })  
    //     return dataobject;
    // }
    