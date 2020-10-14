import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    return(
        <nav className = "navbar navbar-expand-lg bg-light">
            {<Link to="/" className="navbar-brand">Pathfinding Visualizer </Link> }
             

        </nav>
    );
};

export default Navbar;