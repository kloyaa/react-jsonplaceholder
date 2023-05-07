import { useEffect, useState } from 'react'
import { JsonPlaceholderClient } from '../utils'
import { IUser, TUserFavorite } from '../interfaces'
import { Box, SimpleGrid, Spinner, Center, useToast } from '@chakra-ui/react'
import { CardUser } from '../components/card.component'
import { useNavigate, useNavigation } from 'react-router-dom'
import { useLocalStorage } from '../utils/hooks.utils'
import { DrawerUserFavorites } from '../components/drawer.component'

interface IState {
  users: IUser[]
  isFetchingUsers: boolean
}

/**
 * @name Users
 * @description List of users should display here
 */
function Users(): JSX.Element {
  const [favorites, setFavorites] = useLocalStorage<TUserFavorite[]>(
    'user-favorites',
    []
  )
  const navigate = useNavigate()
  const navigation = useNavigation()
  const [state, setState] = useState<IState>({
    users: [],
    isFetchingUsers: true,
  })

  const getUsers = async () => {
    try {
      const response = await JsonPlaceholderClient.get('/users')
      setState((prev) => ({
        ...prev,
        users: response.data.sort((a: IUser, b: IUser) =>
          a.name.localeCompare(b.name)
        ),
        isFetchingUsers: false,
      }))
    } catch (error) {
      setState((prev) => ({
        ...prev,
        isFetchingUsers: false,
      }))
    }
  }

  const handleNavigate = (data: IUser) =>
    navigate(`/${data.id}`, {
      state: data,
    })

  useEffect(() => {
    window.document.title = `${process.env.REACT_APP_TITLE} | Users`
    getUsers()
  }, [])

  return (
    <>
      {state?.isFetchingUsers || navigation.state === 'loading' ? (
        <Center h='100vh'>
          <Spinner size='xl' color={'purple.500'} />
        </Center>
      ) : (
        <>
          <DrawerUserFavorites favorites={favorites} />
          <Box p={'28'}>
            <SimpleGrid minChildWidth={'250px'} spacing={'20px'}>
              {state?.users.map((user: IUser) => {
                return (
                  <CardUser
                    clickEvent={() => handleNavigate(user)}
                    data={user}
                    key={user.id}
                  />
                )
              })}
            </SimpleGrid>
          </Box>
        </>
      )}
    </>
  )
}

export default Users
