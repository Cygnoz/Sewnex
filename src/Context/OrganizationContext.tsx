import React, { createContext, useContext, useEffect, useState } from 'react';
import useApi from '../Hooks/useApi';
import { endpoints } from '../Services/apiEdpoints';

interface OrganizationContextType {
  organization: any | null;
  fetchOrganization: () => Promise<void>;
  setOrganization: React.Dispatch<React.SetStateAction<any | null>>;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);

export const OrganizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [organization, setOrganization] = useState<any | null>(null);
  const [hasFetched, setHasFetched] = useState(false); // Flag to track if data is already fetched
  const { request: getOneOrganization } = useApi("get", 5004);

    const fetchOrganization = async () => {
        // Only fetch if not already fetched
        if (!hasFetched && !organization) {
        try {
            const url = `${endpoints.GET_ONE_ORGANIZATION}`;
            const { response, error } = await getOneOrganization(url);

            if (!error && response) {
            setOrganization(response.data);
            console.log(response.data,"qwertyui")
            setHasFetched(true); // Mark as fetched
            }
        } catch (error) {
            console.log("Error in fetching Organization", error);
        }
        }
    };

    useEffect(() => {
        fetchOrganization();
    }, []);

  return (
    <OrganizationContext.Provider value={{ organization, fetchOrganization,setOrganization }}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const useOrganization = (): OrganizationContextType => {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};
