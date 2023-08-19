import React, { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router'
import { ImCross } from 'react-icons/im';


function ProductList() {
    const navigate = useNavigate()
    const [total, setTotal] = useState(0)

    const productDetails = JSON.parse(localStorage.getItem('productDetails'))

    const BagData = JSON.parse(localStorage.getItem('bagItem')) || [];

    useEffect(() => {
        const addTotal = BagData.reduce((accumulator, item) => {
            return accumulator + item.quantity * item.price;
        }, 0)

        setTotal(addTotal)
    }, [BagData])


    const handleDecrement = (id) => {
        const updateDetails = productDetails?.map(item => {
            if (item.id === id && item.quantity > 0) {
                return {
                    ...item, quantity: item.quantity - 1
                }
            }
            return item
        })
        if (BagData) {
            const update = BagData.map(item => {
                if (item.id === id && item.quantity > 0) {
                    return {
                        ...item, quantity: item.quantity - 1
                    }
                }
                return item
            })
            localStorage.setItem('bagItem', JSON.stringify(update))
        }


        localStorage.setItem('productDetails', JSON.stringify(updateDetails))
        navigate('/product')
    }

    const handleIncrement = (id) => {
        const updateDetails = productDetails?.map(item => {
            if (item.id === id) {
                return {
                    ...item, quantity: item.quantity + 1
                }
            }
            return item
        })

        if (BagData) {
            const update = BagData.map(item => {
                if (item.id === id) {
                    return {
                        ...item, quantity: item.quantity + 1
                    }
                }
                return item
            })
            localStorage.setItem('bagItem', JSON.stringify(update))
        }

        localStorage.setItem('productDetails', JSON.stringify(updateDetails))
        navigate('/product')
    }



    const handleAddClick = (id) => {
        const newAddItem = productDetails.find(item => item.id === id)
        const alleredyAdd = BagData.find(item => item.id === id)

        if (alleredyAdd) {
            alert('Product Allready Added in Table')

        } else {
            BagData.push(newAddItem)
            localStorage.setItem('bagItem', JSON.stringify(BagData))
        }
        navigate('/product')
    }

    const handleRemove = (id) => {
        const deleteItem = BagData.filter(item => item.id !== id);
        localStorage.setItem('bagItem', JSON.stringify(deleteItem))

        const deleteCard = productDetails.filter(item => item.id !== id);
        localStorage.setItem('productDetails', JSON.stringify(deleteCard))

        navigate('/product')
    }

    return (
        <>
            <div className='container' width='700px'>
                <div className='row  mt-4'>
                    {productDetails?.map(item => {
                        return (
                            <div className='col-3 text-center mb-3' key={item.id}>
                                <div className='card shadow-lg' style={{ padding: '20px 30px 0' }}>
                                    <div >
                                        <img src={item.img} style={{ height: '100px' }} className='img-fluid' />
                                    </div>
                                    <div className='card-body '>
                                        <h5>{item.name}</h5>
                                        <p className=''>${item.price}</p>
                                        <div className='border p-3 shadow' width={'200px'}>
                                            <button className='p-1 border ' onClick={() => handleDecrement(item.id)}>-</button>
                                            <span className='p-1 border m-3'>{item.quantity}</span>
                                            <button className='p-1 border ' onClick={() => handleIncrement(item.id)}>+</button>
                                        </div>
                                        <div className='btn m-3 border shadow text-primary' onClick={() => handleAddClick(item.id)}>Add to Bag</div>
                                    </div>

                                </div>
                            </div>
                        )
                    })}

                </div>

                <div className='mt-4'>
                    <h3 className='text-center'>My Shopping Bag</h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Product Name</th>
                                <th scope="col">Quentity</th>
                                <th scope="col">Price Detail</th>
                                <th scope="col">Order Total</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {BagData?.map(item => {
                                return <tr key={item.id}>
                                    <th scope="row">{item.name}</th>
                                    <td >{item.quantity}</td>
                                    <td>${item.price}</td>
                                    <td>${item.price * item.quantity}</td>
                                    <td className='text-danger' onClick={() => handleRemove(item.id)}>{<ImCross />}</td>
                                </tr>
                            })}

                            <tr>
                                <td colSpan={3} align='right'>total</td>
                                <td>${total}</td>
                                <td>-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ProductList