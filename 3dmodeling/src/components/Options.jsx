import styles from "../styles/Options.module.css"
import { useContext } from "react"
import { CardContext } from "../context/CardContext";

export default function Options(){
    const data = useContext(CardContext);
    
    return(    
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
    )
}