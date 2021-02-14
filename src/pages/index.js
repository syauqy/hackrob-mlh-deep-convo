import React from "react"
import {ChakraProvider} from "@chakra-ui/react"
import App from './app'
import {Helmet} from 'react-helmet';

export default function Home() {
    return (
        <ChakraProvider>
            <Helmet>
                <meta charSet="utf-8" name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
                <title>Convo - Have a deep conversation online</title>
                <link rel="canonical" href="https://hackrob-convo.vercel.app"/>
                <meta name="description" content='An unofficial online game adaption of Eksplorasa board game. Have a deep conversation online'/>
                <meta name="image" content='https://ik.imagekit.io/ps3xes4nrg/convo_icon_9hKRChrM4rJz.png/' /> 
                
                {/* OpenGraph tags */}
                <meta property="og:url" content="https://hackrob-convo.vercel.app"/> 
                <meta property="og:type" content="article" />
                <meta property="og:title" content="Convo - Have a deep conversation online" />
                <meta property="og:description" content='An unofficial online game adaption of Eksplorasa board game. Have a deep conversation online'/>
                <meta property="og:image" content='https://ik.imagekit.io/ps3xes4nrg/convo_icon_9hKRChrM4rJz.png?tr=w-1200,h-630,fo-auto'/>
                <meta property="fb:app_id" content=''/> 
                
                {/* Twitter Card tags */}
                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:creator" content="@syauqy"/>
                <meta name="twitter:title" content="Convo - Have a deep conversation online"/>
                <meta name="twitter:description" content='An unofficial online game adaption of Eksplorasa board game. Have a deep conversation online'/>
                <meta name="twitter:image" content="https://ik.imagekit.io/ps3xes4nrg/convo_icon_9hKRChrM4rJz.png?tr=w-1200,h-675,fo-auto"/>

                </Helmet>
            <App/>
        </ChakraProvider>
    )
}
