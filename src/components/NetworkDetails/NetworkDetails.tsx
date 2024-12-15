
import React, { useState } from 'react';
import styles from './NetworkDetails.module.css';

interface NetworkDetailsProps {
  name: string;
  description: string;
  details: string;
}

const NetworkDetails: React.FC<NetworkDetailsProps> = ({ name, description, details }) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [serviceData, setServiceData] = useState<any>(null);

  const services = ['installation', 'snapshots', 'upgrade', 'peers', 'usefulcommands', 'tools'];

  const handleServiceClick = async (service: string) => {
    try {
      const networkPath = details.includes('mainnet') ? 'mainnet' : 'testnet';
      const networkName = details.split('/').pop() || '';
      const url = `https://snapshots.coinhunterstr.com/site/${networkPath}/${networkName}/${service}.json`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setServiceData(data);
      setSelectedService(service);
    } catch (error) {
      console.error('Error fetching data:', error);
      setServiceData(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{name}</h1>
      </div>
      <p>{description}</p>
      
      <div className={styles.section}>
        <h2>Services</h2>
        <div className={styles.buttonGrid}>
          {services.map((service) => (
            <button
              key={service}
              className={`${styles.serviceButton} ${selectedService === service ? styles.active : ''}`}
              onClick={() => handleServiceClick(service)}
            >
              {service.charAt(0).toUpperCase() + service.slice(1)}
            </button>
          ))}
        </div>

        {selectedService && serviceData && (
          <div className={styles.serviceContent}>
            <h3>{selectedService.charAt(0).toUpperCase() + selectedService.slice(1)}</h3>
            <div className={styles.contentBox}>
              {Object.entries(serviceData).map(([key, commands]: [string, any]) => (
                <div key={key} className={styles.commandSection}>
                  <h4>{key}</h4>
                  {Array.isArray(commands) && commands.map((item: any, index: number) => (
                    <div key={index} className={styles.commandItem}>
                      <p className={styles.description}>{item.description}</p>
                      <pre className={styles.command}>
                        <code>{item.command}</code>
                      </pre>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkDetails;
