import React from 'react'
import styled from "styled-components"

const LoadingOverlay =()=>
 {
  return (
    <>
    <section className='hidden'>

    <ModalStyle>
    <div className='text-4xl'>
    <i className="fas fa-spinner animate-spin"/> 

    </div>
    </ModalStyle>
    </section>
    </>
  )
}
const ModalStyle = styled.div`
position: fixed;
top: 0;
bottom: 0;
right: 0;
left: 0;
display: flex;
z-index: 10;
align-items: center;
justify-content: center;
background: rgba(0, 0, 0, 0.8);
`;
export default LoadingOverlay