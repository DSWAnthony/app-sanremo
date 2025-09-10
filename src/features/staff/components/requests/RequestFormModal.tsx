import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // onSuccess?: () => void;
};

const RequestFormModal = ({ open, onOpenChange }: Props) => {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Resetear cuando se abre
  useEffect(() => {
    if (open) {
      setError(null);
      setSuccessMessage(null);
      // si quieres limpiar campos al abrir:
      // setProduct("");
      // setQuantity("");
      // setDescription("");
    }
  }, [open]);

  const close = () => onOpenChange(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    // Validaciones simples
    if (!product.trim()) {
      setError("El nombre del producto es requerido.");
      return;
    }
    if (quantity === "" || Number(quantity) <= 0) {
      setError("Ingresa una cantidad válida (> 0).");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        product: product.trim(),
        quantity: Number(quantity),
        description: description.trim(),
        createdAt: new Date().toISOString(),
      };

      // Cambia la URL por la de tu backend (o usa Apollo)
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }

      setSuccessMessage("Solicitud enviada correctamente.");
      // onSuccess?.();
      // limpiar campos
      setProduct("");
      setQuantity("");
      setDescription("");

      // cerrar modal después de un pequeño delay o inmediatamente
      setTimeout(() => {
        setSuccessMessage(null);
        close();
      }, 900);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Error al enviar la solicitud.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nueva Solicitud</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div>
            <Label>Producto</Label>
            <Input
              autoFocus
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="Nombre del producto"
            />
          </div>

          <div>
            <Label>Cantidad</Label>
            <Input
              type="number"
              min={1}
              value={quantity === "" ? "" : String(quantity)}
              onChange={(e) =>
                setQuantity(e.target.value === "" ? "" : Number(e.target.value))
              }
              placeholder="Cantidad"
            />
          </div>

          {/* <div>
            <Label>Descripción (opcional)</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Detalles adicionales"
            />
          </div> */}

          {error && <p className="text-sm text-red-600">{error}</p>}
          {successMessage && <p className="text-sm text-green-600">{successMessage}</p>}

          <DialogFooter className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={close} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar Solicitud"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RequestFormModal;
