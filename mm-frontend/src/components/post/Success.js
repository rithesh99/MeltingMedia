import React from 'react'
import Header from '../../components/shared/Header/Header';
import Successimg from '../../assets/success.png'
export default function Success() {
    return (
        <div>
            <Header />
            <div className="" >
                <img src={Successimg} alt="" style={{width:"50%", marginLeft:"25vw", marginTop:"10vh"}} />
                <p style={{textAlign:"center"}}>Your post has been successfully uploaded</p>
            </div>
        </div>
    )
}
