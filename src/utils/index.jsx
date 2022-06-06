import $ from 'jquery';
import dataOwnerImgs from '../data/data-containers/ownerImgs.js'

function onloadAnimation() {
    document.querySelectorAll('img').forEach((img, index) => {
      if (img.getBoundingClientRect().top < window.innerHeight) {
        img.src = img.getAttribute('data-src')
      }
    })
  }

const DECIMALS = (10**18);

const ether = wei => wei / DECIMALS;

const formatPrice = (price) => {
  const precision = 100; // Use 2 decimal places

  price = ether(price);
  price = Math.round(price * precision) / precision;
   
  return price;
};

function navExpander(){
  var headerArea = $('.header-area');
  if(headerArea){
    $(window).on('scroll', function () {
        if ($(window).scrollTop() > 0) {
            $('.header-area').addClass('sticky');
        } else {
            $('.header-area').removeClass('sticky');
        }
    });
  }
}

const handelHumbergerMenu = () => {
  //Humberger Menu
  $(".classy-navbar-toggler").on('click', function () {
      $(".classy-navbar .classy-menu").addClass("menu-on");
      $(".navbarToggler").addClass("active");
  })

  $(".classycloseIcon").on('click', function () {
      $(".classy-navbar .classy-menu").removeClass("menu-on");
      $(".navbarToggler").removeClass("active");
  });
}

function Addshrink() {
    let RelBanner = document.querySelector('#banner');

    window.addEventListener("scroll", e => {
        if(window.pageYOffset > 86){
          RelBanner.classList.add("shrink");
        }else
        {
            RelBanner.classList.remove("shrink");
        }
    });
}

function loader() {
  $(window).on('load', function () {
      $('#preloader').fadeOut('1000', function () {
          $(this).remove();
      });
  });
}

function cutAddress(Address) {
  let setHandelAddress = "";
  if(Address){
    let AddressEnd , AddressFull, AddressLeft , AddressRight;
    AddressFull = Address;
    AddressLeft = AddressFull?.slice(0,5);
    AddressRight = AddressFull?.slice(20 , -17);
    AddressEnd = `${AddressLeft}...${AddressRight}`
    setHandelAddress = AddressEnd
  }

  return setHandelAddress
}

function handleRandomImg(setRandomOwnerImg) {
  let randomImg = Math.floor(Math.random() * 10)
  setRandomOwnerImg(dataOwnerImgs[randomImg])
}


const makeOfferHandler = (event, id, key , web3 , priceRefs , account , marketplaceCtx , collectionCtx) => {
  event.preventDefault();

  const enteredPrice = web3?.utils?.toWei(priceRefs?.current[key]?.current?.value, 'ether');

  collectionCtx?.contract?.methods?.approve(marketplaceCtx?.contract?.options?.address, id).send({ from: account })
  .on('transactionHash', (hash) => {
    marketplaceCtx?.setMktIsLoading(true);
  })
  .on('receipt', (receipt) => {      
    marketplaceCtx?.contract?.methods?.makeOffer(id, enteredPrice).send({ from: account })
    .on('error', (error) => {
      window.alert('Something went wrong when pushing to the blockchain');
      marketplaceCtx?.setMktIsLoading(false);
    }); 
  });
};


const buyHandler = (event , marketplaceCtx , account) => {

  event.preventDefault();

  const buyIndex = parseInt(event?.target?.value);
  marketplaceCtx?.contract?.methods?.fillOffer(marketplaceCtx?.offers[buyIndex]?.offerId).send({ from: account, value: marketplaceCtx?.offers[buyIndex]?.price })
  .on('transactionHash', (hash) => {
    marketplaceCtx?.setMktIsLoading(true);
  })
  .on('error', (error) => {
    window.alert('Something went wrong when pushing to the blockchain');
    marketplaceCtx?.setMktIsLoading(false);
  });            
};

const cancelHandler = (event , marketplaceCtx , account) => {

  event.preventDefault();

  const cancelIndex = parseInt(event?.target?.value);
  marketplaceCtx?.contract?.methods?.cancelOffer(marketplaceCtx?.offers[cancelIndex]?.offerId).send({ from: account })
  .on('transactionHash', (hash) => {
    marketplaceCtx?.setMktIsLoading(true);
  })
  .on('error', (error) => {
    window.alert('Something went wrong when pushing to the blockchain');
    marketplaceCtx?.setMktIsLoading(false);
  });    
};

export {
    Addshrink,
    loader,
    DECIMALS,
    ether,
    formatPrice,
    cutAddress,
    handleRandomImg,
    makeOfferHandler,
    buyHandler,
    cancelHandler,
    onloadAnimation,
    navExpander,
    handelHumbergerMenu
};
