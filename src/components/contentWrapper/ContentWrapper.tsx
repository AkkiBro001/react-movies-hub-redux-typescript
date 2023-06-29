import React from 'react'
import styles from "./ContentWrapper.module.scss"

interface prop {
    children: React.ReactNode,
    styleCSS?: object,
}


function ContentWrapper({children, styleCSS}: prop) {
  return (
    <div className={styles.contentWrapper} style={styleCSS as object}>
            {children}          
    </div>
  )
}

export default ContentWrapper