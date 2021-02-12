import {Link as GatsbyLink} from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import {
    useColorMode,
    Button,
    Flex,
    Box,
    Spacer,
    Heading,
    IconButton,
    Center,
    Container,
    Text,
    VStack,
    Stack,
    Link
} from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'
import { FaGithub } from "react-icons/fa";

export default function App() {
    // const {colorMode, toggleColorMode} = useColorMode();

    return (
        <div>
            <Container centerContent pt="8" pb="8">
                <VStack spacing={6}>
                    <Heading as='h1' size="2xl" align="center">
                        Build accessible React apps 
                        <span
                            style={{
                            color: `rgb(56, 178, 172)`
                        }}> with speed</span>
                    </Heading>
                    <Text fontSize="lg" align="center">
                        Chakra UI is a simple, modular and accessible component library that gives you
                        the building blocks you need to build your React applications.
                    </Text>
                    <Stack spacing={4} direction="row" align="center">
                        <Button colorScheme="teal" size="lg" rightIcon={<ArrowForwardIcon />}>
                            <Link href="https://chakra-ui.com/docs/getting-started">Get Started</Link> 
                        </Button>
                        <Button colorScheme="gray" size="lg" leftIcon={<FaGithub />}>
                        <Link href="https://github.com/chakra-ui/chakra-ui">Github</Link>
                        </Button>
                    </Stack>
                </VStack>

            </Container>

        </div>

    )
}
