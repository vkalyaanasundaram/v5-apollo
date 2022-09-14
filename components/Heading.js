import React from 'react';

export default function Heading({level = 'h1',
children,
className,}) {
    return (
        <h3 className={className}>{children}</h3>
    )
}