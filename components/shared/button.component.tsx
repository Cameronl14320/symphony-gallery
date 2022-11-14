import styles from "./button.module.scss";

export const ButtonComponent = (props: { children?: any, style?: any, onClick?: (event: any) => void }) => {
    const { children, style, onClick } = props;

    return (
        <div className={styles.container} style={style} onClick={(event) => {
            if (onClick != null) onClick(event);
        }}>
            {children}
        </div>
    )
}

export default ButtonComponent;
