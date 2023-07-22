import React, {useContext} from 'react'
import styled from "styled-components"
import { Contexts } from '../context/context'

const LoadingOverlay =()=>{

  const  {isLoading} = useContext(Contexts).loading
  
  if(isLoading){
    return (
      <>
    <section className=''>

    <ModalStyle>
    <div className='text-4xl'>
    <i className="fas fa-spinner animate-spin text-yellow-400"/> 

    </div>
    </ModalStyle>
    </section>
    </>
  )
}else{
  return null
}
}
const ModalStyle = styled.div`
position: fixed;
top: 0;
bottom: 0;
right: 0;
left: 0;
display: flex;
z-index: 40;
align-items: center;
justify-content: center;
background: rgba(0, 0, 0, 0.8);
`;
export default LoadingOverlay