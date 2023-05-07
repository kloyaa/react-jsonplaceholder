import { Box, Flex, Image, Text, Card, Divider, Icon, CardHeader, Avatar, Heading, IconButton, CardBody, CardFooter, Button } from '@chakra-ui/react'
import { FaEnvelope, FaPhone, FaHeart, FaHeartBroken } from 'react-icons/fa';
import {  BiChat, BiArrowBack } from 'react-icons/bi';

import { IUser } from '../interfaces'

interface ICardUser {
  data: IUser
  clickEvent: Function
}

interface ICardUserDetails {
  data: IUser;
  likeEvent?: Function;
  unlikeEvent?: Function;
  shareEvent?: Function;
  commentEvent?: Function;
  backEvent?: Function;
  isInFavorites: boolean;
}

export const CardUser = ({ data, clickEvent }: ICardUser) => {
  return (
    <Card
      onClick={() => clickEvent()}
      cursor={'pointer'}
      p={'10'}
      width={'full'}
      justifyContent={'center'}
      alignItems={'center'}
      alignContent={'center'}
    >
      <Image
        height={'20'}
        width={'20'}
        src={`https://api.multiavatar.com/${data.name}.png`}
      />

      <Box textAlign={'center'} mt={'10'}>
        <Text fontSize={'medium'}>{data.name}</Text>
        <Text fontSize={'large'} fontWeight={'bold'}>
          @{data.username}
        </Text>
        <Divider my={'2'} />
        <Flex gap={'2'}>
          <Icon as={FaPhone} h={'5'} color={'purple.500'} />
          <Text fontSize={'smaller'}>{data.phone}</Text>
        </Flex>
        <Flex gap={'2'}>
          <Icon as={FaEnvelope} h={'5'} color={'purple.500'} />
          <Text fontSize={'smaller'}>{data.email}</Text>
        </Flex>
      </Box>
    </Card>
  )
}

export const CardUserDetails = ({ data, likeEvent, unlikeEvent, commentEvent, backEvent, isInFavorites }: ICardUserDetails) => {
  return <Card maxW='2xl'>
  <CardHeader>
    <Flex gap={"4"}>
      <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
        <Avatar name={data?.name} src={`https://api.multiavatar.com/${data?.name}.png`}/>
        <Box>
          <Heading size='sm'>{data?.name}</Heading>
          <Text>@{data?.username}</Text>
        </Box>
      </Flex>
      <IconButton
        onClick={() => backEvent && backEvent()}
        variant='unstyled'
        colorScheme='gray'
        color={"purple.500"}
        aria-label='See menu'
        icon={<BiArrowBack />}
      />
    </Flex>
  </CardHeader>
  <CardBody>
    <Text>
      With Chakra UI, I wanted to sync the speed of development with the speed
      of design. I wanted the developer to be just as excited as the designer to
      create a screen.
    </Text>
  </CardBody>
  <Image
    objectFit='cover'
    src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
    alt='Chakra UI'
  />

  <CardFooter
    justify='space-between'
    flexWrap='wrap'
    sx={{
      '& > button': {
        minW: '136px',
      },
    }}
  >
    <Button
      onClick={() => isInFavorites ? 
        unlikeEvent && unlikeEvent() :  
        likeEvent && likeEvent()} 
      flex='1' 
      variant='ghost' 
      color={isInFavorites ? 'red.500' : 'purple.500'}
      leftIcon={ isInFavorites ? <FaHeartBroken /> : <FaHeart /> }>
       {isInFavorites ? 'Remove from favorites' : 'Add to favorites'}
      </Button>
    <Button
      onClick={() => commentEvent && commentEvent()} 
      flex='1' 
      variant='ghost' 
      leftIcon={<BiChat />}>
        Comment
      </Button>
  </CardFooter>
</Card>
}
