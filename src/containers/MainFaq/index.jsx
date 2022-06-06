import Breadcumb from '../../components/Breadcumb'
import SEO from "../../components/Seo"
import data from '../../data/data-containers/data-Home'
import Footer from "../../layouts/Footer"
import Faq from "../../components/Faq"

import {
	faqImg
} from "../../utils/allImgs"

const MainFaqContainer = () => {

  return (
    <>
      <SEO title="Nft marketplace" />
      <Breadcumb
        title="FAQ"
        subTitle="FAQ"
      />
      <Faq data={data[0]?.Faq} img={faqImg} />
      <Footer />
    </>
  );
}

export default MainFaqContainer;
