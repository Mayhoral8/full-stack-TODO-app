import React, { useRef, useState, useEffect, useContext } from 'react'
import { Contexts } from './context/context.tsx'


const ImageUpload = (props) => {
    const { file, setFile, isFileValid, setIsFileValid } = useContext(Contexts).files
    const [previewUrl, setPreviewUrl] = useState('')

    const pickedFile = useRef()
    const pickImageHandler = () => {
        pickedFile.current.click()
    }

    const pickFileHandler = (e) => {
        if (e.target.files && e.target.files.length === 1) {
            const pickedFile = e.target.files[0]
            console.log(e.target.files[0])
            setFile(pickedFile)


            return;
        }
    }

    useEffect(() => {

        if (!file) {
            return
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result)
        }
        fileReader.readAsDataURL(file);
        setIsFileValid(true)
        props.onInput(previewUrl, props.id, isFileValid)
     

    }, [file, previewUrl, props.id, isFileValid])
    return (
        <React.Fragment>
            <div className=' justify-center grid'>
                <h3 className='text-white'>Set Profile Image</h3>
                <input onChange={pickFileHandler} ref={pickedFile} type='file' style={{ display: 'none' }} accept='.jpg, .png, .jpeg' />
                <div className='mx-auto'>
                    <div className='h-24 w-24 border-2 overflow-hidden' >
                        <img src={previewUrl} alt='preview' className=''/>
                    </div>
                    <button type='button' className='bg-yellow-400  w-24 rounded-md text-gray-900 h-8 mt-2' onClick={pickImageHandler}>Pick Image</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ImageUpload