import { IoMdClose } from 'react-icons/io';

import { ModalProps } from '@/types/ui';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/modal/dialog';

export default function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
}: ModalProps) {
  return (
    <Dialog open={isOpen} modal={false}>
      <DialogContent className="bg-white rounded-lg shadow-xl p-6 overflow-y-auto max-h-[80vh] sm:max-h-[90vh]">
        <DialogHeader className="flex flex-col w-full gap-1">
          <div className="flex justify-between item-center w-full gap-2">
            <DialogTitle className="text-3xl font-semibold text-black">
              {title}
            </DialogTitle>
            <IoMdClose className="cursor-pointer text-2xl" onClick={onClose} />
          </div>

          <DialogDescription className="text-base text-slate-500">
            {description}
          </DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
}
