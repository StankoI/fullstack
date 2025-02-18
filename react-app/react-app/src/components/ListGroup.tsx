import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
// import { MouseEvent } from "react";

function ListGroup()
{   
    let items = ['Sofia','London','Paris','Tokyo','Berlin'];
    const [selectedIndex, setSelectedIndex] = useState(-1);
    

    const getMessage = () => {
        return items.length === 0 && <p> No items fount </p>;
    }

    

    return (
    <Fragment>
        <h1>List</h1>
        { getMessage()}
        <ul className="list-group">
            {items.map((item, index) => (
                <li className= { selectedIndex === index ? "list-group-item active" : "list-group-item"} 
                    key = {item} 
                    onClick={() => {setSelectedIndex(index)}} 
                > 
                {item}
                </li>
            ))}
        </ul>
    </Fragment>
  );
}

export default ListGroup