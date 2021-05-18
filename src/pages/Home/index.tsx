import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'

import useDocumentTitle from 'helpers/useDocumentTitle'

import { IState } from 'store'
import { ICharactersState } from 'store/modules/characters/types'
import { loadAllCharactersRequest } from 'store/modules/characters/actions/loadAllCharacters'

import Search from 'components/Search'
import Wrapper from 'components/Wrapper'
import CharacterList from 'components/CharacterList'

import wave from 'assets/wave.svg'
import logo from 'assets/logo.svg'
import blackPanther from 'assets/black-phanter.png'
import deadPool from 'assets/deadpool.png'
import antMan from 'assets/ant-man.png'
import venom from 'assets/venom.png'
import groot from 'assets/groot.png'
import ironMan from 'assets/iron-man.png'
import spiderMan from 'assets/spider-man.png'

import * as S from './styles'

const Home: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const [wallpID, setWallpID] = useState(1)
  useDocumentTitle()

  const { loadError, total, page } = useSelector<IState, ICharactersState>(
    state => state.characters
  )

  useEffect(() => {
    const pageUrl = new URLSearchParams(location.search).get('page')
    let searchPage = page
    if (pageUrl) searchPage = Number(pageUrl)

    dispatch(loadAllCharactersRequest(searchPage))
    if (searchPage !== 1) {
      history.push(`/?page=${searchPage}`)
    } else history.push(`/`)
  }, [dispatch, history, location?.search, page])

  useEffect(() => {
    if (loadError && !toast.isActive('loadError'))
      toast.error('Falha ao carregar os personagens, tente mais tarde', {
        toastId: 'loadError'
      })
  }, [loadError])

  useEffect(() => {
    /* istanbul ignore next */
    setInterval(() => setWallpID(old => (old >= 7 ? 1 : old + 1)), 10000)
  }, []) // eslint-disable-line

  return (
    <S.Wrapper>
      <S.Main wallpIdx={wallpID}>
        <S.Logo>
          <Link
            data-testid="app-logo"
            to="/"
            onClick={() => {
              if (page !== 1) dispatch(loadAllCharactersRequest(1))
            }}
          >
            <img src={logo} alt="MARVEL HEROES" />
          </Link>
          <Search />
        </S.Logo>

        <img src={blackPanther} alt="" className="character blackPhanter" />
        <img src={deadPool} alt="" className="character deadPool" />
        <img src={antMan} alt="" className="character antMan" />
        <img src={venom} alt="" className="character venom" />
        <img src={groot} alt="" className="character groot" />
        <img src={ironMan} alt="" className="character ironMan" />
        <img src={spiderMan} alt="" className="character spiderMan" />
        <img src={wave} alt="" className="wave" />
      </S.Main>
      <S.Content>
        <Wrapper>
          <S.Section>
            <strong>TODOS OS PERSONAGENS</strong>
            <small>
              <strong>{total}</strong> personagens em registro
            </small>

            <ul>
              <CharacterList />
            </ul>
          </S.Section>
        </Wrapper>
      </S.Content>
    </S.Wrapper>
  )
}

export default Home
