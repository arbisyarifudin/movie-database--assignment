// components/Dialog.tsx
import React, { ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';

type DialogProps = {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title?: string;
    children: ReactNode;
    confirmText?: string;
    closeText?: string;
};

const Dialog: React.FC<DialogProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title,
    children,
    confirmText = 'Confirm',
    closeText = 'Close',
}) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
        } else {
            document.removeEventListener('keydown', handleKeyDown);
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-md p-6 shadow-lg max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <div className="text-xl font-bold mb-4 text-input">
                        {title}
                        <hr className="my-3 opacity-10" />
                    </div>
                )}
                <div className="mb-4 text-input">{children}</div>
                <div className="flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 text-sm rounded-md px-5 py-2"
                    >
                        {closeText}
                    </button>
                    {onConfirm && (
                        <button
                            onClick={onConfirm}
                            className="bg-primary text-white hover:bg-primary-dark text-sm rounded-md px-5 py-2"
                        >
                            {confirmText}
                        </button>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Dialog;
