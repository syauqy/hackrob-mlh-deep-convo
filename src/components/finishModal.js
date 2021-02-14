import React, {useEffect} from 'react'
import {
    Flex, Box, Img,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Text, useDisclosure, Button, Modal, Heading, FormControl, FormLabel, Input, Select, VStack, Image, Link, Stack, Divider
} from '@chakra-ui/react'
import { ExternalLinkIcon, ArrowForwardIcon } from '@chakra-ui/icons'
import {graphql, useStaticQuery} from 'gatsby';

export default function FinishModal(data) {

    const {isOpen, onOpen, onClose} = useDisclosure();
    console.log('lokal storage', localStorage.getItem('gamefinish'));

    useEffect(() => {
        if (localStorage.getItem('gamefinish') === true) {
            onOpen()
        }
    }, []);

    return (
        <div>
            {/* <Button onClick={onOpen}>Open Modal</Button> */}

            <Modal
                isOpen={isOpen}
                closeOnOverlayClick={false}
                onClose={onClose}
                isCentered
                width={{
                    xl: "40vh",
                    lg: "40vh",
                    md: "50vh",
                    sm: "45vh",
                    base: "45vh"
                }}
                motionPreset="slideInBottom">
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>
                        <Heading as="h2" size="lg">Thank you for playing Convo!!</Heading>
                    </ModalHeader>
                    <ModalBody>
                        <VStack spacing={2}>
                        <Image
                                    objectFit="cover"
                                    src="https://images.tokopedia.net/img/cache/850/BgtCLw/2020/11/24/d966b0ce-c353-4ca7-8dd2-211a37fe06c4.jpg.webp"
                                    alt="Kartu Eksplorasa"/>
                                    <Text fontSize="xs" fontWeight={400}>
                            Image by Eksplorasa
                        </Text>
                                    <Text fontSize="md" fontWeight={400}>
                                    Hope you had a good conversation with Convo. This game only has 20 questions.
                        </Text>
                        <Text fontSize="md" fontWeight={400}>
                        Please do check out the Eksplorasa Cards, which contain up to 96 questions that can help you have wonderful conversations with your friends and loved ones.
                        </Text>
                        <Text fontSize="md"><Link fontWeight={600} color="#06AB11" href="https://www.tokopedia.com/kartueksplorasa/kartu-eksplorasa" isExternal>Buy Eksplorasa Cards{' '}<ExternalLinkIcon mx="2px" /></Link></Text> 
                        <Text fontSize="md"><Link fontWeight={600} color="#1F2C42" href="https://www.instagram.com/kartueksplorasa/" isExternal>Eksplorasa Cards in Instagram{' '}<ExternalLinkIcon mx="2px" /></Link></Text> 
                        <Button rightIcon={<ArrowForwardIcon />} colorScheme="teal" variant="outline">
    Replay the Game
  </Button>
                        </VStack>
                        
                    </ModalBody>
                    <Divider />
                    <ModalFooter>
                    <Text fontSize="xs" color="gray.500">Convo is an unofficial online game adaptation of the Eksplorasa board game. All the questions and property rights are owned by the Eksplorasa team.</Text> 
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}
