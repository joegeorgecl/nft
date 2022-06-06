import { useContext, useEffect , useState , useRef } from 'react';
import { useParams , useLocation } from "react-router-dom";
import moment from 'moment';
import Breadcumb from '../../components/Breadcumb'
import SEO from "../../components/Seo"
import Footer from "../../layouts/Footer"
import CollectionContext from '../../store/collection-context';
import MarketplaceContext from '../../store/marketplace-context';
import {formatPrice , cutAddress} from "../../utils"

import {
  check,
  explore5,
} from "../../utils/allImgs"

const ItemDetail = ({
  ClassFeature="",
  img,
  itemName="",
  itemVal=""
}) => (
  <div className="col-md-12">
    <div className="side-feature-list-item v2">
      <img draggable="false" src={img} className="check-mark-icon" alt="" />
      <div className="foot-c-info">{itemName}</div>
      <span className={ClassFeature}>{itemVal}</span>
    </div>
  </div>
)

const ItemDetailsContainer = () => {

  let { id } = useParams();
  const location = useLocation();
  const collectionCtx = useContext(CollectionContext);
  const marketplaceCtx = useContext(MarketplaceContext);
  const [widthImg , setWidthImg] = useState(0)
  const [heightImg , setHeightImg] = useState(0)

	const [price, setPrice] = useState(0);
	const [filteredItems, setFilteredItems] = useState(collectionCtx.collection);
  
	useEffect(() => {
    setFilteredItems(collectionCtx.collection.filter(item => item.id === parseInt(id)));	
	},[location , collectionCtx.collection , id]);

	useEffect(() => {
    const handleConter = () => {
      let item = collectionCtx.collection.filter(item => item?.id && item.id === parseInt(id));
      item.map((item , key) => item.count = item.count + 1)
      let oldItems = localStorage.getItem("handleConterItem") ? JSON.parse(localStorage.getItem("handleConterItem")) : []
      let newItemes = [...oldItems , item]
      window.localStorage.setItem("handleConterItem" , JSON.stringify(newItemes))
      
    }
    handleConter()

	},[id , collectionCtx.collection]);

	useEffect(() => {
    const handlePrice = async() => {
      const index = await marketplaceCtx.offers ? marketplaceCtx.offers.findIndex(offer => offer.id === parseInt(id)) : -1;
      setPrice(index !== -1 ? formatPrice(marketplaceCtx.offers[index].price).toFixed(2) : null)
    }
    handlePrice()
	},[location , id , marketplaceCtx.offers]);

  useEffect(() => {
      let imgMint = document.querySelector(".imgFilteredMint")
      if(imgMint !== null && imgMint !== undefined){
          let realWidth = imgMint.clientWidth;
          let realHeight = imgMint.clientHeight;
          setWidthImg(realWidth)
          setHeightImg(realHeight)
      }
  },[])
  const Address = useRef() 
  Address.current = cutAddress(filteredItems[0]?.addressOwner)
  const setHandelAddress = Address.current;

  const TimeAgo = useRef() 
  TimeAgo.current = moment(filteredItems[0]?.time ? filteredItems[0]?.time : new Date()).fromNow();
  const dateTimeAgo = TimeAgo.current;

  return (
    <>
      <SEO title="Nft marketplace" />
      <Breadcumb
        title="NFT Details"
        subTitle="NFT Details"
      />

      <section className="nft-details section-padding-100">
        <div className="container about-box bg-1 br-50 about-before">
          <div className="row">
            <div className="col-12 col-lg-5">
              <div className="welcome-meter box-shadow detailed-nft-img">

                {filteredItems[0]?.img ?
                <img loading="lazy" className='center-block imgFilteredMint' src={`https://ipfs.infura.io/ipfs/${filteredItems[0]?.img}`} alt="astronauta 1 NFT" />
                :
                <img loading="lazy" src={explore5} className="center-block imgFilteredMint" alt="" />
                }

              </div>
            </div>
            <div className="col-12 col-lg-6 mt-s">
              <div className="who-we-contant">
                <div className="dream-dots text-left">
                  <span className="v2">{filteredItems[0]?.category}</span>
                </div>
                <h4 className="bold" data-wow-delay="0.3s">{filteredItems[0]?.title}</h4>
                <p data-wow-delay="0.4s">{filteredItems[0]?.description}</p>
                <div className="list-wrap align-items-center">
                  <div className="row">

                    <ItemDetail
                      img={check}
                      itemName="Item Owner :"
                      itemVal={setHandelAddress}
                    />

                    <ItemDetail
                      img={check}
                      itemName="Item Category :"
                      itemVal={filteredItems[0]?.category}
                    />

                    <ItemDetail
                      img={check}
                      itemName="NFT Item Size :"
                      itemVal={`${widthImg} x ${heightImg}`}
                    />

                    <ItemDetail
                      img={check}
                      itemName="Creation Date :"
                      itemVal={dateTimeAgo}
                    />

                    <ItemDetail
                      img={check}
                      itemName="NFT Price :"
                      itemVal={price ? `${price} ETH` : "Item Price Not Set Yet!"}
                      ClassFeature="gradient-text"
                    />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ItemDetailsContainer;