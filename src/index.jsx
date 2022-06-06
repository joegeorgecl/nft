import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Web3Provider from './store/Web3Provider';
import CollectionProvider from './store/CollectionProvider';
import MarketplaceProvider from './store/MarketplaceProvider';
import App from './App';
 
// ReactDOM.render(
// 	<BrowserRouter>
// 		<App />
// 	</BrowserRouter>,
//   document.getElementById('root')
// );

// reportWebVitals();


ReactDOM.render(
  <Web3Provider>
    <CollectionProvider>
      <MarketplaceProvider>
      <BrowserRouter>
      	<App />
      </BrowserRouter>
      </MarketplaceProvider>
    </CollectionProvider>
  </Web3Provider>, 
  document.getElementById('root')
);