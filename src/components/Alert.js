import React from 'react'

export const Alert = (props) => {
  const capi = (word) =>{
    if(word==="danger"){
      word = "error"
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
    <div style={{height:'50px'}}>
      {props.alert &&  <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
    {props.alert.msg} 
  
</div>}
</div>

  )
}

