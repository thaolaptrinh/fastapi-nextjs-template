"use client"
import Link from "next/link"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "full" | "icon" | "responsive"
  className?: string
  asLink?: boolean
}

export function Logo({
  variant = "full",
  className,
  asLink = true,
}: LogoProps) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    setMounted(true)
  }, [])

  const fullLogo = isDark
    ? "/assets/images/fastapi-logo-light.svg"
    : "/assets/images/fastapi-logo.svg"
  const iconLogo = isDark
    ? "/assets/images/fastapi-icon-light.svg"
    : "/assets/images/fastapi-icon.svg"

  const content =
    variant === "responsive" ? (
      <>
        <img
          src={mounted ? fullLogo : "/assets/images/fastapi-logo.svg"}
          alt="FastAPI"
          suppressHydrationWarning
          className={cn(
            "h-6 w-auto group-data-[collapsible=icon]:hidden",
            className,
          )}
        />
        <img
          src={mounted ? iconLogo : "/assets/images/fastapi-icon.svg"}
          alt="FastAPI"
          suppressHydrationWarning
          className={cn(
            "size-5 hidden group-data-[collapsible=icon]:block",
            className,
          )}
        />
      </>
    ) : (
      <img
        src={
          mounted
            ? variant === "full"
              ? fullLogo
              : iconLogo
            : "/assets/images/fastapi-logo.svg"
        }
        alt="FastAPI"
        suppressHydrationWarning
        className={cn(variant === "full" ? "h-6 w-auto" : "size-5", className)}
      />
    )

  if (!asLink) {
    return content
  }

  return <Link href="/">{content}</Link>
}
