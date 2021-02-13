import {Link as GatsbyLink} from "gatsby"
import React, {useState, createContext, useContext, useEffect} from "react"
import useSWR, {SWRConfig} from "swr";
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
    Link,
    Spinner,
    useToast,
    Icon
} from '@chakra-ui/react'
import {graphql, useStaticQuery} from 'gatsby';
import {ArrowForwardIcon} from '@chakra-ui/icons'
import {FaRegComments} from "react-icons/fa";
import '../styles/app.css'

export default function App() {
    // const {colorMode, toggleColorMode} = useColorMode();
    return (
        <div>
            <QuestionProvider>

                <SWRConfig
                    value={{
                    fetcher,
                    revalidateOnFocus: false
                }}>
                    <GetQuestions/>
                </SWRConfig>
            </QuestionProvider>
        </div>

    )
}

const fetcher = (...args) => fetch(...args).then(response => response.json());

export const QuestionContext = createContext();

export function QuestionProvider({children}) {
    const [language,
        setLanguage] = useState('indonesia');

    return (
        <QuestionContext.Provider
            value={{
            language,
            setLanguage
        }}>
            {children}
        </QuestionContext.Provider>
    )
}

function GetQuestions() {
    const airtableApi = useStaticQuery(graphql `
  query airtableApi {
    airtable: site {
      siteMetadata {
        airtableApi
        airtableBase
      }
    }
  }`);

    const toast = useToast()

    const {language} = useContext(QuestionContext);

    const response = useSWR(`https://api.airtable.com/v0/appKcVQOgZTubQ8q0/${language}`, (url) => fetcher(url, {
        headers: {
            'Authorization': `Bearer ${airtableApi.airtable.siteMetadata.airtableApi}`,
            'Accept': 'application/json'
        }
    }))

    if (response.error) 
        return <div>{toast({title: "An error occurred.", description: "Unable to get the data.", status: "error", duration: 9000, isClosable: true})}</div>
    if (!response.data) {
        return (
            <Flex
                style={{
                top: "50%",
                left: "50%",
                width: "100%",
                height: "100%",
                position: "fixed"
            }}>
                <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"/></Flex>
        )
    }

    const questions = response.data;

    console.log('questions', questions);
    return (
        <div>
            <FilterData questions={questions}/>
        </div>
    )
}

function FilterData(data) {

    // const [number, setNumber] = useState(0);
    let number = 0;

    const pertanyaan = data
        .questions
        .records
        .map(q => {
            return {'question': q.fields.question}
        })

    // const pertanyaan = data;

    let randomQuestion;

    console.log('pertanyaan', pertanyaan);

    function shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    function shuffleCards() {
        const cards = shuffle(pertanyaan);
        // console.log('cards', randomQuestion);
        return cards;
    }

    function increaseNumber() {
        number++;

        if (number < randomQuestion.length) {
            console.log('question', number, randomQuestion[number].question);
            if (randomQuestion[number].question !== undefined) {
                document
                    .querySelector('#question-card')
                    .innerText = randomQuestion[number].question;
            } else {
                document
                    .querySelector('#question-card')
                    .innerText = 'tidak ada data';
            }
        } else {
            document
                .querySelector('#question-card')
                .innerText = 'data habis';
        }

    }

    randomQuestion = shuffleCards()

    console.log('random', randomQuestion)

    return (
        <div>
            <Container centerContent pt="8" pb="8" maxW="xl" h="100vh" alignItems="center" className="container" color="#1F2C42">
                <div onClick={increaseNumber} className="card-container">
                <Box w="50vh" maxW="sm" h="70vh" p={4} className="card" borderWidth="2px" borderRadius="xl" alignItems="center" borderColor="gray.200" shadow="md">
                    <Box w="100%" maxW="sm" h="100%" p={4} className="inner-card" borderWidth="4px" alignItems="center" borderColor="gray.700">
                    <VStack spacing={6}>
                        <Box h="40px">
                        </Box>
                <Icon as={FaRegComments} w={10} h={10} />
                    {number <= randomQuestion.length
                        ? randomQuestion[number].question !== undefined
                            ? <Box>                     
                                <Heading id="question-card" as='h1' size="lg" align="center">{randomQuestion[number].question}</Heading>
                            </Box>
                            : ''
                        : ''}
                        <Heading as='h1' size="xl" align="center">. . . . .</Heading>
                </VStack>
                    </Box>
                </Box>
                </div>
                
            </Container>
        </div>
    )

}
