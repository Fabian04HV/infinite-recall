import { Link, useNavigate } from "react-router-dom"

export const Searchbar = () => {
  const navigate = useNavigate()
  const searchsuggestions = [] //TODO: get suggestions from db

  const searchHandler = (e) => {
    let searchValue = e.target.value 
    console.log(searchValue)
    if(e.key === 'Enter'){
      console.log('Enter')
      search(searchValue)
    }
  }

  const search = (term) => {
    navigate(`/search/${term}`)
  }

  return(
  <>
    <div className='search-bar'>
        <label htmlFor='search-input'>
        <svg fill='var(--color-5)' xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="M774 913 533 672q-30 26-69.959 40.5T378 727q-108.162 0-183.081-75Q120 577 120 471t75-181q75-75 181.5-75t181 75Q632 365 632 471.15 632 514 618 554q-14 40-42 75l243 241q9 8.442 9 20.721t-9.913 22.192Q809 922 795.778 922q-13.222 0-21.778-9ZM377 667q81.25 0 138.125-57.5T572 471q0-81-56.875-138.5T377 275q-82.083 0-139.542 57.5Q180 390 180 471t57.458 138.5Q294.917 667 377 667Z"/></svg>
        </label>
        <input onChange={searchHandler} onKeyDown={searchHandler} type='search' id='search-input' className='search-input' placeholder='Search Flashcard Collections about anything!'/>
        {searchsuggestions.length > 0 && <div className="suggestions-container">
          {searchsuggestions.map(suggestion => (
            <Link to={suggestion.url}>
              <svg fill='var(--color-5)' xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 96 960 960" width="26"><path d="M774 913 533 672q-30 26-69.959 40.5T378 727q-108.162 0-183.081-75Q120 577 120 471t75-181q75-75 181.5-75t181 75Q632 365 632 471.15 632 514 618 554q-14 40-42 75l243 241q9 8.442 9 20.721t-9.913 22.192Q809 922 795.778 922q-13.222 0-21.778-9ZM377 667q81.25 0 138.125-57.5T572 471q0-81-56.875-138.5T377 275q-82.083 0-139.542 57.5Q180 390 180 471t57.458 138.5Q294.917 667 377 667Z"/></svg>
              {suggestion.title}
              </Link>
          ))}
        </div>}
    </div>
   
  </>

  )
}