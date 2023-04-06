import { useContext } from "react"
import { CardContext } from "../context/CardContext";
import { Link } from "react-router-dom";
import styles from "../styles/Card.module.css"

export default function Card(){
    const data = useContext(CardContext);

    return(
        <div className= {styles.card}>
            <table className= {styles.info} border="1">
                <tr><td className= {styles.left}>activity</td><td className= {styles.right}>{data.activity_id}</td></tr>
                <tr><td className= {styles.left}>value</td><td className= {styles.right}>{data.value}</td></tr>
            </table>
        </div>
    )
    
}