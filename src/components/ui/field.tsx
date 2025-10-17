import { Box, Text, VStack } from "@chakra-ui/react"
import * as React from "react"

export interface FieldProps {
  label?: string
  required?: boolean
  invalid?: boolean
  errorText?: string
  helperText?: string
  children: React.ReactNode
}

export const Field = React.forwardRef<HTMLDivElement, FieldProps>(
  function Field(props, ref) {
    const { label, required, invalid, errorText, helperText, children } = props

    return (
      <Box ref={ref} w="full">
        <VStack align="stretch" gap={2}>
          {label && (
            <Text
              fontSize="sm"
              fontWeight="600"
              color={invalid ? "red.600" : "text"}
            >
              {label}
              {required && (
                <Text as="span" color="red.500" ml={1}>
                  *
                </Text>
              )}
            </Text>
          )}
          
          {children}
          
          {helperText && !invalid && (
            <Text fontSize="xs" color="muted">
              {helperText}
            </Text>
          )}
          
          {invalid && errorText && (
            <Text fontSize="xs" color="red.600" fontWeight="500">
              {errorText}
            </Text>
          )}
        </VStack>
      </Box>
    )
  }
)
