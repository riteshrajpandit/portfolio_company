import { forwardRef } from "react"

export interface SwitchProps {
  checked?: boolean
  onCheckedChange?: (details: { checked: boolean }) => void
  colorScheme?: string
  size?: "sm" | "md" | "lg"
  disabled?: boolean
  style?: React.CSSProperties
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ checked, onCheckedChange, colorScheme = "primary", size = "md", disabled, style, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.({ checked: e.target.checked })
    }

    return (
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        disabled={disabled}
        {...props}
        style={{
          width: size === "sm" ? "32px" : size === "lg" ? "48px" : "40px",
          height: size === "sm" ? "16px" : size === "lg" ? "24px" : "20px",
          position: "relative",
          appearance: "none",
          backgroundColor: checked ? `var(--chakra-colors-${colorScheme}-500)` : "var(--chakra-colors-neutral-300)",
          borderRadius: "9999px",
          cursor: disabled ? "not-allowed" : "pointer",
          transition: "background-color 0.2s ease",
          outline: "none",
          ...style
        }}
        className="chakra-switch"
      />
    )
  }
)

Switch.displayName = "Switch"
