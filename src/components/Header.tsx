import React, { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';



const Header: React.FC= () => {
    const navigate = useNavigate();
    const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

    const logOut = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        localStorage.removeItem("currentUser");
        localStorage.removeItem("currentId");
        localStorage.removeItem("token");
        navigate('/');
    };
    useEffect(() => {
      
      if(localStorage.getItem("currentId")){
          setLoggedIn(true);
      }
  }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img
                            alt=""
                            src="https://i.postimg.cc/x8zn1jgq/point.gif"
                            width="50"
                            height="50"
                            className="d-inline-block align-top"
                        />{' '}
                        <span id='he' className='text-primary-emphasis fs-2 ms-2'>ShopWithTrends</span>
                    </a>
                    {isLoggedIn ? 
                        <nav>
                            <a className="nav-link active" href="/">
                                <button onClick={(e) => logOut(e)} className='btn btn-secondary my-2 my-sm-0 ' >Logout
                                    <i className="fa-solid fa-right-from-bracket text-white ms-3"></i>
                                </button>
                            </a >
                        </nav>
                    :
                    <nav>
                            <a className="nav-link active" href="/login">
                                <button  className='btn btn-secondary my-2 my-sm-0 ' >LogIn/Register
                                    <i className="fa-solid fa-right-from-bracket text-white ms-3"></i>
                                </button>
                            </a>
                        </nav>

                    }
                </div>
            </nav>
        </div>
    );
}

export default Header;
