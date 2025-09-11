import styles from '../styles/Input.module.css';

function Input({ label, type, name, id, onChange, value }) {
    
    return (
        <div className={styles.inputCustom}>
            <label htmlFor={id}>
                {label}
            </label>
            <input 
                id={id} 
                type={type} 
                name={name} 
                placeholder={label} 
                value={value} onChange={onChange}></input>
        </div>

    )
};

export default Input;