import React from 'react'; //I import react everytime I work in a react file
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const Home = () => { //in react we work with components, so here I created a component for the home page. 
    return (
        
        <div style ={{paddingLeft: '20px'}}>
            <h1>Welcome.</h1>
            <h3>How long do you have?</h3>
            <ul>
                <li><Link to="/long">I'm here for a while.</Link></li>
                <li><Link to="/short">I only have a second.</Link></li>
            </ul>
            
        </div>
    );
}
export default Home;
