import React, { createContext, useState } from "react";

export const CollectionContext = createContext()

export const CollectionProvider = ({children}) => {
  const [currentCollection, setCurrentCollection] = useState(null)

  return(
    <CollectionContext.Provider value={{currentCollection, setCurrentCollection}}>
      {children}
    </CollectionContext.Provider>
  )
}

