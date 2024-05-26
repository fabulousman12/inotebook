import React, { useEffect } from 'react';

function DOMManipulationComponent() {
  useEffect(() => {
    const element = document.getElementById('my-element');
    element.style.color = 'red';

    // Cleanup if necessary
    return () => {
      element.style.color = '';
    };
  }, []); // Empty dependency array means this effect runs once after the initial render.

  return( <div id="my-element">This text will be red</div>);
}
export default DOMManipulationComponent;