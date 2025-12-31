import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import Home from "../pages/Home"

// Mock components
vi.mock("../components/Hero", () => ({
  default: () => <div data-testid="hero-component">Hero Component</div>,
}))

vi.mock("../components/DestinationCard", () => ({
  default: ({ title }) => <div data-testid="destination-card">{title}</div>,
}))

vi.mock("../components/TestimonialCard", () => ({
  default: ({ name }) => <div data-testid="testimonial-card">{name}</div>,
}))

describe("Home Page", () => {
  it("renders hero section", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    )

    expect(screen.getByTestId("hero-component")).toBeInTheDocument()
  })

  it('renders "Why Choose Us" section', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    )

    expect(screen.getByText("Why Choose Us")).toBeInTheDocument()
    expect(screen.getByText("Experienced Tour Guides")).toBeInTheDocument()
    expect(screen.getByText("Unforgettable Experiences")).toBeInTheDocument()
    expect(screen.getByText("Exceptional Service")).toBeInTheDocument()
  })

  it("renders featured destinations", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    )

    expect(screen.getByText("Featured Destinations")).toBeInTheDocument()
    expect(screen.getAllByTestId("destination-card")).toHaveLength(3)
    expect(screen.getByText("Volcanoes National Park")).toBeInTheDocument()
    expect(screen.getByText("Lake Kivu")).toBeInTheDocument()
    expect(screen.getByText("Genocide Memorials")).toBeInTheDocument()
  })

  it("renders testimonials section", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    )

    expect(screen.getByText("What Our Clients Say")).toBeInTheDocument()
    expect(screen.getAllByTestId("testimonial-card")).toHaveLength(3)
    expect(screen.getByText("Sarah Johnson")).toBeInTheDocument()
    expect(screen.getByText("David Chen")).toBeInTheDocument()
    expect(screen.getByText("Emma Williams")).toBeInTheDocument()
  })

  it("renders call to action section", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    )

    expect(screen.getByText("Ready to Experience Rwanda?")).toBeInTheDocument()
    expect(screen.getByText("Browse Tours")).toBeInTheDocument()
    expect(screen.getByText("Contact Us")).toBeInTheDocument()
  })
})

