const Emoji = (props) => (
    <>
        <style jsx>{`
            .emoji {
                font-size: ${props.size};
                margin: 10px;
            }
        `}</style>
        <span
            className="emoji"
            role="img"
            aria-label={props.label ? props.label : ""}
            aria-hidden={props.label ? "false" : "true"}
        >
            {String.fromCodePoint(props.symbol)}
        </span>
    </>
);
export default Emoji;
