import { Box, Table } from "@chakra-ui/react"

interface LandscapeRow {
  category: string
  companies: string
  gap: string
  highlight?: boolean
}

interface CompetitiveLandscapeTableProps {
  data: LandscapeRow[]
}

export const CompetitiveLandscapeTable = ({ data }: CompetitiveLandscapeTableProps) => {
  return (
    <Box 
      overflowX="auto" 
      borderRadius="xl" 
      border="1px solid" 
      borderColor="whiteAlpha.200"
      bg="whiteAlpha.50"
    >
      <Table.Root variant="line">
        <Table.Header bg="transparent">
          <Table.Row bg="transparent">
            <Table.ColumnHeader color="blue.400" w="25%">Category</Table.ColumnHeader>
            <Table.ColumnHeader color="gray.400" w="40%">Companies</Table.ColumnHeader>
            <Table.ColumnHeader color="gray.400">Gap</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row, index) => (
            <Table.Row 
              key={index} 
              bg={row.highlight ? "whiteAlpha.100" : "transparent"} 
              _hover={{ bg: "whiteAlpha.50" }}
            >
              <Table.Cell fontWeight="bold" color={row.highlight ? "blue.200" : "whiteAlpha.900"}>
                {row.category}
              </Table.Cell>
              <Table.Cell color={row.highlight ? "blue.200" : "gray.300"} fontWeight={row.highlight ? "bold" : "normal"}>
                {row.companies}
              </Table.Cell>
              <Table.Cell color={row.highlight ? "blue.200" : "gray.300"} fontWeight={row.highlight ? "bold" : "normal"}>
                {row.gap}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}
