import { useDrag } from "react-dnd";
import "./styles.scss";

const DragItem = ({ item, getDraggingItemName }) => {
    const { id, component } = item;

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "element",
        item: { id: id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));

    return <div
            className="drap-item-wrapper"
            onDragStart={() => getDraggingItemName(component)}
            onDragEnd={() => getDraggingItemName("")}
            ref={drag}
            style={{ border: isDragging ? "1px solid #ddd" : "0px" }}
        >
        <div className="square"></div>
        <p>{ component === "elementParagraph" ? "paragraph" : "button" }</p>
    </div>;

}

export default DragItem;