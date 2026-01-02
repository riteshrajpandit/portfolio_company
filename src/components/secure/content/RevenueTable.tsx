import { Box, Table, Badge } from "@chakra-ui/react"

interface RevenueRow {
  period: string
  revenue: string
  growth: string
  status: string
}

interface RevenueTableProps {
  data: RevenueRow[]
}

export const RevenueTable = ({ data }: RevenueTableProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'actual':
      case 'closed':
        return 'green'
      case 'projected':
        return 'blue'
      default:
        return 'gray'
    }
  }

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
            <Table.ColumnHeader color="gray.400">Period</Table.ColumnHeader>
            <Table.ColumnHeader color="gray.400" textAlign="right">Revenue</Table.ColumnHeader>
            <Table.ColumnHeader color="gray.400" textAlign="right">Growth</Table.ColumnHeader>
            <Table.ColumnHeader color="gray.400">Status</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((row, index) => (
            <Table.Row key={index} bg="transparent" _hover={{ bg: "whiteAlpha.50" }}>
              <Table.Cell fontWeight="medium" color="whiteAlpha.900">{row.period}</Table.Cell>
              <Table.Cell textAlign="right" color="whiteAlpha.900">{row.revenue}</Table.Cell>
              <Table.Cell textAlign="right" color="green.300">{row.growth}</Table.Cell>
              <Table.Cell>
                <Badge colorPalette={getStatusColor(row.status)} variant="subtle" borderRadius="full" px={2}>
                  {row.status}
                </Badge>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  )
}
