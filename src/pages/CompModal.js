import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';

function CompModal() {

    const [data, setData] = useState({
        img: '',
        name: '',
        price: '',
        quantity: 1,
    });
    const productDetails = JSON.parse(localStorage.getItem('productDetails'))

    const [selectedImage, setSelectedImage] = useState(null);
    const [prodData, setProdData] = useState(productDetails || [] )

    const [count, setCount] = useState(1)

    const navigate = useNavigate()

    const handleImageChange = (e) => {
        const imageFile = e.target.files[0];
        // console.log(imageFile);

        setData((prev) => ({ ...prev, img: URL.createObjectURL(imageFile) }))

        // // Perform size validation here (100KB)
        // if (file && file.size <= 100 * 1024) {
        //     const reader = new FileReader();
        //     reader.onload = (e) => {
        //         const base64Image = e.target.result;
        //         setData((prev) => ({ ...data, img: base64Image, image: file }));
        //         setSelectedImage(base64Image);
        //     };

        //     reader.readAsDataURL(file);
        // } else {
        //     alert("Please upload a file below 100 kb");
        // }
    }


    const handleChange = (e) => {
        setData((prev) => ({ ...prev, id: uuidv4(), [e.target.name]: e.target.value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        setProdData([...prodData, data,])
        localStorage.setItem('productDetails', JSON.stringify([...prodData, data]))
        // console.log(data);
        setData({
            img: '',
            name: '',
            price: ''
        })

    }

    const handleDecrement = (id) =>{
        const updateDetails = productDetails.map(item =>{
            if(item.id === id){
                return {
                    ...item, quantity: item.quantity - 1
                }
            }
            return item
        })

        localStorage.setItem('productDetails', JSON.stringify(updateDetails))
        navigate('/dialogBox')
    }

    const handleIncrement = (id) =>{
        const updateDetails = productDetails.map(item =>{
            if(item.id === id){
                return {
                    ...item, quantity: item.quantity + 1
                }
            }
            return item
        })

        localStorage.setItem('productDetails', JSON.stringify(updateDetails))
        navigate('/dialogBox')
    }

    return (
        <>

            <div className='container'>
                <form onSubmit={handleSubmit} className='row'>
                    <div className=' col-sm-5 flex flex-col w-1/3 p-10 mt-5 p-4 mx-auto border  rounded border-2 justify-center'>
                        <div className='form-group border-0'>
                            <label className='text-lg'>Upload Image</label>
                            <input className=' form-control' type='file' accept="image/*" onChange={handleImageChange} />
                        </div>

                        <div className='form-group border-0 my-4'>
                            <label className='text-lg'>Product Name</label>
                            <input className=' form-control' type='text' name='name' value={data.name} onChange={handleChange} />
                        </div>

                        <div className='form-group border-0 mb-3'>
                            <label className='text-lg'>Price</label>
                            <input className=' form-control' type='number' name='price' value={data.price} onChange={handleChange} />
                        </div>


                        <button type='submit' className='btn btn-primary'>Add Product</button>
                    </div>
                </form>

                <div className='row  mt-4'>
                    {productDetails?.map(item => {
                        return (
                            <div className='col-4 text-center' key={item.id}>
                                <div className='card p-3'>
                                    <img src={item.img} className='img-fluid img-responsive card-img-top' />
                                    <div className='card-body border'>
                                        <h5>{item.name}</h5>
                                        <p className='border'>{item.price}</p>
                                        <div className='border p-3 shadow' width={'200px'}>
                                            <button className='p-2 border ' onClick={() => handleDecrement(item.id)}>-</button>
                                            <span className='p-2 border m-2'>{item.quantity}</span>  
                                            <button className='p-2 border ' onClick={() => handleIncrement(item.id)}>+</button>
                                        </div>
                                        <div className='btn m-3 border shadow'>Add to Bag</div>
                                    </div>

                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>

        </>
    )
}

export default CompModal