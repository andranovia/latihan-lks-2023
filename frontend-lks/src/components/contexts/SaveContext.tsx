import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction,
    useMemo,
  } from 'react';

  
  interface SaveContextProps {
    isChangesSaved: boolean;
    setIsChangesSaved: Dispatch<SetStateAction<boolean>>;
  }
  
  const SaveContext = createContext<SaveContextProps | undefined>(undefined);
  
  export const SaveProvider: React.FC<{ children: ReactNode }> = React.memo(
    ({ children }) => {
      const [isChangesSaved, setIsChangesSaved] = useState(false);

      const contextValue: SaveContextProps = useMemo(() => {
        return {
          isChangesSaved,
          setIsChangesSaved: (value) => {
            setIsChangesSaved(value);
            setTimeout(() => {
              setIsChangesSaved(false);
            }, 3000);
          },
        };
      }, [ isChangesSaved]);
  
      return (
        <SaveContext.Provider value={contextValue}>
          {children}
        </SaveContext.Provider>
      );
    }
  );
  
  export const useSave = (): SaveContextProps => {
    const context = useContext(SaveContext);
  
    if (!context) {
      throw new Error('useSave must be used within a SaveProvider');
    }
  
    return context;
  };