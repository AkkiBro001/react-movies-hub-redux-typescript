import React from 'react'
import styles from "./ContentWrapper.module.scss"

interface prop {
    children: React.ReactNode
}


function ContentWrapper({children}: prop) {
  return (
    <div className={styles.contentWrapper}>
            {children}          
    </div>
  )
}

export default ContentWrapper