import React from 'react'
import {Link, useNavigate} from 'react-router-dom';
import Testpage from '../components/testpage';
import { getItem } from './Data';

let items = getItem();

const Testing = (props) => {
    var user = {id:1,name:'jack'}
    const navigate = useNavigate();
    const toComponentB=()=>{
    navigate('/test',{state:user});
    }
    return (
  <div> 
    <a onClick={()=>{toComponentB()}} >Component B</a>
</div>
    );
}

export default Testing