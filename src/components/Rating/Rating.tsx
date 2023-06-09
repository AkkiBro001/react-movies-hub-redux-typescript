import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from "./Rating.module.scss"
function Rating() {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  const rate: number = 3.5;
  return (
    <div className={styles.rating}>
      <CircularProgressbar
        value={rate}
        maxValue={10}
        text={`${rate}`}
        strokeWidth={8}
        styles={buildStyles({
          // Colors
          pathColor: `${rate < 5 ? '#b60909' : rate < 7.5 ? '#d7d000' : '#058912'}`,
          textColor: '#222222',
          trailColor: 'transparent',
          
          // Text size
          textSize: '40px',
         
        })}
      />
    </div>
  )
}

export default Rating