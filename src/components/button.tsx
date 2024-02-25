import React from 'react';

interface Props {
    css: string,
    children: any,
    onClick?: () => void,
}

function Button({ css, children, onClick }: Props) {
    return (
        <button className={`text-black-400 py-3 px-3 cursor-default ${css}`} onClick={onClick}>{children}</button>
    )
}

export default Button