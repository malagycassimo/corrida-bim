"use client";
import React from "react";
import { motion } from "framer-motion";

interface StepProgressProps {
    steps: string[];
    currentStep: number;
}

const StepProgress: React.FC<StepProgressProps> = ({ steps, currentStep }) => {
    return (
        <div className="flex items-center justify-between w-full max-w-3xl mx-auto">
            {steps.map((step, index) => (
                <React.Fragment key={index}>
                    <motion.div
                        className={`flex flex-col items-center`}
                        initial={false}
                        animate={{
                            color: index <= currentStep ? "#D1005D" : "#9CA3AF",
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mb-2`}
                            initial={false}
                            animate={{
                                backgroundColor:
                                    index <= currentStep
                                        ? "#D1005D"
                                        : "#E5E7EB",
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <motion.span
                                className="font-semibold"
                                initial={false}
                                animate={{
                                    color:
                                        index <= currentStep
                                            ? "#FFFFFF"
                                            : "#4B5563",
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {index + 1}
                            </motion.span>
                        </motion.div>
                        <span className="text-sm font-medium hidden lg:block">
                            {step}
                        </span>
                    </motion.div>
                    {index < steps.length - 1 && (
                        <motion.div
                            className="flex-grow h-0.5 mx-2 relative bottom-1 lg:bottom-2"
                            initial={false}
                            animate={{
                                backgroundColor:
                                    index < currentStep ? "#D1005D" : "#E5E7EB",
                            }}
                            transition={{ duration: 0.3 }}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

export default StepProgress;
