import "./styles.scss";

const DropItem = ({ item, getCurrentItem }) => {
    const { id, component, props } = item;

    return <div className="drop-item">
        {
            component === "elementParagraph" ?
            <p onClick={() => getCurrentItem(id)} >
                {props.text || "paragraph"}
            </p>
            :
            <button onClick={() => getCurrentItem(id)} >
                {props.text || "button"}
            </button>
        }
    </div>
}

export default DropItem;