import HeaderSection from "../components/requests/HeaderSection"
import StatsGrid from "../components/requests/StatsGrid"

const RequestsAdmin = () => {
  return (
    <>
      <div className="mb-5">
        <HeaderSection />
      </div>
      <div className="mb-5">
        <StatsGrid />
      </div>

    </>
  )
}

export default RequestsAdmin