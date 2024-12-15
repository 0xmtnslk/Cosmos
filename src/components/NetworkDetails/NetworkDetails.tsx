
import React from 'react';
import styles from './NetworkDetails.module.css';

interface NetworkDetailsProps {
  name: string;
  description: string;
}

const NetworkDetails: React.FC<NetworkDetailsProps> = ({ name, description }) => {
  return (
    <div className={styles.container}>
      <h1>{name}</h1>
      <p>{description}</p>
      <div className={styles.tools}>
        <h2>Tools</h2>
        <div className={styles.toolGrid}>
          <div className={styles.tool}>
            <h3>Snapshots</h3>
            <p>Network snapshots and synchronization data</p>
          </div>
          <div className={styles.tool}>
            <h3>Live Peers</h3>
            <p>Active peers are updated hourly</p>
          </div>
          <div className={styles.tool}>
            <h3>Faucet</h3>
            <p>Get testnet tokens</p>
          </div>
          <div className={styles.tool}>
            <h3>Public RPC</h3>
            <p>Access network endpoints</p>
          </div>
          <div className={styles.tool}>
            <h3>Addrbook</h3>
            <p>Active peers are updated hourly</p>
          </div>
          <div className={styles.tool}>
            <h3>Useful Tools</h3>
            <p>Additional network utilities</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkDetails;
