import styles from '../styles/InputPublic.module.css';

function InputPublic({ label, type, name, id, onChange, value }) {
    
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

export function TextareaPublic({ rows, label, name, id, onChange, value }) {
    
    return (
        <div className={styles.inputCustom}>
            <label htmlFor={id}>
                {label}
            </label>
            <textarea rows={rows} id={id} name={name} placeholder={label} value={value} onChange={onChange}></textarea>
        </div>

    )
};

export function CheckboxPublic({ label, checked, name, id, onChange }) {
    
    return (
        <div className={styles.checkboxCustom}>
            <label htmlFor={id}>
                {label}
            </label>
            <input 
                className={styles.checkbox}
                id={id} 
                checked={checked}
                type="checkbox" 
                name={name} 
                placeholder={label} 
                onChange={onChange}></input>
        </div>

    )
};

export default InputPublic;