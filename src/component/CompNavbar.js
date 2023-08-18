import { Box, Modal, TextField, Typography } from '@mui/material'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { v4 as uuidv4 } from 'uuid';

function CompNavbar() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const [imgError, setImgError] = useState('')

    const [data, setData] = useState({
        img: '',
        name: '',
        price: '',
        quantity: 1,
    });
    const productDetails = JSON.parse(localStorage.getItem('productDetails')) || [];
    
    
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        const maxSizeInKB = 100 * 1024;
        // console.log(maxSizeInKB);
        // console.log(imageFile.size);
        if(imageFile.size > maxSizeInKB ){
            e.target.value = ''
            setImgError('Image size must be less than 100Kb.')
        }else{
            setData((prev) => ({ ...prev, img: URL.createObjectURL(imageFile) }))
            setImgError('')
        }
        
    }


    const handleChange = (e) => {
        setData((prev) => ({ ...prev, id: uuidv4(), [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // setProdData([...prodData, data,])
        productDetails.push(data)
        localStorage.setItem('productDetails', JSON.stringify(productDetails))
        // console.log(data);
        setOpen(false)
        setData({
            img: '',
            name: '',
            price: ''
        })
        // setProdData([])
        navigate('/product')

    }

    const handleClose = () =>{
        setOpen(false)
        setImgError('')
        navigate('/product')
    }
    return (
        <>
            <nav className="navbar  navbar-light bg-light color-light px-5">
                <a className="navbar-brand" href="#">Shopping Mart</a>
                <div>
                    <button className='btn btn-primary mx-auto' onClick={() => setOpen(true)}>
                        Buy Now
                    </button>
                </div>
            </nav>

            <Modal 
                open={open}
                onClose={handleClose} >
                <Box sx={{position:'absolute', top:'15%', left:'35%',  bgcolor: 'background.paper', width: '400px', border: '1px solid gray' }}>
                <form onSubmit={handleSubmit} >
                    <div className='p-4 '>
                        <div className='form-group border-0'>
                            <label className='text-lg'>Upload Image</label>
                            <input className=' form-control' type='file' accept="image/*" onChange={handleImageChange} required/>
                            <p className='text-danger'>{imgError}</p> 
                        </div>

                        <div className='form-group border-0 my-4'>
                            <label className='text-lg'>Product Name</label>
                            <input className=' form-control' type='text' name='name' value={data.name} onChange={handleChange} required/>
                        </div>

                        <div className='form-group border-0 mb-3'>
                            <label className='text-lg'>Price</label>
                            <input className=' form-control' type='number' name='price' value={data.price} onChange={handleChange} required/>
                        </div>


                        <button type='submit' className='btn btn-primary'>Add Product</button>
                    </div>
                </form>
                </Box>
            </Modal>
        </>
    )
}

export default CompNavbar