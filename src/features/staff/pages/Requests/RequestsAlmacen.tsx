import { useEffect, useState } from "react";
import Content from "../../components/requests/Content";
import HeaderSection from "../../components/requests/HeaderSection";
import StatsGrid from "../../components/requests/StatsGrid";
import { requestService } from "../../services/resquestService";
import { useRequestData } from "../../hooks/useRequestData";
import type { Request } from "@/types/request";
import ViewSummaryRequest from "../../components/requests/ViewSummaryRequest";

const RequestsAdmin = () => {
  const { requests, setRequests } = useRequestData();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await requestService.fetchAll();
        if (!mounted) return;
        setRequests(data);
      } catch (err) {
        console.error("fetch requests error", err);
        if (!mounted) return;
        setError("No se pudieron cargar las solicitudes.");
      } finally {
        if (!mounted) return;
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // cargar solo al montar

  return (
    <>
      <div className="mb-5">
        <HeaderSection />
      </div>

      <div className="mb-5">
        <StatsGrid requests={requests} />
      </div>

      <div>
        <Content
          requests={requests}
          onViewSummary={(request) => setSelectedRequest(request)}
        />
      </div>

      {/* Mensajes simples */}
      {error && (
        <div className="mt-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {selectedRequest && (
        <ViewSummaryRequest request={selectedRequest} onClose={() => setSelectedRequest(null)} />
      )}
    </>
  );
};

export default RequestsAdmin;
