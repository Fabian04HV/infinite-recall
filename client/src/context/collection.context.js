import React, { createContext, useEffect, useState } from "react";

export const CollectionContext = createContext()

export const CollectionProvider = ({children}) => {
  const [currentCollection, setCurrentCollection] = useState(localStorage.getItem('currentCollection'))

  useEffect(() => {
    setCurrentCollection(localStorage.getItem('currentCollection'))
  }, [])

  useEffect(() => {
    localStorage.setItem('currentCollection', currentCollection);
  }, [currentCollection]);
  

  return(
    <CollectionContext.Provider value={{currentCollection, setCurrentCollection}}>
      {children}
    </CollectionContext.Provider>
  )
}