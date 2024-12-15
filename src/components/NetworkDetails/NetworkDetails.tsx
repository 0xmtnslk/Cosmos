
import React from 'react';
import styles from './NetworkDetails.module.css';

interface NetworkDetailsProps {
  name: string;
  description: string;
}

const NetworkDetails: React.FC<NetworkDetailsProps> = ({ name, description }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{name}</h1>
      </div>
      <p>{description}</p>
      
      <div className={styles.section}>
        <h2>Services</h2>
        <div className={styles.buttonGrid}>
          <button className={styles.serviceButton}>Installation</button>
          <button className={styles.serviceButton}>Snapshots</button>
          <button className={styles.serviceButton}>Upgrade</button>
          <button className={styles.serviceButton}>Live Peers and Addrbook</button>
          <button className={styles.serviceButton}>Useful Commands</button>
          <button className={styles.serviceButton}>Useful Tools</button>
        </div>
      </div>

      <div className={styles.section}>
        <h2>Chain Information</h2>
        <div className={styles.chainInfo}>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.label}>Chain ID:</span>
              <span className={styles.value}>dymension_1100-1</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Height:</span>
              <span className={styles.value}>1234567</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Active Validators:</span>
              <span className={styles.value}>100</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.label}>Total Validators:</span>
              <span className={styles.value}>150</span>
            </div>
          </div>
          <a href="#" className={styles.explorerLink}>View in Explorer →</a>
        </div>
      </div>
    </div>
  );
};

export default NetworkDetails;
