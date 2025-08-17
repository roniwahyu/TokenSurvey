import React from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ExitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ExitModal({ isOpen, onClose, onConfirm }: ExitModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-sm modern-card" aria-describedby="exit-dialog-description">
        <VisuallyHidden>
          <DialogTitle>Keluar dari Assessment</DialogTitle>
        </VisuallyHidden>
        <DialogDescription id="exit-dialog-description" className="sr-only">
          Konfirmasi untuk keluar dari assessment dengan menyimpan progress
        </DialogDescription>
        
        <div className="text-center p-2 animate-fade-scale">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse-soft">
            <AlertTriangle className="text-red-600 dark:text-red-400 text-xl" size={24} />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Keluar dari Assessment?
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Progress Anda akan disimpan dan dapat dilanjutkan kapan saja.
          </p>
          <div className="flex space-x-3">
            <Button
              variant="ghost"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-medium"
              data-testid="cancel-exit"
            >
              Batal
            </Button>
            <Button
              onClick={onConfirm}
              className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium"
              data-testid="confirm-exit"
            >
              Simpan & Keluar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
