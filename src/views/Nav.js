import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import MainComponent from './MainComponent';
import FlightComponent from './FlightComponent';
const Nav = () => {
  
  return (
<Tabs variant='soft-rounded' colorScheme='green'>
    <TabList>
      <Tab>One</Tab>
      <Tab>Two</Tab>
    </TabList>
  
    <TabPanels>
      <TabPanel>
        <MainComponent/>
      </TabPanel>
      <TabPanel>
        <FlightComponent/>
      </TabPanel>
     
    </TabPanels>
  </Tabs>
  )
}

export default Nav