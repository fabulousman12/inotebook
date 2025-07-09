import React, { useContext } from 'react'

import Notes from './Notes';



const Home = (props) => {
  console.log = console.warn = console.error = () => {};

  // Look ma, no error!
  console.error('Something bad happened.');
  const {ShowAlert} = props;
  return (
    <div >
   
 
  
       <Notes ShowAlert={ShowAlert}/>
    </div>
  )
}

export default Home
