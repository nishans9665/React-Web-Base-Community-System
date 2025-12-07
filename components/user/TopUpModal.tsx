"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreditCard, Zap, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const SUBSCRIPTION_PLANS = [
    { id: 'basic', credits: 100, price: '$5', label: 'Starter' },
    { id: 'pro', credits: 500, price: '$19', label: 'Pro', popular: true },
    { id: 'elite', credits: 1500, price: '$49', label: 'Elite' },
];

export function TopUpModal() {
    const [selectedPlan, setSelectedPlan] = useState<string | null>('pro');
    const [isProcessing, setIsProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    const handlePurchase = async () => {
        setIsProcessing(true);
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsProcessing(false);
        setSuccess(true);

        // Reset after 2s
        setTimeout(() => {
            setSuccess(false);
            // In real app, close modal or refresh user data
        }, 2000);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="w-full py-1.5 rounded-lg bg-blue-600 text-xs font-bold hover:bg-blue-500 transition-colors text-white">
                    Top Up Credits
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-[#1a1a1a] border-white/10 text-white">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center mb-2">Upgrade Your Level</DialogTitle>
                    <p className="text-center text-gray-400 text-sm">Purchase credits to unlock premium badges and post visibility.</p>
                </DialogHeader>

                {!success ? (
                    <div className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 gap-3">
                            {SUBSCRIPTION_PLANS.map(plan => (
                                <div
                                    key={plan.id}
                                    onClick={() => setSelectedPlan(plan.id)}
                                    className={cn(
                                        "relative p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between group",
                                        selectedPlan === plan.id
                                            ? "border-blue-500 bg-blue-500/10"
                                            : "border-white/10 bg-white/5 hover:bg-white/10"
                                    )}
                                >
                                    {plan.popular && (
                                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded text-[10px] font-bold uppercase tracking-wider">
                                            Most Popular
                                        </span>
                                    )}

                                    <div className="flex items-center gap-3">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center",
                                            selectedPlan === plan.id ? "bg-blue-500 text-white" : "bg-white/10 text-gray-400"
                                        )}>
                                            <Zap className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold">{plan.credits} Credits</h4>
                                            <p className="text-xs text-gray-400">{plan.label}</p>
                                        </div>
                                    </div>

                                    <span className="font-bold text-lg">{plan.price}</span>
                                </div>
                            ))}
                        </div>

                        <Button
                            onClick={handlePurchase}
                            disabled={isProcessing}
                            className="w-full h-12 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] transition-transform"
                        >
                            {isProcessing ? "Processing..." : "Purchase Now"}
                        </Button>

                        <p className="text-xs text-center text-gray-500 flex items-center justify-center gap-1">
                            <CreditCard className="w-3 h-3" /> Secure Payment via Stripe
                        </p>
                    </div>
                ) : (
                    <div className="py-8 flex flex-col items-center justify-center animate-in zoom-in">
                        <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-4">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-white">Purchase Successful!</h3>
                        <p className="text-gray-400 mt-2">Your credits have been added to your account.</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
