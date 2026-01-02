import { Box, Table, Icon } from "@chakra-ui/react"
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa"

interface ComparisonFeature {
  name: string
  us: boolean
  competitorA: boolean
  competitorB: boolean
}

interface ComparisonTableProps {
  features: ComparisonFeature[]
}

export const ComparisonTable = ({ features }: ComparisonTableProps) => {
  const StatusIcon = ({ active }: { active: boolean }) => (
    active ? 
      <Icon as={FaCheckCircle} color="green.400" boxSize={5} /> : 
      <Icon as={FaTimesCircle} color="red.400" boxSize={5} opacity={0.5} />
  )

  return (
    <Box 
      overflowX="auto" 
      borderRadius="xl" 
      border="1px solid" 
      borderColor="whiteAlpha.200"
      bg="whiteAlpha.50"
    >
      <Table.Root variant="line">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader color="gray.400" w="40%">Feature</Table.ColumnHeader>
            <Table.ColumnHeader color="blue.400" textAlign="center" fontSize="md">Us</Table.ColumnHeader>
            <Table.ColumnHeader color="gray.400" textAlign="center">Comp A</Table.ColumnHeader>
            <Table.ColumnHeader color="gray.400" textAlign="center">Comp B</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {features.map((feature, index) => (
            <Table.Row key={index} _hover={{ bg: "whiteAlpha.50" }}>
              <Table.Cell fontWeight="medium" color="whiteAlpha.900">{feature.name}</Table.Cell>
              <Table.Cell textAlign="center">
                <StatusIcon active={feature.us} />
              </Table.Cell>
              <Table.Cell textAlign="center">
                <StatusIcon active={feature.competitorA} />
              </Table.Cell>
              <Table.Cell textAlign="center">
                <StatusIcon active={feature.competitorB} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}
