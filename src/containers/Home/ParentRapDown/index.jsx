import React from "react"
import Faq from "../../../components/Faq"
import Footer from "../../../layouts/Footer"

const ParentRapDown = ({allData , img}) => {
    return(
        <>
            <Faq data={allData[0]?.Faq} img={img} />
            <Footer />
        </>
    )
}

export default React.memo(ParentRapDown);