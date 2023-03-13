export default function RGBscaling(v, minValue, maxValue){
    let result;
    // value 값에 비례하여 16진수로된 6자리의 RGB 값으로 변경 
    result = ((255-parseInt((v - minValue)/(maxValue-minValue)* 255) )*65536+(255-parseInt((v - minValue)/(maxValue-minValue) * 255))*256+(255-parseInt((v - minValue)/(maxValue-minValue) * 255))).toString(16);
    while(result.length<6){
      result="0"+result
    }
    return "#"+result
}