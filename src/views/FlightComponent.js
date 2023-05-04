import { Input, Skeleton } from '@chakra-ui/react'
import React from 'react'

const FlightComponent = () => {
  return (
<Skeleton isLoaded p={5} m={3}>
    <form method='Post'>

<label>Flight Date:</label>
<Input
 placeholder="Select Date and Time"
 size="md"
 type="date"
/>

</form>
</Skeleton>
  )
}

export default FlightComponent