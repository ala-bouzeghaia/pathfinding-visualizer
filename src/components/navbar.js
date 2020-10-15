import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return(
        <nav className = "navbar navbar-expand-lg bg-light">
            <Link to="/" className="navbar-brand">Pathfinding Visualizer </Link>
            
            <div className="collapse navbar-collapse" >
                <ul className="nav nav-pills">
                    <li className="nav-item dropdown">
                    <button className="link-button nav-link dropdown-toggle" 
                        data-toggle="dropdown"                          
                        aria-haspopup="true" 
                        aria-expanded="false">Algorithms</button>
                    <div className="dropdown-menu">
                        <button className="dropdown-item" >Action</button>
                        <button className="dropdown-item" >Another action</button>
                        <button className="dropdown-item" >Something else here</button>                        
                    </div>
                    </li>

                    <li className="nav-item dropdown">
                    <button className="link-button nav-link dropdown-toggle" 
                        data-toggle="dropdown"                          
                        aria-haspopup="true" 
                        aria-expanded="false">Mazes</button>
                    <div className="dropdown-menu">
                        <button className="dropdown-item" >Action</button>
                        <button className="dropdown-item" >Another action</button>
                        <button className="dropdown-item" >Something else here</button>                        
                    </div>
                    </li>

                    <li className="nav-item">
                        <button className="visualize-button nav-link active">Visualize </button>
                    </li>

                    <li className="nav-item">
                        <button className="link-button" >Clear Board </button>
                    </li>

                    <li className="nav-item">
                        <button className="link-button" >Clear Path </button>
                    </li>
                </ul>                
                
            </div>
            
             

        </nav>
    );
};

export default Navbar;