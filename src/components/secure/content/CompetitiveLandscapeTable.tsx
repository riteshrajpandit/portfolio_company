import { Box, Table } from "@chakra-ui/react"
import type { ReactNode } from "react"

interface LandscapeRow {
  category: string
  companies: string
  gap: ReactNode
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
      borderColor="blackAlpha.200"
      bg="whiteAlpha.50"
    >
      <Table.Root variant="line">
        <Table.Header bg="transparent">
          <Table.Row bg="transparent">
            <Table.ColumnHeader color="gray.600" w="25%">Category</Table.ColumnHeader>
            <Table.ColumnHeader color="gray.600" w="40%">Companies</Table.ColumnHeader>
            <Table.ColumnHeader color="gray.600">Gap</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row, index) => (
            <Table.Row 
              key={index} 
              bg={row.highlight ? "whiteAlpha.100" : "transparent"} 
              _hover={{ bg: "whiteAlpha.50" }}
            >
              <Table.Cell fontWeight="bold" color={row.highlight ? "blue.400" : "blackAlpha.600"}>
                {row.category}
              </Table.Cell>
              <Table.Cell color={row.highlight ? "blue.400" : "gray.600"} fontWeight={row.highlight ? "bold" : "normal"}>
                {row.companies}
              </Table.Cell>
              <Table.Cell color={row.highlight ? "blue.400" : "gray.600"} fontWeight={row.highlight ? "bold" : "normal"}>
                {row.gap}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}
