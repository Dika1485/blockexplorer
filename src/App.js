import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import './App.css';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [currentBlock, setCurrentBlock] = useState(null);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [view, setView] = useState('blocks'); // 'blocks', 'block', 'transaction'
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Get the latest block number
  useEffect(() => {
    async function getBlockNumber() {
      const number = await alchemy.core.getBlockNumber();
      setBlockNumber(number);
    }
    getBlockNumber();
  }, []);

  // Load block details
  const loadBlock = async (blockNumberOrHash) => {
    setIsLoading(true);
    try {
      const block = await alchemy.core.getBlockWithTransactions(blockNumberOrHash);
      setCurrentBlock(block);
      setView('block');
    } catch (error) {
      console.error('Error loading block:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load transaction details
  const loadTransaction = async (txHash) => {
    setIsLoading(true);
    try {
      const tx = await alchemy.core.getTransactionReceipt(txHash);
      setSelectedTransaction(tx);
      setView('transaction');
    } catch (error) {
      console.error('Error loading transaction:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get balance for an address
  const getBalance = async () => {
    if (!address) return;
    setIsLoading(true);
    try {
      const bal = await alchemy.core.getBalance(address);
      setBalance(bal.toString());
      setView('account');
    } catch (error) {
      console.error('Error getting balance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Format timestamp to readable date
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  // Convert wei to ether
  const weiToEther = (wei) => {
    return parseFloat(wei) / 1e18;
  };

  // Navigation functions
  const goToBlocks = () => {
    setView('blocks');
    setCurrentBlock(null);
    setSelectedTransaction(null);
  };

  const goToAccountPage = () => {
    setView('account');
    setBalance(null);
    setAddress('');
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Ethereum Block Explorer</h1>
        <div className="nav-buttons">
          <button onClick={goToBlocks}>Latest Blocks</button>
          <button onClick={goToAccountPage}>Account Balance</button>
        </div>
      </header>

      <main>
        {isLoading && <div className="loading">Loading...</div>}

        {view === 'blocks' && (
          <div className="blocks-view">
            <h2>Current Block Number: {blockNumber}</h2>
            <button onClick={() => loadBlock(blockNumber)} className="block-button">
              View Latest Block
            </button>
            <div className="recent-blocks">
              <h3>Recent Blocks</h3>
              {blockNumber && (
                <div className="block-list">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="block-item" onClick={() => loadBlock(blockNumber - i)}>
                      Block #{blockNumber - i}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {view === 'block' && currentBlock && (
          <div className="block-details">
            <button onClick={goToBlocks} className="back-button">
              ← Back to blocks
            </button>
            <h2>Block #{currentBlock.number}</h2>
            <div className="block-info">
              <p><strong>Hash:</strong> {currentBlock.hash}</p>
              <p><strong>Timestamp:</strong> {formatTimestamp(currentBlock.timestamp)}</p>
              <p><strong>Transactions:</strong> {currentBlock.transactions.length}</p>
              <p><strong>Miner:</strong> {currentBlock.miner}</p>
              <p><strong>Difficulty:</strong> {currentBlock.difficulty}</p>
              <p><strong>Gas Used:</strong> {currentBlock.gasUsed.toString()}</p>
              <p><strong>Gas Limit:</strong> {currentBlock.gasLimit.toString()}</p>
            </div>

            <h3>Transactions</h3>
            <div className="transaction-list">
              {currentBlock.transactions.slice(0, 50).map((tx) => (
                <div
                  key={tx.hash}
                  className="transaction-item"
                  onClick={() => loadTransaction(tx.hash)}
                >
                  <p><strong>Hash:</strong> {tx.hash.substring(0, 20)}...</p>
                  <p><strong>From:</strong> {tx.from.substring(0, 10)}...</p>
                  <p><strong>To:</strong> {tx.to ? tx.to.substring(0, 10) + '...' : 'Contract Creation'}</p>
                  <p><strong>Value:</strong> {weiToEther(tx.value.toString())} ETH</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {view === 'transaction' && selectedTransaction && (
          <div className="transaction-details">
            <button onClick={() => setView('block')} className="back-button">
              ← Back to block
            </button>
            <h2>Transaction Details</h2>
            <div className="transaction-info">
              <p><strong>Hash:</strong> {selectedTransaction.transactionHash}</p>
              <p><strong>Block Number:</strong> {selectedTransaction.blockNumber}</p>
              <p><strong>From:</strong> {selectedTransaction.from}</p>
              <p><strong>To:</strong> {selectedTransaction.to || 'Contract Creation'}</p>
              <p><strong>Value:</strong> {weiToEther(selectedTransaction.value || '0')} ETH</p>
              <p><strong>Gas Used:</strong> {selectedTransaction.gasUsed.toString()}</p>
              <p><strong>Status:</strong> {selectedTransaction.status === 1 ? 'Success' : 'Failed'}</p>
              <p><strong>Contract Address:</strong> {selectedTransaction.contractAddress || 'N/A'}</p>
              <p><strong>Logs:</strong> {selectedTransaction.logs.length}</p>
            </div>
          </div>
        )}

        {view === 'account' && (
          <div className="account-view">
            <button onClick={goToBlocks} className="back-button">
              ← Back to blocks
            </button>
            <h2>Account Balance</h2>
            <div className="balance-form">
              <input
                type="text"
                placeholder="Enter Ethereum address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <button onClick={getBalance}>Get Balance</button>
            </div>
            {balance && (
              <div className="balance-result">
                <h3>Balance for {address.substring(0, 10)}...</h3>
                <p><strong>ETH:</strong> {weiToEther(balance)}</p>
                <p><strong>Wei:</strong> {balance}</p>
              </div>
            )}
          </div>
        )}
      </main>

      <footer>
        <p>Powered by Alchemy</p>
      </footer>
    </div>
  );
}

export default App;