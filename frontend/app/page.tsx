"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Heart,
  Activity,
  Cigarette,
  Weight,
  Droplets,
  Calendar,
  HelpCircle,
  TrendingUp,
  Shield,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface PredictionResult {
  prediction: number;
  probability: {
    no_diabetes: number;
    diabetes: number;
  };
  risk_level: string;
}

interface FormData {
  gender: string;
  age: number;
  hypertension: string;
  heart_disease: string;
  smoking_history: string;
  bmi: number;
  HbA1c_level: number;
  blood_glucose_level: number;
}

export default function DiabetesPrediction() {
  const [formData, setFormData] = useState<FormData>({
    gender: "",
    age: 30,
    hypertension: "",
    heart_disease: "",
    smoking_history: "",
    bmi: 25,
    HbA1c_level: 5.5,
    blood_glucose_level: 100,
  });

  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (prediction) {
      setPrediction(null);
    }
  };

  const validateForm = (): boolean => {
    if (
      !formData.gender ||
      !formData.hypertension ||
      !formData.heart_disease ||
      !formData.smoking_history
    ) {
      setError("Please fill in all required fields");
      return false;
    }
    if (formData.age < 1 || formData.age > 120) {
      setError("Please enter a valid age (1-120)");
      return false;
    }
    if (formData.bmi < 10 || formData.bmi > 60) {
      setError("Please enter a valid BMI (10-60)");
      return false;
    }
    return true;
  };

  const handlePredict = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/predict`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get prediction");
      }

      const result: PredictionResult = await response.json();
      console.log(result);
      setPrediction(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case "low":
        return "text-green-600 bg-green-50 border-green-200";
      case "moderate":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "high":
        return "text-red-600 bg-red-50 border-red-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getRiskIcon = (riskLevel: string) => {
    switch (riskLevel.toLowerCase()) {
      case "low":
        return <Shield className="w-5 h-5" />;
      case "moderate":
        return <TrendingUp className="w-5 h-5" />;
      case "high":
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Normal";
    if (bmi < 30) return "Overweight";
    return "Obese";
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 space-y-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Diabetes Risk Assessment
            </h1>
            <p className="text-gray-600">
              Enter your health information to assess your diabetes risk
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Input Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Health Information
                </CardTitle>
                <CardDescription>
                  Please provide accurate information for the best prediction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Personal Details
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label
                        htmlFor="gender"
                        className="flex items-center gap-2"
                      >
                        Gender <span className="text-red-500">*</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Biological sex affects diabetes risk patterns</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Select
                        value={formData.gender}
                        onValueChange={(value) =>
                          handleInputChange("gender", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Male">Male</SelectItem>
                          <SelectItem value="Female">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age" className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Age
                      </Label>
                      <Input
                        type="number"
                        value={formData.age}
                        onChange={(e) =>
                          handleInputChange(
                            "age",
                            parseInt(e.target.value) || 0
                          )
                        }
                        min="1"
                        max="120"
                      />
                    </div>
                  </div>
                </div>

                {/* Medical History */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Medical History
                  </h3>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Hypertension <span className="text-red-500">*</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>High blood pressure ({">"}140/90 mmHg)</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Select
                        value={formData.hypertension}
                        onValueChange={(value) =>
                          handleInputChange("hypertension", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Do you have hypertension?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="No">No</SelectItem>
                          <SelectItem value="Yes">Yes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        Heart Disease <span className="text-red-500">*</span>
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Any diagnosed cardiovascular disease</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Select
                        value={formData.heart_disease}
                        onValueChange={(value) =>
                          handleInputChange("heart_disease", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Do you have heart disease?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="No">No</SelectItem>
                          <SelectItem value="Yes">Yes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Cigarette className="w-4 h-4" />
                        Smoking History <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.smoking_history}
                        onValueChange={(value) =>
                          handleInputChange("smoking_history", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select smoking history" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="never">Never</SelectItem>
                          <SelectItem value="former">Former smoker</SelectItem>
                          <SelectItem value="current">
                            Current smoker
                          </SelectItem>
                          <SelectItem value="not current">
                            Not current
                          </SelectItem>
                          <SelectItem value="ever">Ever smoked</SelectItem>
                          <SelectItem value="No Info">
                            No information
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Physical Measurements */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Physical Measurements
                  </h3>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label className="flex items-center gap-2">
                          <Weight className="w-4 h-4" />
                          BMI: {formData.bmi.toFixed(1)}
                        </Label>
                        <Badge variant="outline">
                          {getBMICategory(formData.bmi)}
                        </Badge>
                      </div>
                      <Slider
                        value={[formData.bmi]}
                        onValueChange={(value) =>
                          handleInputChange("bmi", value[0])
                        }
                        min={15}
                        max={50}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>15</span>
                        <span>50</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="flex items-center gap-2">
                        <Droplets className="w-4 h-4" />
                        HbA1c Level: {formData.HbA1c_level.toFixed(1)}%
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Average blood sugar over 2-3 months. Normal: {"<"}
                              5.7%
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Slider
                        value={[formData.HbA1c_level]}
                        onValueChange={(value) =>
                          handleInputChange("HbA1c_level", value[0])
                        }
                        min={3}
                        max={15}
                        step={0.1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>3%</span>
                        <span>15%</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="flex items-center gap-2">
                        <Droplets className="w-4 h-4" />
                        Blood Glucose: {formData.blood_glucose_level} mg/dL
                        <Tooltip>
                          <TooltipTrigger>
                            <HelpCircle className="w-4 h-4 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Fasting glucose level. Normal: 70-100 mg/dL</p>
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Slider
                        value={[formData.blood_glucose_level]}
                        onValueChange={(value) =>
                          handleInputChange("blood_glucose_level", value[0])
                        }
                        min={50}
                        max={300}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>50</span>
                        <span>300</span>
                      </div>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                    {error}
                  </div>
                )}

                <Button
                  onClick={handlePredict}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  size="lg"
                >
                  {isLoading ? "Analyzing..." : "Assess Diabetes Risk"}
                </Button>
              </CardContent>
            </Card>

            {/* Results Panel */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Risk Assessment
                </CardTitle>
                <CardDescription>
                  Your personalized diabetes risk analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!prediction ? (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <Activity className="w-16 h-16 mb-4 opacity-50" />
                    <p className="text-lg">
                      Fill out the form to see your risk assessment
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Risk Level Badge */}
                    <div className="text-center">
                      <div
                        className={`inline-flex items-center gap-2 px-4 py-3 rounded-lg border ${getRiskColor(
                          prediction.risk_level
                        )}`}
                      >
                        {getRiskIcon(prediction.risk_level)}
                        <span className="text-xl font-semibold">
                          {prediction.risk_level} Risk
                        </span>
                      </div>
                    </div>

                    {/* Probability Breakdown */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-gray-700">
                        Probability Breakdown
                      </h4>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-green-700">
                              No Diabetes
                            </span>
                            <span className="text-sm font-bold text-green-700">
                              {(
                                prediction.probability.no_diabetes * 100
                              ).toFixed(1)}
                              %
                            </span>
                          </div>
                          <Progress
                            value={prediction.probability.no_diabetes * 100}
                            className="h-2 bg-green-100"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-red-700">
                              Diabetes Risk
                            </span>
                            <span className="text-sm font-bold text-red-700">
                              {(prediction.probability.diabetes * 100).toFixed(
                                1
                              )}
                              %
                            </span>
                          </div>
                          <Progress
                            value={prediction.probability.diabetes * 100}
                            className="h-2 bg-red-100"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-700">
                        Recommendations
                      </h4>
                      <div className="text-sm text-gray-600 space-y-2">
                        {prediction.risk_level.toLowerCase() === "low" && (
                          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                            <p className="font-medium text-green-800">
                              Great news!
                            </p>
                            <p>
                              Your diabetes risk is low. Continue maintaining a
                              healthy lifestyle with regular exercise and
                              balanced diet.
                            </p>
                          </div>
                        )}
                        {prediction.risk_level.toLowerCase() === "moderate" && (
                          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                            <p className="font-medium text-yellow-800">
                              Consider prevention measures
                            </p>
                            <p>
                              Your risk is moderate. Consider lifestyle changes
                              like increased physical activity, weight
                              management, and regular health checkups.
                            </p>
                          </div>
                        )}
                        {prediction.risk_level.toLowerCase() === "high" && (
                          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="font-medium text-red-800">
                              Consult a healthcare provider
                            </p>
                            <p>
                              Your risk is high. Please consult with a
                              healthcare professional for proper evaluation and
                              potential preventive measures.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Educational Resources */}
                    
                    <div className="text-xs text-gray-500 text-center pt-4 border-t">
                      * This is a predictive model and should not replace
                      professional medical advice
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
          </div>
        </div>
        <div className="max-w-4xl mx-auto">
        <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  Learn More
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 pt-4 border-t">
                     
                      <div className="grid grid-cols-1 gap-2">
                        <Link href="https://www.youtube.com/watch?v=wmOW091P2ew">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-between"
                          >
                            What is Diabetes?
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href="https://www.mayoclinic.org/diseases-conditions/type-2-diabetes/in-depth/diabetes-prevention/art-20047639?utm_source=chatgpt.com">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-between"
                          >
                            How to Prevent Diabetes
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href="https://www.mayoclinic.org/diseases-conditions/diabetes/in-depth/diabetes-management/art-20047963?utm_source=chatgpt.com">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full justify-between"
                          >
                            Diabetes Management
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </TooltipProvider>
  );
}
