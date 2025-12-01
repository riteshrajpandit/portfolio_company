import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogBackdrop,
  DialogCloseTrigger,
} from "@chakra-ui/react"
import { Button, HStack, Text } from "@chakra-ui/react"

interface DeleteConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  isLoading?: boolean
}

export const DeleteConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isLoading = false
}: DeleteConfirmDialogProps) => {
  return (
    <DialogRoot 
      open={isOpen} 
      onOpenChange={(e) => !isLoading && e.open === false && onClose()}
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <DialogBackdrop bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <DialogContent
        maxW={{ base: "90%", sm: "md" }}
        mx="auto"
        my="auto"
        borderRadius="xl"
        boxShadow="2xl"
        bg="white"
      >
        <DialogHeader pb={2}>
          <DialogTitle 
            fontSize={{ base: "lg", sm: "xl" }} 
            fontWeight="700"
            color="gray.800"
          >
            {title}
          </DialogTitle>
          <DialogCloseTrigger onClick={onClose} disabled={isLoading} />
        </DialogHeader>
        <DialogBody py={4}>
          <Text 
            fontSize={{ base: "sm", sm: "md" }} 
            color="gray.600"
            lineHeight="1.6"
          >
            {message}
          </Text>
        </DialogBody>
        <DialogFooter pt={2} pb={4}>
          <HStack gap={3} width="full" justify="flex-end">
            <Button 
              variant="outline" 
              onClick={onClose} 
              disabled={isLoading}
              size={{ base: "sm", sm: "md" }}
              borderColor="gray.300"
              color="gray.700"
              _hover={{ bg: "gray.50", borderColor: "gray.400" }}
            >
              Cancel
            </Button>
            <Button 
              colorScheme="red" 
              onClick={onConfirm}
              loading={isLoading}
              size={{ base: "sm", sm: "md" }}
              bg="red.500"
              _hover={{ bg: "red.600" }}
              _active={{ bg: "red.700" }}
            >
              Delete
            </Button>
          </HStack>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}
