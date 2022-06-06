import React from "react"

const ParentRap = ({children}) => {
    return(
        <div>{children}</div>
    )
}

export default React.memo(ParentRap);