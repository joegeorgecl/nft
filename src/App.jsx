import React , { useEffect , useContext } from "react";
import {Helmet} from "react-helmet";
import { Switch, Route } from "react-router-dom";
import web3 from './connection/web3';
import Web3Context from './store/web3-context';
import CollectionContext from './store/collection-context';
import MarketplaceContext from './store/marketplace-context'
import NFTCollection from './abis/NFTCollection.json';
import NFTMarketplace from './abis/NFTMarketplace.json';
import ClaimFunds from "./components/ClaimFunds"
import MsgAlert from "./components/MsgAlert"
import Aos from 'aos'
import {
    ExploreNFTs,
    MyAssets,
    MainFaq,
    MintNFT,
    Home,
    ItemDetails,
    CategoryName
} from './pages'
import {
  iconsGift
} from "./utils/allImgs"

import Head from "./layouts/Head"
import 'aos/dist/aos.css';
import './assets/css/bootstrap.min.css'
// import './assets/css/main.css'
import "./assets/css/style.css"
import {loader} from "./utils"

import 'bootstrap/dist/js/bootstrap.bundle.min';

const App = () => {

  useEffect(() => {
    Aos.init({
      duration: 1000
      })
  },[])
 
  useEffect(() => {
    loader()
  },[])


  const web3Ctx = useContext(Web3Context);
  const collectionCtx = useContext(CollectionContext);
  const marketplaceCtx = useContext(MarketplaceContext);

  useEffect(() => {
    // Check if the user has Metamask active
    if(!web3) {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      return;
    }
    
    // Function to fetch all the blockchain data
    const loadBlockchainData = async() => {
      // Request accounts acccess if needed
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });  
      } catch(error) {
        console.error(error);
      }
      
      // Load account
      const account = await web3Ctx.loadAccount(web3);

      // Load Network ID
      const networkId = await web3Ctx.loadNetworkId(web3);

      // Load Contracts      
      const nftDeployedNetwork = NFTCollection.networks[networkId];
      const nftContract = collectionCtx.loadContract(web3, NFTCollection, nftDeployedNetwork);

      const mktDeployedNetwork = NFTMarketplace.networks[networkId];
      const mktContract = marketplaceCtx.loadContract(web3, NFTMarketplace, mktDeployedNetwork);

      if(nftContract) {        
        // Load total Supply
        const totalSupply = await collectionCtx.loadTotalSupply(nftContract);
        
        // Load Collection
        collectionCtx.loadCollection(nftContract, totalSupply);       

        // Event subscription
        nftContract.events.Transfer()
        .on('data', (event) => {
          collectionCtx.updateCollection(nftContract, event.returnValues.tokenId, event.returnValues.to);
          collectionCtx.setNftIsLoading(false);
        })
        .on('error', (error) => {
          console.log(error);
        });
        
      } else {
        document.getElementById("root").style.position = "relative"
        return <MsgAlert
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dictum risus, non suscipit arcu. Quisque aliquam posuere tortor, sit amet convallis nunc in."
                title="You Don't Own Any NFTs Yet!" />
      }

      if(mktContract) {
        // Load offer count
        const offerCount = await marketplaceCtx.loadOfferCount(mktContract);
        
        // Load offers
        marketplaceCtx.loadOffers(mktContract, offerCount); 
        
        // Load User Funds
        account && marketplaceCtx.loadUserFunds(mktContract, account);

        // Event OfferFilled subscription 
        mktContract.events.OfferFilled()
        .on('data', (event) => {
          marketplaceCtx.updateOffer(event.returnValues.offerId);
          collectionCtx.updateOwner(event.returnValues.id, event.returnValues.newOwner);
          marketplaceCtx.setMktIsLoading(false);
        })
        .on('error', (error) => {
          console.log(error);
        });

        // Event Offer subscription 
        mktContract.events.Offer()
        .on('data', (event) => {
          marketplaceCtx.addOffer(event.returnValues);
          marketplaceCtx.setMktIsLoading(false);
        })
        .on('error', (error) => {
          console.log(error);
        });

        // Event offerCancelled subscription 
        mktContract.events.OfferCancelled()
        .on('data', (event) => {
          marketplaceCtx.updateOffer(event.returnValues.offerId);
          collectionCtx.updateOwner(event.returnValues.id, event.returnValues.owner);
          marketplaceCtx.setMktIsLoading(false);
        })
        .on('error', (error) => {
          console.log(error);
        });
        
      } else {
        document.getElementById("root").style.position = "relative"
        return <MsgAlert
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis at dictum risus, non suscipit arcu. Quisque aliquam posuere tortor, sit amet convallis nunc in."
                title="You Don't Own Any NFTs Yet!" />
      }

      collectionCtx.setNftIsLoading(false);
      marketplaceCtx.setMktIsLoading(false);

      // Metamask Event Subscription - Account changed
      window.ethereum.on('accountsChanged', (accounts) => {
        web3Ctx.loadAccount(web3);
        accounts[0] && marketplaceCtx.loadUserFunds(mktContract, accounts[0]);
      });

      // Metamask Event Subscription - Network changed
      window.ethereum.on('chainChanged', (chainId) => {
        window.location.reload();
      });
    };
    
    loadBlockchainData();
  }, []);

  const showHead = web3 && collectionCtx.contract && marketplaceCtx.contract;
  
  useEffect(() => {
    if(!showHead) {
      document.getElementById("root").style.position = "relative"
    }else{
      document.getElementById("root").style.position = ""
    }

  },[showHead])

  useEffect(() => {
    document.querySelector("body").classList.add("light-version")
  },[])

  return (
    
    	<div className="App">
        <Helmet>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <title>
            NFT Marketplace
          </title>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
          <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
        </Helmet>
        <div id="preloader">
          <div className="preload-content">
              <div id="dream-load"></div>
          </div>
        </div>
        <Head />
        <>
          <div className={`showHead ${!showHead && "hideFormMint"}`}>
            <div className="MsgAlert_showHead">
              {!showHead && <MsgAlert 
                text="The Smart Contract is not Deployed to the Detected Network, Please set your Metamask Wallet to Reposten Network and Reload the page"
                title="Contract is not deployed to detected network." /> }
            </div>
          </div>
        </>
        {marketplaceCtx.userFunds > 0 && <ClaimFunds img={iconsGift} />}
  			<Switch>
          <Route path="/" exact component={Home} />
  				<Route path="/explore" component={ExploreNFTs} />
  				<Route path="/my-assets" component={MyAssets} />
          <Route path="/faq" component={MainFaq} />
          <Route path="/mint" component={MintNFT} />
          <Route path="/item-details/:id" component={ItemDetails} />
  				<Route path="/category-name/:categ" component={CategoryName} />
  			</Switch>
	    </div>
    	
    
  );
}

export default App;