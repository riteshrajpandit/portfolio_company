import { List, Text, Icon } from "@chakra-ui/react"
import { HiCheckCircle } from "react-icons/hi"

interface BulletListProps {
  items: string[]
}

export const BulletList = ({ items }: BulletListProps) => {
  return (
    <List.Root gap={3} variant="plain">
      {items.map((item, index) => (
        <List.Item key={index} display="flex" alignItems="flex-start" gap={3}>
          <List.Indicator asChild>
            <Icon as={HiCheckCircle} color="green.400" mt={1} />
          </List.Indicator>
          <Text color="gray.600" lineHeight="tall">
            {item}
          </Text>
        </List.Item>
      ))}
    </List.Root>
  )
}
