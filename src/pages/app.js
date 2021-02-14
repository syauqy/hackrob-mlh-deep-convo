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
    Icon,
    Switch,
    Image, useDisclosure, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody, Divider
} from '@chakra-ui/react'
import {graphql, useStaticQuery} from 'gatsby';
import {ArrowForwardIcon, ExternalLinkIcon} from '@chakra-ui/icons'
import {FaRegComments} from "react-icons/fa";
import '../styles/app.css'
import Attribution from '../components/attribution'
// import FinishModal from '../components/finishModal'

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
        setLanguage] = useState('id');

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

    const {language, setLanguage} = useContext(QuestionContext);

    const response = useSWR(`https://api.airtable.com/v0/appKcVQOgZTubQ8q0/questions`, (url) => fetcher(url, {
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

    // console.log('questions', questions);
    return (
        <div>
            <FilterData questions={questions}/>
        </div>
    )
}

function FilterData(data) {

    // const [number, setNumber] = useState(0);
    let number = 0;

    const {language, setLanguage} = useContext(QuestionContext);

    const pertanyaan = data
        .questions
        .records
        .map(q => {
            return {'id': q.fields.indo, 'en': q.fields.en}
        })

    // const pertanyaan = data;

    let randomQuestion;

    // console.log('data', data.questions.records);
    // console.log('pertanyaan', pertanyaan);

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
        localStorage.setItem('gamefinish', false);
        return cards;
    }

    // const card = document.querySelector(".inner-card");

    function increaseNumber() {
        number++;
        if (number <= 10) {
            console.log('question', number, randomQuestion[number].en);
            if (randomQuestion[number].en !== undefined) {
                document
                    .querySelector('#question-card')
                    .innerText = randomQuestion[number].en;
            } else {
                document
                    .querySelector('#question-card')
                    .innerText = 'tidak ada data';
            }
        } else {
            localStorage.setItem('gamefinish', true);
            document
                .querySelector('#question-card')
                .innerText = '';
                document.querySelector(".finish-modal").click();
        }
        console.log('lokal storage', localStorage.getItem('gamefinish'));

    }
    


    // shuffle pertama setelah mulai game, cukup sekali aja function startGame(){
    // randomQuestion = shuffleCards();     console.log('random start',
    // randomQuestion) }

    randomQuestion = shuffleCards();

    console.log('random', randomQuestion)

    return (
        <div className="world">
            <Container centerContent pt="8" pb="8" maxW="xl" // w="100vw"
                h="100vh" alignItems="center" className="container" // bgColor="#1F2C42"
                color="#1F2C42">

                {/* <Button onClick={startGame} mb={4}>Mulai Permainan</Button> */}
                <div
                    onClick={() => increaseNumber()}
                    className="card-container"
                    role="button"
                    onKeyUp={increaseNumber}>
                    <Box width={{
                        xl: "40vh",
                        lg: "40vh",
                        md: "50vh",
                        sm: "45vh",
                        base: "45vh"
                    }} // maxW="sm"
                        h={{
                        xl: "70vh",
                        lg: "70vh",
                        md: "80vh",
                        sm: "80vh",
                        base: "80vh"
                    }} p={4} className="card" borderWidth="2px" borderRadius="xl" alignItems="center" borderColor="gray.200" shadow="md" bgColor="white">
                        <Box w="100%" // maxW="sm"
                            h="100%" p={4} className="inner-card" borderWidth="4px" alignItems="center" borderColor="gray.700">
                            <VStack spacing={6} className="card_face">
                                <Box h="40px"></Box>
                                <Image
                                    boxSize={{
                                    xl: "80px",
                                    lg: "80px",
                                    md: "60px",
                                    sm: "50px",
                                    base: "50px"
                                }}
                                    src="https://ik.imagekit.io/ps3xes4nrg/convo_bubble_F9g40JSsaXZ.png"
                                    alt="Convo"/> {/* <Icon as={FaRegComments} w={10} h={10}/>  */}
                                {number <= 10
                                    ? randomQuestion[number].en !== undefined
                                        ? <Box>
                                                <Heading id="question-card" as='h1' size="lg" align="center">{randomQuestion[number].en}</Heading>
                                            </Box>
                                        : ''
                                    : randomQuestion[number].en !== undefined
                                        ? <Box>
                                                <Heading id="question-card" as='h1' size="lg" align="center">{randomQuestion[number].en}</Heading>
                                            </Box>
                                        : ''}
                                <Heading as='h1' size="xl" align="center">. . . . .</Heading>
                            </VStack>
                        </Box>
                    </Box>
                </div>
                <Attribution/>
            <FinishModal />
            </Container>
        </div>
    )

}

function FinishModal() {

    const {isOpen, onOpen, onClose} = useDisclosure();
    console.log('lokal storage', localStorage.getItem('gamefinish'));

    useEffect(() => {
        if (localStorage.getItem('gamefinish') === 'true') {
            onOpen()
        }
    });

    return (
        <div>
            <Button className="finish-modal" onClick={onOpen} visibility="hidden">Open Modal</Button>

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
                        <Button rightIcon={<ArrowForwardIcon /> } onClick={()=>window.location.reload()} colorScheme="teal" variant="outline">
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

function InstructionModal() {

    const {isOpen, onOpen, onClose} = useDisclosure();
    console.log('lokal storage', localStorage.getItem('gamefinish'));

    useEffect(() => {
        if (localStorage.getItem('gamefinish') === 'true') {
            onOpen()
        }
    });

    return (
        <div>
            <Button className="finish-modal" onClick={onOpen} visibility="hidden">Open Modal</Button>

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
                        <Button rightIcon={<ArrowForwardIcon /> } onClick={()=>window.location.reload()} colorScheme="teal" variant="outline">
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
