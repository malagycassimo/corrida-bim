"use client";
import React from "react";
import { motion } from "framer-motion";

interface StepProgressProps {
    steps: string[];
    currentStep: number;
}

const StepProgress: React.FC<StepProgressProps> = ({ steps, currentStep }) => {
    return (
        <div className="flex items-center justify-between w-full max-w-3xl mx-auto px-2">
            {steps.map((step, index) => {
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;

                return (
                    <React.Fragment key={index}>
                        <div className="flex flex-col items-center select-none">
                            <motion.div
                                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-1.5 transition-all duration-300 ${
                                    isCurrent ? "ring-4 ring-primary/20 shadow-sm" : ""
                                }`}
                                initial={false}
                                animate={{
                                    backgroundColor:
                                        index <= currentStep
                                            ? "#D1005D"
                                            : "#F3F4F6",
                                    borderColor:
                                        index <= currentStep
                                            ? "#D1005D"
                                            : "#E5E7EB",
                                }}
                                transition={{ duration: 0.3 }}
                            >
                                {isCompleted ? (
                                    <svg
                                        className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-[2.5]"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                ) : (
                                    <span
                                        className={`text-xs sm:text-sm font-bold ${
                                            isCurrent
                                                ? "text-white"
                                                : "text-zinc-500"
                                        }`}
                                    >
                                        {index + 1}
                                    </span>
                                )}
                            </motion.div>
                            <span
                                className={`text-xs font-medium hidden sm:block text-center max-w-[110px] leading-tight transition-colors duration-200 ${
                                    isCurrent
                                        ? "text-primary font-semibold"
                                        : isCompleted
                                        ? "text-zinc-700"
                                        : "text-zinc-400"
                                }`}
                            >
                                {step}
                            </span>
                        </div>
                        {index < steps.length - 1 && (
                            <motion.div
                                className="flex-grow h-1 mx-2 sm:mx-3 rounded-full relative bottom-0 sm:bottom-2.5 transition-colors duration-300"
                                initial={false}
                                animate={{
                                    backgroundColor:
                                        index < currentStep
                                            ? "#D1005D"
                                            : "#E5E7EB",
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default StepProgress;
