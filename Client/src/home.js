import React from 'react'; //I import react everytime I work in a react file
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


const Home = () => { //in react we work with components, so here I created a component for the home page. 
    return (
        
        <div style ={{paddingLeft: '20px'}}>
            <h1>How long do you have?</h1>
            
                <h3>
                    <Link to="/long" style={{color: 'black' , textDecoration: 'none'}}>I'm here for a while.</Link>
                </h3>
                <h3>
                    <Link to="/short" style={{color: 'black' , textDecoration: 'none'}}>I only have a second.</Link>
                </h3>
            
            
        </div>
    );
}
export default Home;
