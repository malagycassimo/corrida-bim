"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: React.ReactNode;
}

interface DialogTriggerProps {
    asChild?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
}

interface DialogContextType {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const DialogContext = React.createContext<DialogContextType>({
    open: false,
    setOpen: () => {},
});

export const Dialog: React.FC<DialogProps> = ({
    open: controlledOpen,
    onOpenChange,
    children,
}) => {
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : uncontrolledOpen;

    const setOpen = React.useCallback(
        (val: boolean) => {
            if (onOpenChange) onOpenChange(val);
            if (!isControlled) setUncontrolledOpen(val);
        },
        [onOpenChange, isControlled],
    );

    return (
        <DialogContext.Provider value={{ open, setOpen }}>
            {children}
        </DialogContext.Provider>
    );
};

export const DialogTrigger: React.FC<DialogTriggerProps> = ({
    asChild,
    children,
}) => {
    const { setOpen } = React.useContext(DialogContext);

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<{ onClick?: () => void }>, {
            onClick: () => {
                setOpen(true);
            },
        });
    }

    return (
        <button type="button" onClick={() => setOpen(true)}>
            {children}
        </button>
    );
};

export const DialogContent: React.FC<{
    className?: string;
    children?: React.ReactNode;
}> = ({ className, children }) => {
    const { open, setOpen } = React.useContext(DialogContext);

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-xs"
                    />

                    {/* Content Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                            "relative w-full z-50 bg-white rounded-2xl shadow-2xl border border-slate-100",
                            className,
                        )}
                    >
                        <button
                            onClick={() => setOpen(false)}
                            className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                        {children}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export const DialogHeader: React.FC<{
    className?: string;
    children?: React.ReactNode;
}> = ({ className, children }) => (
    <div className={cn("flex flex-col space-y-1.5 text-left", className)}>
        {children}
    </div>
);

export const DialogTitle: React.FC<{
    className?: string;
    children?: React.ReactNode;
}> = ({ className, children }) => (
    <h3 className={cn("text-lg font-bold text-slate-900 leading-none tracking-tight", className)}>
        {children}
    </h3>
);
