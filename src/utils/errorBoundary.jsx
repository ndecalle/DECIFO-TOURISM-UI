"use client"

import React, { Component } from "react"
import { withTranslation } from "react-i18next"

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo)
  }

  render() {
    const { t } = this.props

    if (this.state.hasError) {
      return <h1>{t("errorBoundary.message")}</h1>
    }

    return this.props.children
  }
}

export default withTranslation()(ErrorBoundary)

