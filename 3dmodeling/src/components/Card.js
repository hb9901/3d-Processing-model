import { useContext } from "react"
import { CardContext } from "../context/CardContext";
import styles from "../styles/Card.module.css"

export default function Card(){
    const data = useContext(CardContext);

    return(
        <div className= {styles.card}>
            <table className= {styles.info} border="1">
                <tr><td className= {styles.left}>activity</td><td className= {styles.right}>{data.activity_id}</td></tr>
                <tr><td className= {styles.left}>value</td><td className= {styles.right}>{data.value}</td></tr>
            </table>

            <div className={styles.filterpart}>
            <label>Activity({data.nf_value}%)
                <input id = "rangefilter" className= {styles.filter} value = {data.nf_value} type="range" min="1" max="100" step="1" onChange={(e)=>{data.SetNF_Value(e.target.value)}}/>
            <div></div>
            </label>
            <label>Link({data.lf_value}%)
                <input id = "rangefilter" className={styles.filter} value = {data.lf_value} type="range" min="0" max="100" step="1" onChange={(e)=>{data.SetLF_Value(e.target.value)}}/>
            </label>
            </div>
            
            <div className={styles.checkbox}>
            <div className={styles.checkboxTitle}>Options</div>
            <label>
                <input type="checkbox" onChange={()=>{data.string ? data.setString(false) : data.setString(true)}}/>
                글자 생성
            </label>
            <label>
                <input type="checkbox"  onChange={()=>{data.arrow ? data.setArrow(false) : data.setArrow(true)}}/>
                화살표생성
            </label>
            </div>

            <button className={styles.backtohome} onClick={()=>data.setIsData(!data.isData)}>홈으로</button>
        </div>
    )
    
}