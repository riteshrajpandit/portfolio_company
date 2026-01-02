import { PinInput as ChakraPinInput, Group } from "@chakra-ui/react"
import * as React from "react"

export interface PinInputProps extends ChakraPinInput.RootProps {
  rootRef?: React.Ref<HTMLDivElement>
  count?: number
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>
  attached?: boolean
}

export const PinInput = React.forwardRef<HTMLDivElement, PinInputProps>(
  function PinInput(props, ref) {
    const { children, inputProps, count, attached, ...rest } = props
    return (
      <ChakraPinInput.Root ref={ref} {...rest}>
        <ChakraPinInput.HiddenInput />
        {children ? (
          children
        ) : (
          <ChakraPinInput.Control>
            <Group attached={attached}>
              {Array.from({ length: count || 4 }).map((_, index) => (
                <ChakraPinInput.Input
                  key={index}
                  index={index}
                  {...inputProps}
                />
              ))}
            </Group>
          </ChakraPinInput.Control>
        )}
      </ChakraPinInput.Root>
    )
  },
) as React.ForwardRefExoticComponent<
  PinInputProps & React.RefAttributes<HTMLDivElement>
> & {
  Input: typeof ChakraPinInput.Input
  Control: typeof ChakraPinInput.Control
  Label: typeof ChakraPinInput.Label
  HiddenInput: typeof ChakraPinInput.HiddenInput
}

PinInput.Input = ChakraPinInput.Input
PinInput.Control = ChakraPinInput.Control
PinInput.Label = ChakraPinInput.Label
PinInput.HiddenInput = ChakraPinInput.HiddenInput
