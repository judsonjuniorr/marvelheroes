import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FormHandles } from '@unform/core'
import { useHistory } from 'react-router'
import { Form } from '@unform/web'

import { searchCharactersRequest } from 'store/modules/characters/actions/searchCharacters'
import InputComponent from 'components/Input'
import { IState } from 'store'

const Search: React.FC = () => {
  const history = useHistory()
  const formRef = useRef<FormHandles>(null)
  const query = useSelector<IState, string>(
    state => state.characters.searchQuery
  )
  const dispatch = useDispatch()

  useEffect(() => {
    formRef.current?.setFieldValue('query', query)
  }, [query])

  const handleSubmit = useCallback(
    formData => {
      dispatch(searchCharactersRequest(formData.query))
      history.push({ pathname: '/search', search: `?query=${formData.query}` })
    },
    [dispatch, history]
  )

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <InputComponent name="query" placeholder="Pesquise pelo personagem" />
    </Form>
  )
}

export default Search
