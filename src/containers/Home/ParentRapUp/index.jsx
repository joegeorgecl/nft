import React from "react"
import BannerSec from "../BannerSec"
import OurMentors from "../OurMentors"
import HowToParticipateSect from "../How_to_Participate_Sect"
import HowItWorks from "../HowItWorks"

const ParentRapUp = ({allData , img}) => {
    return(
        <>
            
            <BannerSec />
            <OurMentors data={allData[0]?.OurMentors} />
            
            <HowToParticipateSect img={img} data={allData[0]?.How_to_Participate_Sect} />

            <HowItWorks data={allData[0]?.HowItWorks} />
        </>
    )
}

export default React.memo(ParentRapUp);