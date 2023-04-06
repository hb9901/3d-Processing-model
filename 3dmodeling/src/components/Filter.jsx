import styles from "../styles/Filter.module.css"
import { useContext } from "react"
import { CardContext } from "../context/CardContext";

export default function Filter(){
    const data = useContext(CardContext);
    
    return(
        <div className={styles.filterpart}>
        <label>Activity({data.nf_value}%)
            <input id = "rangefilter" className= {styles.filter} value = {data.nf_value} type="range" min="1" max="100" step="1" onChange={(e)=>{data.SetNF_Value(e.target.value)}}/>
        <div></div>
        </label>
        <label>Link({data.lf_value}%)
            <input id = "rangefilter" className={styles.filter} value = {data.lf_value} type="range" min="0" max="100" step="1" onChange={(e)=>{data.SetLF_Value(e.target.value)}}/>
        </label>
        </div>
    )
}