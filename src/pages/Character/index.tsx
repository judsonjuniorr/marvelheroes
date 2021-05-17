import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaPencilAlt } from 'react-icons/fa'
import Lottie from 'react-lottie-player'
import { toast } from 'react-toastify'
import { Form } from '@unform/web'

import api from 'helpers/api'
import { IState } from 'store'
import useDocumentTitle from 'helpers/useDocumentTitle'
import { ISeriesState } from 'store/modules/series/types'
import { ICharactersState } from 'store/modules/characters/types'
import { listSeriesRequest } from 'store/modules/series/actions/listSeries'
import { updateCharacter } from 'store/modules/characters/actions/updateCharacters'

import loadingAnimation from 'assets/loading.json'
import logo from 'assets/logo-inline.svg'

import Search from 'components/Search'
import SeriesList from 'components/SeriesList'

import InputComponent from 'components/Input'
import TextAreaComponent from 'components/Textarea'

import * as S from './styles'
import * as T from './types'

const Character: React.FC = () => {
  const dispatch = useDispatch()
  const { id } = useParams<T.IParams>()
  const [editMode, setEditMode] = useState(false)
  const { state, search } = useLocation<T.ILocation>()
  const [character, setCharacter] = useState<T.ICharacter | null>(null)
  const { perPage } = useSelector<IState, ISeriesState>(st => st.series)
  const { updates } = useSelector<IState, ICharactersState>(st => st.characters)

  useDocumentTitle(character?.name || state?.name)

  const charUpdated = useMemo(
    () => updates.find(char => Number(char.id) === Number(id)) || {},
    [id, updates]
  )

  useEffect(() => {
    api
      .get<T.ICharacterRequest>(`/characters/${id}`)
      .then(({ data }) => {
        if (data.data.count <= 0) {
          if (!toast.isActive('notFound'))
            toast.error('Personagem não encontrado', { toastId: 'notFound' })
          return
        }
        setCharacter({ ...data.data.results[0], ...charUpdated })
        dispatch(listSeriesRequest({ characterID: id, page: 1 }))
      })
      .catch(() => {
        if (!toast.isActive('error'))
          toast.error('Falha ao carregar o personagem', { toastId: 'error' })
      })
  }, [charUpdated, dispatch, id])

  const page = useMemo(() => {
    const pageSearch = new URLSearchParams(search).get('page')
    if (!pageSearch) return 1
    return Number(pageSearch.replace(/\D+/g, ''))
  }, [search])

  useEffect(() => {
    if (page) dispatch(listSeriesRequest({ characterID: id, page }))
  }, [dispatch, id, page])

  const seriesCountDesc = useMemo(() => {
    if (!character) return <></>

    let seriesText = ``
    if (character.series.available > 0) seriesText = ' séries'
    if (character.series.available === 1) seriesText = ' série'

    return character.series.available > 0 ? (
      <span className="series">
        <strong>{character.series.available}</strong>
        {seriesText}
      </span>
    ) : (
      <></>
    )
  }, [character])

  const handleSubmit = useCallback(
    formData => {
      setCharacter(char => (char ? { ...char, ...formData } : formData))
      setEditMode(false)
      dispatch(updateCharacter({ id, ...formData }))
    },
    [dispatch, id]
  )

  return (
    <>
      <S.Header>
        <Link to="/" className="logo">
          <img src={logo} alt="MARVEL HEROES" />
        </Link>
        <Search />
      </S.Header>
      {!character ? (
        <S.Loading>
          {state?.name && (
            <span>
              Aguarde enquanto <strong>{state.name}</strong> se prepara para a
              batalha
            </span>
          )}
          <Lottie
            play
            animationData={loadingAnimation}
            style={{ height: '200px' }}
          />
        </S.Loading>
      ) : (
        <S.Content>
          <Form
            onSubmit={handleSubmit}
            initialData={{
              name: character.name,
              description: character.description
            }}
          >
            <S.CharacterInfo>
              <div className="thumbnail">
                <img
                  src={`${character.thumbnail.path}/portrait_fantastic.${character.thumbnail.extension}`}
                  alt=""
                />
              </div>
              <div className="info">
                {!editMode && (
                  <button
                    type="button"
                    className="editBtn"
                    onClick={() => setEditMode(true)}
                  >
                    Editar <FaPencilAlt />
                  </button>
                )}

                {editMode ? (
                  <div className="nameInpt">
                    <InputComponent
                      name="name"
                      placeholder="Nome do personagem"
                    />
                  </div>
                ) : (
                  <h1>{character.name}</h1>
                )}

                {seriesCountDesc}
                {character.description && !editMode && (
                  <p className="description">{character.description}</p>
                )}
                {editMode && (
                  <TextAreaComponent
                    name="description"
                    placeholder="Descrição"
                  />
                )}
                {editMode && (
                  <div className="editAction">
                    <button
                      className="cancel"
                      type="button"
                      onClick={() => setEditMode(false)}
                    >
                      Cancelar
                    </button>
                    <button className="submit" type="submit">
                      Atualizar
                    </button>
                  </div>
                )}
              </div>
            </S.CharacterInfo>
          </Form>

          {character.series.available > 0 && (
            <S.Series>
              <h1>SERIES</h1>
              <small>
                Exibindo {page * perPage - perPage + 1} - {page * perPage} de{' '}
                {character.series.available}
              </small>
              <SeriesList />
            </S.Series>
          )}
        </S.Content>
      )}
    </>
  )
}

export default Character
