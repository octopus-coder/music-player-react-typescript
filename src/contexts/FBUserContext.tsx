import { createContext, Dispatch, SetStateAction, useState } from "react";

export interface IFBContext {
  fb_id?: string | null;
  setFBID: Dispatch<SetStateAction<string | null | undefined>>;
}

export const FBUserContext = createContext<IFBContext>({} as IFBContext);

const FBUserProvider: React.FC = ({ children }) => {
  const [fb_id, setFBID] = useState<string | null>();

  return (
    <FBUserContext.Provider
      value={{
        fb_id,
        setFBID,
      }}
    >
      {children}
    </FBUserContext.Provider>
  );
};

export default FBUserProvider;
