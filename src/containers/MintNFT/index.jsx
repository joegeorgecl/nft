import { useContext , useState , useEffect } from 'react';
import Breadcumb from '../../components/Breadcumb'
import MsgAlert from '../../components/MsgAlert'
import Footer from "../../layouts/Footer"
import { mainMintImg } from "../../utils/allImgs"
import data from '../../data/data-containers/data-MintForm.json'
import SEO from "../../components/Seo"
import CollectionContext from '../../store/collection-context';
import Web3Context from '../../store/web3-context';

const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient.create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

const MintNFTContainer = () => {

  const [enteredName, setEnteredName] = useState('');
  const [descriptionIsValid, setDescriptionIsValid] = useState(true);
  const [handleAddSucMsg, setHandleAddSucMsg] = useState(false);

  const [enteredDescription, setEnteredDescription] = useState('');
  const [nameIsValid, setNameIsValid] = useState(true);

  const [capturedFileBuffer, setCapturedFileBuffer] = useState(null);
  const [fileIsValid, setFileIsValid] = useState(true);

  const [category, setCategory] = useState('');
  const [secImgItem, setSecImgItem] = useState('');

  const web3Ctx = useContext(Web3Context);
  const collectionCtx = useContext(CollectionContext);

  const enteredNameHandler = (event) => {
    setEnteredName(event.target.value);
  };

  const enteredDescriptionHandler = (event) => {
    setEnteredDescription(event.target.value);
  };
  
  const captureFile = (event) => {
    event.preventDefault();

    const file = event.target.files[0];

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = async () => {
      setCapturedFileBuffer(Buffer(reader.result));
      
      const fileAdded = await ipfs.add(Buffer(reader.result));
      if(!fileAdded) {
        console.error('Something went wrong when updloading the file');
        return;
      }

      setSecImgItem(fileAdded.path)
    }
  };

  const handelCategory = (e) => {
    let val = e.target.value;
    e.preventDefault();
    if(val){
      setCategory(val)
    }
  }
  
  const submissionHandler = (event) => {
    event.preventDefault();

    enteredName ? setNameIsValid(true) : setNameIsValid(false);
    enteredDescription ? setDescriptionIsValid(true) : setDescriptionIsValid(false);
    capturedFileBuffer ? setFileIsValid(true) : setFileIsValid(false);

    const formIsValid = enteredName && enteredDescription && capturedFileBuffer;

    // Upload file to IPFS and push to the blockchain
    const mintNFT = async() => {
      // Add file to the IPFS
      const fileAdded = await ipfs.add(capturedFileBuffer);
      if(!fileAdded) {
        console.error('Something went wrong when updloading the file');
        return;
      }

      const metadata = {
        title: "Asset Metadata",
        type: "object",
        properties: {
          name: {
            type: "string",
            description: enteredName
          },
          description: {
            type: "string",
            description: enteredDescription,
            date:new Date(),
            count:0,
            addressOwner:web3Ctx.account
          },
          category:{
            type: "string",
            category: category
          },
          image: {
            type: "string",
            description: fileAdded.path
          }
        }
      };

      const metadataAdded = await ipfs.add(JSON.stringify(metadata));
      if(!metadataAdded) {
        console.error('Something went wrong when updloading the file');
        return;
      }
      
      collectionCtx.contract.methods.safeMint(metadataAdded.path).send({ from: web3Ctx.account })
      .on('transactionHash', (hash) => {
        collectionCtx.setNftIsLoading(true);
      })
      .on("receipt" , () => {
        setHandleAddSucMsg(true)
      })
      .on('error', (e) =>{
        window.alert('Something went wrong when pushing to the blockchain');
        collectionCtx.setNftIsLoading(false);  
      })      
    };
    formIsValid && mintNFT();
  };

  const nameClass = nameIsValid? "form-control" : "form-control is-invalid";
  const descriptionClass = descriptionIsValid? "form-control" : "form-control is-invalid";
  const fileClass = fileIsValid? "form-control" : "form-control is-invalid";
  
  useEffect(() => {

    if(handleAddSucMsg){
      document.getElementById("root").style.position = "relative"
      setTimeout(() => {
        window.location.href = "/explore"
      },3000)
    }
  },[handleAddSucMsg])

  return (
    <>
      <SEO title="Mint NFT" />
      <Breadcumb
        title="Mint NFT"
        subTitle="Mint NFT"
      />

      <section className="about-us-area section-padding-100">
        <div className="container about-box bg-1 br-50 about-before">
          <div className="row align-items-center">
            <div className="col-12 col-lg-6">
              <div className="welcome-meter mint-img-wapper" data-wow-delay="0.7s">
                {secImgItem ?
                  <img className="center-block" loading="lazy" src={`https://ipfs.infura.io/ipfs/${secImgItem}`} alt="" />
                  :
                  <img className="center-block" loading="lazy" src={mainMintImg} alt="" />
                }
              </div>
            </div>
            <div className="col-12 col-lg-6">
              <div className="mint-form">
                <form action="#" method="post" onSubmit={submissionHandler} id="main_contact_form" noValidate>
                  <div className="row">
                    <div className="col-12">
                      <div id="success_fail_info" />
                    </div>
                    <div className="col-12 col-md-12">
                      <div className="file file--upload">
                        <label htmlFor="input-file">
                          <i className="fa fa-cloud-upload ml-3" />Upload
                        </label>
                        <input id="input-file" type="file" required onChange={captureFile} className={`inputFile ${fileClass}`} />
                      </div>
                    </div>
                    <div className="col-12 col-md-12">
                      <div className="group">
                        <input type="text" name="name" id="name" required onChange={enteredNameHandler} value={enteredName} className={nameClass} />
                        <span className="highlight" />
                        <span className="bar" />
                        <label>NFT item Name</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="group">
                        <textarea name="Description" id="Description" rows={2} required className={`${descriptionClass}`} value={enteredDescription} onChange={enteredDescriptionHandler} />
                        <span className="highlight" />
                        <span className="bar" />
                        <label>Item Description</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="group">
                        <select id="cars" required onClick={(e) => handelCategory(e)} name="cars">
                          
                          {data[0]?.bestArtists__header?.nftCategory.map((item , key) => (
                            <option key={key} value={item.val} name={item.val}>{item.text}</option>
                          ))}

                        </select>
                        <span className="highlight" />
                        <span className="bar" />
                      </div>
                    </div>
                    <div className="col-12 text-center">
                      <button type="submit" className="btn dream-btn">Mint NFT</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {handleAddSucMsg && (
        <div className='msgBx'>
          <div className='row'>
            <MsgAlert
              title="Congratulations"
              text="NFT Item Minted"
            />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

export default MintNFTContainer;