import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Approveusers() {

    const [list, setList] = useState([])

    const getusers = async () => {
        try {
            const response = await axios.post(
                'http://localhost/secureiot.php',
                new URLSearchParams({
                    tag: 'getusers',
                }),
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            setList(response.data);
        } catch (error) {
            console.error('Error fetching:', error);
            alert('Failed to fetch. Please try again later.');
        }
    };


    const Approveusers = async (id) => {
        try {
            const response = await axios.post(
                'http://localhost/secureiot.php',
                new URLSearchParams({
                    tag: "Approveeuser",
                    id: id, 
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );
    
            if (response.data && response.data.error === 0) {
                console.log(response.data);
                alert("Approve Successfully!");
                getusers(); 
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };
    const deniedusers = async (id) => {
        try {
            const response = await axios.post(
                'http://localhost/secureiot.php',
                new URLSearchParams({
                    tag: "denieduser",
                    id: id, 
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );
    
            if (response.data && response.data.error === 0) {
                console.log(response.data);
                alert("Blocked Successfully!");
                getusers(); 
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    const HandleDelete = async (id) => {
        try {
            const response = await axios.post(
                'http://localhost/secureiot.php',
                new URLSearchParams({
                    tag: "deleteuser",
                    id: id, 
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );
    
            if (response.data && response.data.error === 0) {
                console.log(response.data);
                alert("Deleted Successfully!");
                getusers(); 
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            alert(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    useEffect(() => {
        getusers()
    })

    return (
        <div>
            <div className='container'>
                <div className='card mt-4'>
                    <div className='card-header text-center bg-secondary text-white '>
                        <h4 >Approve Users</h4>
                    </div>
                </div>
                <div className='mt-3'>
                    <div className="row py-2 mb-5">
                        {list
                            .reduce((rows, item, index) => {
                                if (index % 3 === 0) {
                                    rows.push([]);
                                }
                                rows[rows.length - 1].push(
                                    <div key={index} className=" align-items-center col-sm-4">
                                        <div className="card shadow mb-5 py-3">

                                            <div className="text-center py-2">
                                                <h5>Mobile: {item.mobile}</h5>
                                                <h5>Status: {item.status}</h5>
                                                <div className='mt-4'>
                                                   
                                                    
                                                    {
                                                        item.status==='N' ?
                                                        <>
                                                         <Link className='btn btn-success' onClick={(() => Approveusers(item.id))}>Approve</Link>
                                                        </> 
                                                        :<> <Link className='btn btn-success' onClick={(() => deniedusers(item.id))}>Block</Link></>
                                                    }
                                                    <Link className='btn btn-danger ms-5' onClick={(() => HandleDelete(item.id))}>Delete</Link>

                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                );
                                return rows;
                            }, []).map((row, rowIndex) => (
                                <div key={rowIndex} className="row">
                                    {row}
                                </div>
                            ))}
                    </div>

                </div>


            </div>
        </div>
    )
}
