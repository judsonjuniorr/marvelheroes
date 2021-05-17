import { useHistory, useLocation, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'

import { IState } from 'store'
import { ICharactersState } from 'store/modules/characters/types'

import Wrapper from 'components/Wrapper'
import Search from 'components/Search'

import wave from 'assets/wave.svg'
import logo from 'assets/logo-inline.svg'
import CharacterList from 'components/CharacterList'
import { searchCharactersRequest } from 'store/modules/characters/actions/searchCharacters'
import * as S from './styles'

interface IParams {
  query: string
}

const SearchResults: React.FC = () => {
  const location = useLocation<IParams>()
  const dispatch = useDispatch()
  const history = useHistory()
  const { searchError, searchResult, searchQuery } = useSelector<
    IState,
    ICharactersState
  >(st => st.characters)

  useEffect(() => {
    if (searchError) {
      toast.error('Ocorreu um erro ao realizar sua pesquisa')
      history.push('/')
    }
  }, [history, searchError])

  const query = useMemo(
    () => new URLSearchParams(location.search).get('query'),
    [location.search]
  )

  useEffect(() => {
    if (!searchQuery && !!query) dispatch(searchCharactersRequest(query))
  }, [dispatch, query, searchQuery])

  return (
    <>
      <S.Header>
        <Wrapper>
          <Link to="/">
            <img src={logo} alt="MARVEL HEROES" />
          </Link>
          <h2>
            <small>pesquisando:</small>
            <span>{query}</span>
          </h2>
        </Wrapper>
        <img src={wave} alt="" className="wave" />
      </S.Header>
      <S.Content>
        <Search />
        <strong>Resultados da sua pesquisa</strong>
        <small>{searchResult.length} encontrados</small>
        {searchResult.length > 0 && <CharacterList />}
      </S.Content>
    </>
  )
}

export default SearchResults
