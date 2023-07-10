import React, {useRef, useState, useEffect, useContext} from 'react'
import { ReactReduxContext } from 'react-redux'
import { Contexts } from './context/context'


const ImageUpload = ()=>{
    const {file, setFile, isFileValid, setIsFileValid} = useContext(Contexts).files
    const [previewUrl, setPreviewUrl] = useState('')
    
    const pickedFile = useRef()
    const pickImageHandler = ()=>{
        pickedFile.current.click()
       

    }

    const pickFileHandler = (e)=>{
        if(e.target.files && e.target.files.length === 1){
            const pickedFile = e.target.files[0]
            console.log(e.target.files[0])
            setFile(pickedFile)
       

            return;
        }
    }

    useEffect(()=>{
      
        if(!file){
            return
        }
        const fileReader = new FileReader();
        fileReader.onload = ()=>{
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file);
        setIsFileValid(true)
        console.log(isFileValid)

        
    }, [file])
return(
    <React.Fragment>
        <div className=' justify-center grid'>
            <h3 className='text-white'>Set Profile Image</h3>
            <input onChange={pickFileHandler} ref= {pickedFile} type='file' style={{display: 'none'}} accept='.jpg, .png, .jpeg'/>
            <div className='mx-auto'>
                <div className='h-24 w-24 border-2 '>
                    <img src={previewUrl} alt='preview'/>
                </div>
                <button type='button' className=' border-2 w-24 rounded-md text-yellow-400 h-8 mt-2' onClick={pickImageHandler}>Pick Image</button>
            </div>
        </div>
    </React.Fragment>
)
}

export default ImageUpload