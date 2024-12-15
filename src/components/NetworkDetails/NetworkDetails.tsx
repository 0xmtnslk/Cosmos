
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
      const networkPath = details.includes('mainnet') ? 'mainnet' : 'testnet';
      const networkName = details.split('/').pop() || '';
      const url = `https://snapshots.coinhunterstr.com/site/${networkPath}/${networkName}/${service}.json`;
      console.log('Fetching from:', url);
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = await response.json();
      setServiceData(data);
    } catch (error) {
      console.error(`Error fetching ${service} data:`, error);
      setServiceData(null);
    }
  };

  useEffect(() => {
    if (selectedService) {
      fetchServiceData(selectedService);
      const interval = setInterval(() => fetchServiceData(selectedService), 30000);
      return () => clearInterval(interval);
    }
  }, [selectedService, details]);

  const handleServiceClick = (service: string) => {
    setSelectedService(service);
  };

  const renderUsefulCommands = (data: any) => {
    return Object.entries(data).map(([section, commands]: [string, any]) => (
      <div key={section} className={styles.commandSection}>
        <h4>{section}</h4>
        {Array.isArray(commands) && commands.map((command: any, index: number) => (
          <div key={index} className={styles.commandItem}>
            <p className={styles.description}>{command.description}</p>
            <pre className={styles.command}>
              <code>{command.command}</code>
            </pre>
          </div>
        ))}
      </div>
    ));
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
                renderUsefulCommands(serviceData)
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
