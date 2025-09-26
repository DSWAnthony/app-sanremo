import { type Request } from "@/types/request";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

type ViewSummaryRequestProps = {
  request: Request;
  onClose: () => void;
};

export default function ViewSummaryRequest({
  request,
  onClose,
}: ViewSummaryRequestProps) {
  return (
    <AlertDialog open={true} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="max-w-lg w-full">
        {/* Header */}
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg md:text-xl font-semibold">
            Resumen de solicitud
          </AlertDialogTitle>
          <div className="text-sm text-muted-foreground space-y-1 mt-3 bg-muted/40 p-3 rounded-lg">
            <p>
              <span className="font-medium text-foreground">ID:</span>{" "}
              {request.id}
            </p>
            <p>
              <span className="font-medium text-foreground">Estado:</span>{" "}
              {request.status}
            </p>
            <p>
              <span className="font-medium text-foreground">Observaciones:</span>{" "}
              {request.observations || "Ninguna"}
            </p>
          </div>
        </AlertDialogHeader>

        {/* Productos */}
        <AlertDialogDescription asChild>
          <div className="mt-5">
            <h4 className="text-base font-medium mb-3">Productos</h4>
            <div className="max-h-72 overflow-y-auto pr-1 space-y-1">
              <Accordion type="single" collapsible className="w-full">
                {request.items.map((item) => (
                  <AccordionItem
                    key={item.id}
                    value={String(item.id)}
                    className="border rounded-md bg-muted/30 mb-2"
                  >
                    <AccordionTrigger className="py-2 px-3 text-sm font-medium hover:bg-muted/60 rounded-t-md">
                      {item.product.name}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm space-y-2 px-3 pb-3">
                      <div>
                        <span className="text-xs text-muted-foreground">
                          Unidad:
                        </span>{" "}
                        {item.product.unit ?? "—"}
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">
                          Cantidad:
                        </span>{" "}
                        {item.quantity}
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">
                          Observaciones:
                        </span>{" "}
                        {item.observations ?? "Ninguna"}
                      </div>
                      {item.product.description && (
                        <div>
                          <span className="text-xs text-muted-foreground">
                            Descripción:
                          </span>{" "}
                          {item.product.description}
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </AlertDialogDescription>

        {/* Footer */}
        <AlertDialogFooter className="flex flex-col sm:flex-row justify-end gap-2 mt-4">
          <AlertDialogCancel className="sm:w-auto w-full">
            Cerrar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
