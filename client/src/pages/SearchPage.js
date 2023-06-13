import { useParams, Link } from "react-router-dom";
import '../assets/Collections.css';
import { useEffect, useState } from "react";
import axios from "axios";
import CollectionCard from "../components/CollectionCard";
import { Loading } from "../components/Loading";

const API_URL = process.env.REACT_APP_API_URL;

export const SearchPage = () => {
  const query = useParams().query;
  const [foundCollections, setFoundCollections] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${API_URL}/api/search/${query}`)
    .then((response) => {
      setFoundCollections(response.data);
      setLoading(false);
    });
  }, [query]);

  return (
    <>
      {foundCollections === null ? (
      <Loading />
      ) : foundCollections.length === 0 ? (
      <>
          <h1>No Collection found with that name 😱</h1>
          <h3>But that's okay. You can be the one to create it! 😎</h3>
          <Link to="/collection/create" className="standard-button">
          <svg fill='var(--accent-color)' xmlns="http://www.w3.org/2000/svg" height="32" viewBox="0 96 960 960" width="32"><path d="M540.175 678q12.825 0 21.325-8.625T570 648V546h102q12.75 0 21.375-8.675 8.625-8.676 8.625-21.5 0-12.825-8.625-21.325T672 486H570V384q0-12.75-8.675-21.375-8.676-8.625-21.5-8.625-12.825 0-21.325 8.625T510 384v102H408q-12.75 0-21.375 8.675-8.625 8.676-8.625 21.5 0 12.825 8.625 21.325T408 546h102v102q0 12.75 8.675 21.375 8.676 8.625 21.5 8.625ZM260 856q-24 0-42-18t-18-42V236q0-24 18-42t42-18h560q24 0 42 18t18 42v560q0 24-18 42t-42 18H260Zm0-60h560V236H260v560ZM140 976q-24 0-42-18t-18-42V326q0-12.75 8.675-21.375 8.676-8.625 21.5-8.625 12.825 0 21.325 8.625T140 326v590h590q12.75 0 21.375 8.675 8.625 8.676 8.625 21.5 0 12.825-8.625 21.325T730 976H140Zm120-740v560-560Z"/></svg>  
            Create New Collection
          </Link>
        </>
      ) : (
        <>
          <h1>Search Results for: {query}</h1>
          <div className="collections-container">
            {foundCollections.map(collection => (
              <CollectionCard key={collection._id} collection={collection}/>
            ))}
          </div>
        </>
      )}
    </>
  );
};