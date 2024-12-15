
import React, { useState, useEffect } from 'react';
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

  const fetchServiceData = async (service: string) => {
    try {
      const baseUrl = 'https://snapshots.coinhunterstr.com/site';
      const networkPath = details.includes('mainnet') ? 'mainnet' : 'testnet';
      const networkName = details.split('/').pop();
      const response = await fetch(`${baseUrl}/${networkPath}/${networkName}/${service}.json`);
      
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setServiceData(data);
    } catch (error) {
      console.error(`Error fetching ${service} data:`, error);
      setServiceData(null);
    }
  };

  const handleServiceClick = (service: string) => {
    setSelectedService(service);
    fetchServiceData(service);
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
              className={styles.serviceButton}
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
              {selectedService === 'usefulcommands' ? (
                Object.entries(serviceData).map(([section, commands]: [string, any]) => (
                  <div key={section} className={styles.commandSection}>
                    <h4>{section}</h4>
                    {commands.map((item: any, index: number) => (
                      <div key={index} className={styles.commandItem}>
                        <p className={styles.description}>{item.description}</p>
                        <pre className={styles.command}>
                          <code>{item.command}</code>
                        </pre>
                      </div>
                    ))}
                  </div>
                ))
              ) : (
                <pre>
                  {typeof serviceData === 'object' 
                    ? JSON.stringify(serviceData, null, 2)
                    : serviceData}
                </pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkDetails;
