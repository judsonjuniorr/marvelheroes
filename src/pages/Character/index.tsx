import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaPencilAlt } from 'react-icons/fa'
import Lottie from 'react-lottie-player'
import { toast } from 'react-toastify'
import { Form } from '@unform/web'

import { IState } from 'store'
import useDocumentTitle from 'helpers/useDocumentTitle'
import { ISeriesState } from 'store/modules/series/types'
import { ICharactersState } from 'store/modules/characters/types'
import { listSeriesRequest } from 'store/modules/series/actions/listSeries'
import { updateCharacter } from 'store/modules/characters/actions/updateCharacters'

import { characterInfoRequest } from 'store/modules/characters/actions/infoCharacters'

import Search from 'components/Search'
import SeriesList from 'components/SeriesList'
import InputComponent from 'components/Input'
import TextAreaComponent from 'components/Textarea'

import loadingAnimation from 'assets/loading.json'
import logo from 'assets/logo-inline.svg'
import * as S from './styles'
import * as T from './types'

const Character: React.FC = () => {
  const dispatch = useDispatch()
  const { id } = useParams<T.IParams>()
  const [editMode, setEditMode] = useState(false)
  const { state, search } = useLocation<T.ILocation>()
  const { perPage } = useSelector<IState, ISeriesState>(st => st.series)
  const { loadError, noInfo, characterInfo, loading } = useSelector<
    IState,
    ICharactersState
  >(st => st.characters)

  useDocumentTitle(characterInfo?.name || state?.name)

  useEffect(() => {
    dispatch(characterInfoRequest(id))
  }, [dispatch, id])

  useEffect(() => {
    if (noInfo && !toast.isActive('notFound')) {
      toast.error('Personagem não encontrado', { toastId: 'notFound' })
    }
    if (loadError && !toast.isActive('error')) {
      toast.error('Falha ao carregar o personagem', { toastId: 'error' })
    }
  }, [loadError, noInfo])

  const page = useMemo(() => {
    const pageSearch = new URLSearchParams(search).get('page')
    if (!pageSearch) return 1
    return Number(pageSearch.replace(/\D+/g, ''))
  }, [search])

  useEffect(() => {
    /* istanbul ignore else */
    if (page) dispatch(listSeriesRequest({ characterID: id, page }))
  }, [dispatch, id, page])

  const seriesCountDesc = useMemo(() => {
    if (!characterInfo) return <></>

    let seriesText = ``
    if (characterInfo.series.available > 0) seriesText = ' séries'
    if (characterInfo.series.available === 1) seriesText = ' série'

    return characterInfo.series.available > 0 ? (
      <span className="series" data-testid="series-count">
        <strong>{characterInfo.series.available}</strong>
        {seriesText}
      </span>
    ) : (
      <></>
    )
  }, [characterInfo])

  const handleSubmit = useCallback(
    formData => {
      dispatch(updateCharacter({ id, ...formData }))
      setEditMode(false)
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
      {!characterInfo || loading ? (
        <S.Loading data-testid="load-text">
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
            data-testid="load-anim"
          />
        </S.Loading>
      ) : (
        <S.Content>
          <Form
            onSubmit={handleSubmit}
            initialData={{
              name: characterInfo.name,
              description: characterInfo.description
            }}
            data-testid="update-form"
          >
            <S.CharacterInfo>
              <div className="thumbnail">
                <img
                  src={`${characterInfo.thumbnail.path}/portrait_fantastic.${characterInfo.thumbnail.extension}`}
                  alt=""
                />
              </div>
              <div className="info">
                {!editMode && (
                  <button
                    type="button"
                    className="editBtn"
                    onClick={() => setEditMode(true)}
                    data-testid="toggle-edit"
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
                  <h1>{characterInfo.name}</h1>
                )}

                {seriesCountDesc}
                {characterInfo.description && !editMode && (
                  <p className="description">{characterInfo.description}</p>
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
                      data-testid="cancel-edit"
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

          {characterInfo.series.available > 0 && (
            <S.Series>
              <h1>SERIES</h1>
              <small>
                Exibindo {page * perPage - perPage + 1} -{' '}
                {page * perPage > characterInfo.series.available
                  ? characterInfo.series.available
                  : page * perPage}{' '}
                de {characterInfo.series.available}
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
