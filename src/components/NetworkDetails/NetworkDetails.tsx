
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
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const fetchServiceData = async (service: string) => {
    try {
      const baseUrl = 'https://snapshots.coinhunterstr.com/site';
      const networkPath = details.includes('mainnet') ? 'mainnet' : 'testnet';
      const networkName = details.split('/').pop();
      const response = await fetch(`${baseUrl}/${networkPath}/${networkName}/${service}.json`);
      
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return {
        title: service.charAt(0).toUpperCase() + service.slice(1),
        content: data
      };
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
    const interval = setInterval(loadAllServices, 30000);

    return () => clearInterval(interval);
  }, [details]);

  const handleServiceClick = (serviceName: string) => {
    setSelectedService(serviceName);
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
          {Object.keys(serviceData).length > 0 && (
            <>
              <button className={styles.serviceButton} onClick={() => handleServiceClick('installation')}>
                Installation
              </button>
              <button className={styles.serviceButton} onClick={() => handleServiceClick('snapshots')}>
                Snapshots
              </button>
              <button className={styles.serviceButton} onClick={() => handleServiceClick('upgrade')}>
                Upgrade
              </button>
              <button className={styles.serviceButton} onClick={() => handleServiceClick('peers')}>
                Live Peers and Addrbook
              </button>
              <button className={styles.serviceButton} onClick={() => handleServiceClick('usefulcommands')}>
                Useful Commands
              </button>
              <button className={styles.serviceButton} onClick={() => handleServiceClick('tools')}>
                Useful Tools
              </button>
            </>
          )}
          {serviceData.snapshots && (
            <button className={styles.serviceButton} onClick={() => handleServiceClick('snapshots')}>
              Snapshots
            </button>
          )}
          {serviceData.upgrade && (
            <button className={styles.serviceButton} onClick={() => handleServiceClick('upgrade')}>
              Upgrade
            </button>
          )}
          {serviceData.peers && (
            <button className={styles.serviceButton} onClick={() => handleServiceClick('peers')}>
              Live Peers and Addrbook
            </button>
          )}
          {serviceData.tools && (
            <button className={styles.serviceButton} onClick={() => handleServiceClick('tools')}>
              Useful Tools
            </button>
          )}
        </div>
        {selectedService && serviceData[selectedService] && (
          <div className={styles.serviceContent}>
            <h3>{serviceData[selectedService].title}</h3>
            <div className={styles.contentBox}>
              {selectedService === 'usefulcommands' && serviceData[selectedService].content ? (
                Object.entries(serviceData[selectedService].content).map(([section, data]: [string, any]) => (
                  <div key={section} className={styles.commandSection}>
                    <h4>{section}</h4>
                    {data.map((item: any, index: number) => (
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
                  {typeof serviceData[selectedService].content === 'object' 
                    ? JSON.stringify(serviceData[selectedService].content, null, 2)
                    : serviceData[selectedService].content}
                </pre>
              )}
            </div>
          </div>
        )}
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
