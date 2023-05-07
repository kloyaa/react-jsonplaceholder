import { Avatar, Box, Button, Card, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerOverlay, Flex, Heading, useDisclosure, Text, IconButton } from "@chakra-ui/react"
import { useRef } from "react"
import { FaHeart } from "react-icons/fa";
import { BiRightArrowAlt } from "react-icons/bi";
import { TUserFavorite } from "../interfaces";
import { useNavigate } from "react-router-dom";


interface IDrawerUserFavorites { 
    favorites: TUserFavorite[]; 
}

export const DrawerUserFavorites = ({ favorites} : IDrawerUserFavorites ) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const btnRef = useRef(null);
  
    return (
      <>
        <Flex justifyContent={"end"} pt={"20"} px={"20"}>
            <Button 
                onClick={() => onOpen()} 
                colorScheme={"purple"} 
                variant={"outline"} 
                leftIcon={<FaHeart />} 
                ref={btnRef}>
                Favorites
            </Button>
        </Flex>
        <Drawer
          size={"md"}
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerBody mt={'20'}>
              {favorites.map((favorite, index) => {
                    return <Card 
                        key={favorite.id}
                        mt={'2'}
                        p={'5'}>
                            <Flex justifyContent={"space-between"}>
                                <Flex gap={"5"}>
                                    <Avatar name={favorite?.name} src={`https://api.multiavatar.com/${favorite?.name}.png`}/>
                                    <Box>
                                        <Heading size='sm'>{favorite.name}</Heading>
                                        <Text>@{favorite.username}</Text>
                                    </Box>
                                </Flex>
                                <IconButton 
                                    onClick={() => navigate(`/${favorite.id}`, { state: favorite })}
                                    aria-label="view-details" 
                                    color="purple.500"
                                    variant={"unstyled"}
                                    icon={<BiRightArrowAlt />}/>
                                
                            </Flex>
                        </Card>
                })}
            </DrawerBody>
            <DrawerFooter>
              <Button colorScheme={"purple"} variant='outline' mr={3} onClick={onClose}>
                Close
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </>
    )
}