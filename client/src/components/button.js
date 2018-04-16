import React from 'react';


export default ({btnClass, icon, label, material, style, type, disabled, onClick}) => {
    return <button 
                disabled={!!disabled}
                onClick={onClick}
                style={style}
                type={type || "button"} 
                className={`btn btn-labeled btn-${btnClass || 'default'}`}>
        {icon && <span className="btn-label">
            {material ?
                <i className="material-icons">{icon}</i> :
                <i className={icon}></i>}
        </span>}
        {label}
    </button>
};