
import React, { useState, useEffect } from 'react';
import styles from './NetworkDetails.module.css';

interface NetworkDetailsProps {
  name: string;
  description: string;
  details: string;
}

interface ServiceData {
  title: string;
  content: string;
}

const NetworkDetails: React.FC<NetworkDetailsProps> = ({ name, description, details }) => {
  const [serviceData, setServiceData] = useState<{ [key: string]: ServiceData }>({});

  const fetchServiceData = async (service: string) => {
    try {
      const baseUrl = 'https://snapshots.coinhunterstr.com/site';
      const response = await fetch(`${baseUrl}${details}/${service}.json`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching ${service} data:`, error);
      return null;
    }
  };

  useEffect(() => {
    const services = [
      'installation',
      'snapshots',
      'upgrade',
      'peers',
      'usefulcommands',
      'tools'
    ];

    const loadAllServices = async () => {
      const servicePromises = services.map(service => 
        fetchServiceData(service).then(data => ({ [service]: data }))
      );
      
      const results = await Promise.all(servicePromises);
      const combinedData = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
      setServiceData(combinedData);
    };

    loadAllServices();
  }, [details]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{name}</h1>
      </div>
      <p>{description}</p>
      
      <div className={styles.section}>
        <h2>Services</h2>
        <div className={styles.buttonGrid}>
          {serviceData.installation && (
            <button className={styles.serviceButton} onClick={() => window.open(serviceData.installation.content)}>
              Installation
            </button>
          )}
          {serviceData.snapshots && (
            <button className={styles.serviceButton} onClick={() => window.open(serviceData.snapshots.content)}>
              Snapshots
            </button>
          )}
          {serviceData.upgrade && (
            <button className={styles.serviceButton} onClick={() => window.open(serviceData.upgrade.content)}>
              Upgrade
            </button>
          )}
          {serviceData.peers && (
            <button className={styles.serviceButton} onClick={() => window.open(serviceData.peers.content)}>
              Live Peers and Addrbook
            </button>
          )}
          {serviceData.usefulcommands && (
            <button className={styles.serviceButton} onClick={() => window.open(serviceData.usefulcommands.content)}>
              Useful Commands
            </button>
          )}
          {serviceData.tools && (
            <button className={styles.serviceButton} onClick={() => window.open(serviceData.tools.content)}>
              Useful Tools
            </button>
          )}
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
