import React from 'react'
import {Box, Text, Link, Stack } from '@chakra-ui/react'
import { ExternalLinkIcon } from '@chakra-ui/icons'

export default function Attribution() {
    return (
        <div>
            <Box w="100%" style={{position: 'absolute', bottom: '0', left: '0'}}>
                <Stack align="center" direction="row" p={2} mb={2}>
                <Text fontSize="xs" fontWeight={500}>All questions are based on the <Link fontWeight={800} color="#1F2C42" href="https://www.instagram.com/kartueksplorasa/" isExternal>Eksplorasa Board Game<ExternalLinkIcon mx="2px" /></Link></Text> 
                </Stack>
            </Box>
        </div>
    )
}
