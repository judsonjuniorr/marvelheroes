import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import { searchCharactersRequest } from 'store/modules/characters/actions/searchCharacters'
import InputComponent from 'components/Input'
import { IState } from 'store'
import { ICharactersState } from 'store/modules/characters/types'

const Search: React.FC = () => {
  const history = useHistory()
  const formRef = useRef<FormHandles>(null)
  const { searchQuery } = useSelector<IState, ICharactersState>(
    state => state.characters
  )
  const dispatch = useDispatch()

  useEffect(() => {
    formRef.current?.setFieldValue('query', searchQuery)
  }, [searchQuery])

  const handleSubmit = useCallback(
    formData => {
      dispatch(searchCharactersRequest(formData.query))
      history.push({ pathname: '/search', search: `?query=${formData.query}` })
    },

    [dispatch, history]
  )

  return (
    <Form ref={formRef} onSubmit={handleSubmit} data-testid="search-form">
      <InputComponent
        name="query"
        placeholder="Pesquise pelo personagem"
        data-testid="search-input"
      />
    </Form>
  )
}

export default Search
