import { useRef } from "react";
import styles from "./ToggleButton.module.scss";

interface Props {
  toggle: string[],
  setSwitchToggle: React.Dispatch<React.SetStateAction<string>>,
}

function ToggleButton({toggle, setSwitchToggle}: Props) {
    
    const sliderRef = useRef<HTMLSpanElement>(null)

    function handleSlide(index: number, btn:string){
      (sliderRef.current as HTMLSpanElement).style.transform = `translate(${index * 100}%)`
      switch(btn){
        case "Movies" : setSwitchToggle("movie"); break;
        case "Shows" : setSwitchToggle("tv"); break;
        default : setSwitchToggle(btn.toLowerCase())

      }
      
    }


  return (
    <div className={styles.toggleWrapper}>
        
        {
            toggle.map((btn, index) => 
            <div key={btn} className={styles.btn} onClick={()=>handleSlide(index, btn)}>{btn}</div>
            )
        }
        <span className={styles.slider} ref={sliderRef}></span>
    </div>
  )
}

export default ToggleButton