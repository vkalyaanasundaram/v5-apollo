import React from 'react';

export default function Heading({level = 'h1',
children,
className,}) {
    return (
        <div className={className}>{children}</div>
    )
}