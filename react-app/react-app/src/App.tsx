import ListGroup from "./components/ListGroup"
import Button from "./components/Button";
import Alert from "./components/Alert";
import { useState } from "react";

function App()
{
    let items = ['Sofia','London','Paris','Tokyo','Berlin'];

    const handleSelectItem = (item: string) => {
        console.log(item);
    } 
    
    const [alertVisible, setAlertVisibility] = useState(false);

    return <div>
            <ListGroup items = {items} heading = "Cities" onSelectItem={handleSelectItem} ></ListGroup>
            {alertVisible && <Alert onClose={() => {setAlertVisibility(false)}}>My Alert</Alert>}
            <Button onClick={() => {setAlertVisibility(true)}}>My Button</Button>
           </div>
}

export default App