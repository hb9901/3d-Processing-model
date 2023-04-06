import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom"
import styles from "../styles/Homepage.module.css"

function Homepage(){
  const [files, setFiles] = useState("");

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

    return(
    <>
    <div className={styles.main2}>
      <div className={styles.intro}>
        <div>Build 3d Process Model</div>
      </div>
      <div className={styles.fileuploader}>
        <label className = {styles.uploadbutton} for="upload-csv">파일 업로드</label>
        <input type="file" name="photo" id="upload-csv" style={{display:"none"}} onChange={handleChange} />
        <Link to = "/Graph" className={styles.link}><button className={styles.sendtoserver}>3d-model 생성</button></Link>
      </div>
    </div>
    </>
    );
}

export default Homepage;