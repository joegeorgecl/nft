import { useContext, useState , useEffect } from 'react';
import CollectionContext from '../../store/collection-context';
import Web3Context from '../../store/web3-context';
import MarketplaceContext from '../../store/marketplace-context';
import web3 from '../../connection/web3';
import { NavLink } from "react-router-dom";
import data from '../../data/data-layouts/data-Head.json'
import {cutAddress , handleRandomImg , navExpander , handelHumbergerMenu} from '../../utils'

function Head(){
  const [randomOwnerImg , setRandomOwnerImg] = useState("")
  const [handelAddress , setHandelAddress] = useState("")
  
  const web3Ctx = useContext(Web3Context);
  const marketplaceCtx = useContext(MarketplaceContext);
  const collectionCtx = useContext(CollectionContext);

  useEffect(() => {
      handleRandomImg(setRandomOwnerImg)
  },[])

  useEffect(() => {
    web3Ctx.account && setHandelAddress(cutAddress(web3Ctx.account))
    
  },[web3Ctx.account])
  
  const connectWalletHandler = async() => {
    try {
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch(error) {
      console.error(error);
    }

    // Load accounts
    web3Ctx.loadAccount(web3);
  };

  // Event ClaimFunds subscription 
  marketplaceCtx?.contract?.events?.ClaimFunds()
  .on('data', (event) => {
    marketplaceCtx.loadUserFunds(marketplaceCtx.contract, web3Ctx.account);
  })
  .on('error', (error) => {
    console.log(error);
  });

  let etherscanUrl;

  if(web3Ctx.networkId === 3) {
    etherscanUrl = 'https://ropsten.etherscan.io'
  } else if(web3Ctx.networkId === 4) {
    etherscanUrl = 'https://rinkeby.etherscan.io'
  } else if(web3Ctx.networkId === 5) {
    etherscanUrl = 'https://goerli.etherscan.io'
  } else {
    etherscanUrl = 'https://etherscan.io'
  }

  const showHead = web3 && collectionCtx.contract && marketplaceCtx.contract;

  useEffect(() => {
    navExpander()
  },[])

  useEffect(() => {
    handelHumbergerMenu()
  }, []);

  return(
    <header className="header-area wow fadeInDown" data-wow-delay="0.2s">
      <div className="light classy-nav-container breakpoint-off">
        <div className="container">
          {/* Classy Menu */}
          <nav className="classy-navbar justify-content-between" id="dreamNav">
            {/* Logo */}
            <a className="nav-brand" href="/#">NFT STORE.</a>
            {/* Navbar Toggler */}
            <div className="classy-navbar-toggler">
              <span className="navbarToggler">
                {Array(3).fill().map((_i ,key) => <span />)}
              </span>
            </div>
            {/* Menu */}
            <div className="classy-menu">
              {/* close btn */}
              <div className="classycloseIcon">
                <div className="cross-wrap"><span className="top" /><span className="bottom" /></div>
              </div>
              {/* Nav Start */}
              <div className="classynav">
                <ul id="nav">
                  {data[0]?.menuLinks.map((item , key) => (
                    <li key={key}><NavLink to={item.path}>{item.title}</NavLink></li>
                  ))}
                </ul>
                {/* Button */}

                {web3Ctx.account && showHead ?
                  <>
                    <div className="bxAddress d-flex">
                      <div>
                          <img className="mt-2" src={randomOwnerImg} width="40" alt="" />
                      </div>
                      <a 
                          className="nav-link small pt-3 pl-2" 
                          href={`${etherscanUrl}/address/${web3Ctx.account}`}
                          target="blank"
                          rel="noopener noreferrer"
                      >
                          {handelAddress}
                      </a>
                    </div>
                  </>
                  :
                  <button
                    onClick={connectWalletHandler}
                    type="button"
                    className="btn login-btn ml-50"
                  >
                    Connect Wallet
                  </button>
                }
              </div>
              {/* Nav End */}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Head