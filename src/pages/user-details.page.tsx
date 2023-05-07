import { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { Center, useToast } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useLocalStorage } from '../utils/hooks.utils'
import { IUser, TUserFavorite } from '../interfaces'
import { JsonPlaceholderClient } from '../utils'
import { CardUserDetails } from '../components/card.component'

interface IState {
  user: IUser | any
  isInFavorites: boolean
}
/**
 * @name UserDetails
 * @description Details of user should display here
 */
function UserDetails() {
  const [favorites, setFavorites] = useLocalStorage<TUserFavorite[]>(
    'user-favorites',
    []
  )
  const { data } = useLoaderData() as any
  const navigate = useNavigate()
  const toast = useToast()

  const [state, setState] = useState<IState>({
    user: null,
    isInFavorites: false,
  })

  const getUserDetails = async (data: IUser) => {
    try {
      const response = await JsonPlaceholderClient.get(`/users/${data.id}`)
      const isInFavorites = favorites.find(
        (favorite) => favorite.id === data.id
      )
        ? true
        : false
      setState((prev) => ({
        ...prev,
        user: response.data,
        isInFavorites,
      }))
    } catch (error) {
      console.error(error)
    }
  }

  const handleAddToFavorites = (data: IUser) => {
    if (!favorites.find((favorite) => favorite.id === data.id)) {
      setFavorites([
        ...favorites,
        {
          id: data.id,
          createdAt: new Date(),
          name: data.name,
          username: data.username,
        },
      ])
      toast({
        status: 'success',
        colorScheme: 'purple',
        duration: 2000,
        description: `Success! ${data.name} has been added to your favorites. You can easily access it later by clicking on the 'Favorites' section above`,
      })
    }
  }

  const handleRemoveInFavorites = (data: IUser) => {
    setFavorites(favorites.filter((favorite) => favorite.id !== data.id))
    toast({
      status: 'success',
      colorScheme: 'purple',
      duration: 2000,
      description: `Success! ${data.name} has been removed from your favorites.`,
    })
  }

  useEffect(() => {
    window.document.title = `${process.env.REACT_APP_TITLE} | ${data?.name}`
    getUserDetails(data)
  }, [favorites])

  return (
    <>
      <Center height={'100vh'}>
        <CardUserDetails
          data={state.user}
          isInFavorites={state.isInFavorites}
          backEvent={() => navigate(-1)}
          unlikeEvent={() => handleRemoveInFavorites(state.user)}
          likeEvent={() => handleAddToFavorites(state.user)}
        />
      </Center>
    </>
  )
}

export default UserDetails
