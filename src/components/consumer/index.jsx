import { useContext } from "react";
import { Link } from "react-router-dom";
import { DragDropContext } from "../../context/drag-drop.context";
import "./styles.scss";

const Consumer = () => {
    const { consumerDrop, setConsumerDrop } = useContext(DragDropContext);
    console.log(consumerDrop);
    
    const clearConsumerDrop = () => setConsumerDrop([]);

    const renderConsumerItem = ({
        id,
        component,
        props: { text, message }
    }) => <div key={id} className="consumer-item">
        {
            component === "elementParagraph" ?
                <p>{ text || "paragraph"}</p> :
                <button onClick={() => alert(message || "message was unset")}>
                    {text || "button"}
                </button>
        }
    </div>

    return <div className="consumer">
        <div className="consumer__func">
            <Link className="consumer__goback" to="/admin">← Back to admin</Link>
            <p className="consumer__clear" onClick={clearConsumerDrop}>✖ Clear</p>
        </div>
        <p className="consumer__heading">Consumer</p>
        {
            consumerDrop.length > 0 ?
                consumerDrop.map(item => renderConsumerItem(item))
                : <p className="consumer__empty-message">
                    Consumer drop is empty, go <Link to="/admin">add some</Link> now :D
                </p>
        }
    </div>
}

export default Consumer;