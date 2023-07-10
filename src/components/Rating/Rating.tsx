import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Rating({rating, clsName}:{rating:number, clsName: string}) {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  if(!rating) return null
  return (
    <div className={`rating ${clsName}`}>
      <CircularProgressbar
        value={rating}
        maxValue={10}
        text={`${rating.toFixed(1)}`}
        strokeWidth={8}
        styles={buildStyles({
          // Colors
          pathColor: `${rating < 5 ? '#b60909' : rating < 7 ? '#dfd800' : '#058912'}`,
          textColor: '#f6f6f6',
          trailColor: 'transparent',
          
          // Text size
          textSize: '40px',
         
        })}
      />
    </div>
  )
}

export default Rating