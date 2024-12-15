
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
        <h2>Explorer</h2>
        <div className={styles.buttonGrid}>
          <button className={styles.serviceButton}>Block Explorer</button>
          <button className={styles.serviceButton}>Validator Stats</button>
          <button className={styles.serviceButton}>Network Status</button>
        </div>
      </div>
    </div>
  );
};

export default NetworkDetails;
