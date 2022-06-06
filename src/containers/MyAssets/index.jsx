import {useState , useContext , useEffect , useRef , createRef} from "react"
import { Link } from "react-router-dom";
import MarketplaceContext from '../../store/marketplace-context';
import {formatPrice , cutAddress , makeOfferHandler , buyHandler , cancelHandler} from "../../utils"
import PreloaderMintItem from "../../components/PreloaderMintItem"
import ItemsNotFound from "../../components/ItemsNotFound"
import web3 from '../../connection/web3';
import Web3Context from '../../store/web3-context';
import OperSec from "../../components/OperSec"
import Img from "../../components/Img"
import SecHead from "../../components/SecHead"
import {
  explore5,
  iconsH1,
  iconsH2
} from "../../utils/allImgs"
import SEO from "../../components/Seo"
import CollectionContext from '../../store/collection-context';
import Footer from "../../layouts/Footer"
import MsgAlert from "../../components/MsgAlert"
import Breadcumb from '../../components/Breadcumb'


const MyAssetsContainer = () => {

  const collectionCtx = useContext(CollectionContext);
  const marketplaceCtx = useContext(MarketplaceContext);
  const web3Ctx = useContext(Web3Context);

  const [collection , setCollection] = useState(collectionCtx.collection)
  const [isHaveItems , setIsHaveItems] = useState(true)
  const [account , setAccount] = useState(web3Ctx.account)
  
  useEffect(() => {
    const hanldeCollection = async () => {
      let items = await collectionCtx.collection
      setCollection(items)
    }
    hanldeCollection()
  },[collectionCtx.collection , account])

  useEffect(() => {
    const handleAccount = async ()=>{
      await setAccount(web3Ctx.account)
    }
    handleAccount()
  },[web3Ctx.account])

  useEffect(() => {
    collectionCtx.collection.every((currentValue) => currentValue.addressOwner !== account) ? setIsHaveItems(false) : setIsHaveItems(true)
  },[collection , account , collectionCtx.collection])

  const priceRefs = useRef([]);
  if (priceRefs.current.length !== collectionCtx.collection.length) {
    priceRefs.current = Array(collectionCtx.collection.length).fill().map((_, i) => priceRefs.current[i] || createRef());
  }

  return (
    <>
      <SEO title="My assets" />
      <Breadcumb
        title="My Assets"
        subTitle="My Assets"
      />
      <section className="nft-section section-padding-100">
        <div className="container about-box bg-3 br-50 about-before v2">
          
          <SecHead
            titleClass="v2"
            title="MY Owned NFTs"
            SubTitleClass="text-dark"
            textClass="text-secondary"
            SubTitle="My NFT Assets"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis accumsan nisi Ut ut felis congue nisl hendrerit commodo."
          />

          <div className="row" id="myTabContent">

          {collectionCtx.collection.length !== 0 ? !marketplaceCtx.mktIsLoading ? isHaveItems ? collection.slice(0,3).map((item , key) => {
            let setAddressOwner = cutAddress(item.addressOwner)
            const index = marketplaceCtx.offers ? marketplaceCtx.offers.findIndex(offer => offer.id === item.id) : -1;
            const price = index !== -1 ? formatPrice(marketplaceCtx.offers[index].price).toFixed(2) : null;
              return(
                <>
                  {item.addressOwner === account ?
                    <div className="col-12 col-sm-6 col-lg-3">
                      
                      
                        <div className="nft-item ">
                          <div className="nft-cat">{item.category}</div>
                          <Link to={`/item-details/${item.id}`} className="image-wrapper">
                            {item.img ? <Img img={`https://ipfs.infura.io/ipfs/${item.img}`} /> : <Img img={explore5} />}
                          </Link>
                          <div className="nft-title">
                            <h4>{item.title}</h4>
                          </div>
                          
                          <div className="nft-price">
                              <div className="inner-price d-flex align-items-center">
                                  <Img img={iconsH1} />
                                  <h5>Owner : <span className="gradient-text">{setAddressOwner}</span></h5>
                              </div>
                          </div>

                          <div className="nft-price">
                              <div className="inner-price d-flex align-items-center">
                                  <Img img={iconsH2} />
                                  <h5>Price : <span className="gradient-text">{price} ETH</span></h5>
                              </div>
                          </div>

                          {index !== -1 ?
                            item.addressOwner !== account ?
                              <OperSec
                                price={price}
                                index={index}
                                buyHandler={(event) => buyHandler(event , marketplaceCtx , account)}
                                nameOper="Buy Item"
                                ClassBtn="btn dream-btn"
                              />
                              :
                              <OperSec
                                price={price}
                                index={index}
                                buyHandler={(event) => cancelHandler(event , marketplaceCtx , account)}
                                ClassBtn=" readon w-100 hover-shape VIEW_Projects_Btn buttonWrapperPaddCANCEL bg-danger border border-danger"
                                nameOper="CANCEL"
                              />
                              :
                            item.addressOwner === account ? (
                              <form className="row card__info card__infoPadd" onSubmit={(e) => makeOfferHandler(e, item.id, key , web3 , priceRefs , account , marketplaceCtx , collectionCtx)}>
                                <div className="col-5 d-grid gap-2">
                                  <button type="submit" className="btn card__infoForm-control">OFFER</button>
                                </div>
                                <div className="col-7">
                                  <input
                                    type="number"
                                    step="0.01"
                                    placeholder="ETH..."
                                    className="form-control w-48p"
                                    ref={priceRefs.current[key]}
                                  />
                                </div>                                  
                              </form>
                            )
                          : <span className="waver_wrapper">
                              Owner does not put a price!
                            </span> }
                        </div>
                      
                    </div>
                  : <ItemsNotFound /> }
                </>
              )}) : <MsgAlert
                      title="No Items Listed for Sale"
                      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dictum risus, non suscipit arcu. Quisque aliquam posuere tortor, sit amet convallis nunc in."
                    /> : Array(8).fill().map((_i, key) => <PreloaderMintItem key={key} />) : <MsgAlert
                                                                                              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dictum risus, non suscipit arcu. Quisque aliquam posuere tortor, sit amet convallis nunc in."
                                                                                              title="You Don't Own Any NFTs Yet!" />}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default MyAssetsContainer;