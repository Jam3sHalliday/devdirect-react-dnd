import { createRef, useContext, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import DragItem from "./components/drag-item";
import DropItem from "./components/drop-item";
import { DragDropContext } from "../../context/drag-drop.context";
import "./styles.scss";

const dragList = [
    {
        id: uuidv4(),
        component: "elementParagraph",
        props: {}
    },
    {
        id: uuidv4(),
        component: "elementButton",
        props: {}
    }
]

const Admin = () => {
    const navigate = useNavigate();
    const { consumerDrop, setConsumerDrop } = useContext(DragDropContext);

    const [mouse, setMouse] = useState({ x: 0, y: 0});

    const [draggingItemName, setDragginItemName] = useState("");

    const [currentItem, setCurrentItem] = useState(null);

    const [dropList, setDropList] = useState([...consumerDrop] || []);

    const [prevItem, setPrevItem] = useState([])

    const textRef = createRef();
    const alertRef = createRef();

useEffect(() => console.log(prevItem), [prevItem]);
    const [, drop] = useDrop(() => ({
        accept: "element",
        drop: (item) => addDrop(item.id),
        collect: (monitor) => ({ isOver: !!monitor.isOver() })
    }));

    useEffect(() => {
        // reset the edit form everytime we select different item
        if (textRef?.current) textRef.current.value = "";
        if (alertRef?.current) alertRef.current.value = "";
    }, [currentItem]);

    const addDrop = id => {
        const item = dragList.find(i => i.id === id);
        const newItem = JSON.parse(JSON.stringify(item));
        newItem.id = uuidv4();
        setPrevItem([...prevItem, newItem]);
        // I'll get the same key error if pushing and rendering the same items without changing it id
        dropList.push(newItem);
        setDropList(dropList);
    };

    // this func makes component re-render every single time mouse move, I'll try to optimize it
    const setMousePosition = e => setMouse({ x: e.screenX, y: e.screenY });
    
    const getCurrentItem = item => setCurrentItem(item);

    const getDraggingItemName = name => {
        setDragginItemName(name)
        setCurrentItem({ });
    };

    const handleEditChange = (e, id) => {
        const { name, value } = e.target;
        const item = dropList.find(i => i.id === id);

        item.props[name] = value;
        setDropList([...dropList]);
    }

    const handleSave = () => {
        setConsumerDrop(dropList);
        alert("Saved, you can check View page now!\n\n\n*sometime that 'View' button only work after I clicked it multiple times, idk why");
    };

    const handleRedirecToView = () => navigate("/consumer");
    const handleUnavailabel = () => alert("This function is unavailabel!");

    const handleUndo = () => {
        const index = dropList.indexOf(prevItem);
        if (index !== -1) {
            dropList.splice(index, 1);
            setDropList([...dropList]);
        }
    }

    const handleRedo = () => {
        const item = dropList.find(i => i.id === prevItem.id);
        if (!item) {
            setDropList([...dropList, prevItem]);
        }
    }

    const renderEditItem = id => {
        const item = dropList.find(i => i.id === id);

        return item && <div className="edit-content" >
            <label htmlFor="text">
                { item.component === "elementParagraph" ? "paragraph text" : "button text"}
            </label>
            <input
                id="text"
                type="text"
                name= "text"
                onChange={(e) => handleEditChange(e, id) }
                ref={textRef}
            />

            {
                item.component === "elementButton" && <>
                    <label htmlFor="alert">alert message</label>
                    <input
                        type="text"
                        id="alert"
                        name= "message"
                        ref={alertRef}
                        onChange={(e) => handleEditChange(e, id) }
                    />
                </>
            }
        </div>
    }

    return (
        <div className="admin">
            <div className="admin__btns">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleUndo}>Undo</button>
                <button onClick={handleRedo}>Redo</button>
                <button onClick={handleUnavailabel} >Export</button>
                <button onClick={handleUnavailabel} >Import</button>
                <button onClick={handleRedirecToView}>View</button>
            </div>

            <div className="admin__dashboard">
                <div className="drag">
                    {
                        dragList.map(item => <DragItem
                            key={item.id}
                            getDraggingItemName={getDraggingItemName}
                            item={item}
                        />)
                    }
                </div>
                <div className="drop" ref={drop} onMouseMove={setMousePosition}>
                    <div className="drop-detail">
                        <p>Mouse: ({mouse.x}, {mouse.y})</p>
                        <p>Dragging: {draggingItemName}</p>
                        <p>Instances: { dropList.length }</p>
                        <p>Config: { JSON.stringify(dropList.find(i => i.id === currentItem))}</p>
                    </div>
                    
                    <div className="drop-content">
                        {
                            dropList.map(item => <DropItem
                                key={item.id}
                                item={item}
                                getCurrentItem={getCurrentItem}
                            />)
                        }
                    </div>
                </div>
                <div className="edit">
                    { currentItem && renderEditItem(currentItem)}
                </div>
            </div>
        </div>
    )
}

export default Admin;