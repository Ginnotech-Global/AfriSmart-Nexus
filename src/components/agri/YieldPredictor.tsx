import { useState } from "react";
import { TrendingUp, Leaf, Droplets, Thermometer, Calendar, BarChart3, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface YieldPrediction {
  estimatedYield: number;
  yieldRange: { min: number; max: number };
  confidence: number;
  factors: {
    weather: number;
    soil: number;
    practices: number;
    variety: number;
  };
  recommendations: string[];
  riskFactors: string[];
}

const crops = [
  "Maize/Corn", "Rice", "Cassava", "Yam", "Plantain", "Cocoa", "Oil Palm", 
  "Tomatoes", "Peppers", "Okra", "Beans", "Groundnuts", "Millet", "Sorghum"
];

const soilTypes = [
  "Sandy", "Clay", "Loamy", "Sandy Loam", "Clay Loam", "Silt", "Silt Loam"
];

const varietyOptions = {
  "Maize/Corn": ["TZB-SR", "SAMMAZ-15", "SAMMAZ-16", "Local Variety"],
  "Rice": ["FARO-44", "FARO-52", "NERICA-L-20", "Local Variety"],
  "Tomatoes": ["UC-82B", "Roma VF", "Tropimech", "Local Variety"],
  // Add more varieties for other crops
};

export const YieldPredictor = () => {
  const [formData, setFormData] = useState({
    crop: "",
    variety: "",
    farmSize: "",
    soilType: "",
    soilPH: "",
    plantingDate: "",
    fertilizerUsed: "",
    irrigationMethod: "",
    previousYield: "",
    pestPressure: "",
    location: ""
  });
  
  const [prediction, setPrediction] = useState<YieldPrediction | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateYield = async () => {
    if (!formData.crop || !formData.farmSize) return;
    
    setIsCalculating(true);
    
    // Simulate AI calculation
    setTimeout(() => {
      // Mock yield prediction calculation
      const baseYield = getBaseYield(formData.crop);
      const factors = calculateFactors(formData);
      const adjustedYield = baseYield * factors.overall;
      
      const mockPrediction: YieldPrediction = {
        estimatedYield: Math.round(adjustedYield * parseFloat(formData.farmSize)),
        yieldRange: {
          min: Math.round(adjustedYield * 0.8 * parseFloat(formData.farmSize)),
          max: Math.round(adjustedYield * 1.2 * parseFloat(formData.farmSize))
        },
        confidence: 85 + Math.random() * 10,
        factors: {
          weather: 75 + Math.random() * 20,
          soil: factors.soil * 100,
          practices: factors.practices * 100,
          variety: factors.variety * 100
        },
        recommendations: generateRecommendations(formData),
        riskFactors: generateRiskFactors(formData)
      };
      
      setPrediction(mockPrediction);
      setIsCalculating(false);
    }, 3000);
  };

  const getBaseYield = (crop: string): number => {
    const baseYields: { [key: string]: number } = {
      "Maize/Corn": 3500, // kg per hectare
      "Rice": 4000,
      "Cassava": 15000,
      "Tomatoes": 25000,
      "Peppers": 8000,
      "Beans": 1500,
      "Groundnuts": 2000
    };
    return baseYields[crop] || 3000;
  };

  const calculateFactors = (data: any) => {
    // Simplified factor calculation
    const soilFactor = data.soilType === "Loamy" ? 1.1 : data.soilType === "Clay" ? 0.9 : 1.0;
    const varietyFactor = data.variety.includes("FARO") || data.variety.includes("SAMMAZ") ? 1.15 : 1.0;
    const practicesFactor = data.fertilizerUsed === "yes" ? 1.2 : 0.8;
    
    return {
      soil: soilFactor,
      variety: varietyFactor,
      practices: practicesFactor,
      overall: (soilFactor + varietyFactor + practicesFactor) / 3
    };
  };

  const generateRecommendations = (data: any): string[] => {
    const recommendations = [];
    
    if (data.soilPH && (parseFloat(data.soilPH) < 6.0 || parseFloat(data.soilPH) > 7.5)) {
      recommendations.push("Adjust soil pH to optimal range (6.0-7.0) using lime or organic matter");
    }
    
    if (data.fertilizerUsed !== "yes") {
      recommendations.push("Apply appropriate NPK fertilizer for better yield potential");
    }
    
    if (data.irrigationMethod === "rainfed") {
      recommendations.push("Consider supplemental irrigation during dry spells");
    }
    
    recommendations.push("Implement integrated pest management (IPM) practices");
    recommendations.push("Ensure proper plant spacing and density for optimal growth");
    
    return recommendations;
  };

  const generateRiskFactors = (data: any): string[] => {
    const risks = [];
    
    if (data.pestPressure === "high") {
      risks.push("High pest pressure may reduce yield by 15-25%");
    }
    
    if (data.soilType === "Sandy") {
      risks.push("Sandy soil may require more frequent irrigation and fertilization");
    }
    
    risks.push("Weather variability can impact final yield by ±20%");
    risks.push("Market prices may fluctuate, affecting profitability");
    
    return risks;
  };

  const getFactorColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const isFormValid = formData.crop && formData.farmSize && formData.soilType;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Yield Prediction</h2>
        <p className="text-lg text-gray-600">
          Get accurate crop yield forecasts based on soil, weather, and farming practices
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              <span>Farm Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="crop">Crop Type *</Label>
                <Select value={formData.crop} onValueChange={(value) => handleInputChange("crop", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map((crop) => (
                      <SelectItem key={crop} value={crop}>
                        {crop}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="variety">Variety</Label>
                <Select 
                  value={formData.variety} 
                  onValueChange={(value) => handleInputChange("variety", value)}
                  disabled={!formData.crop}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select variety" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.crop && varietyOptions[formData.crop as keyof typeof varietyOptions]?.map((variety) => (
                      <SelectItem key={variety} value={variety}>
                        {variety}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="farmSize">Farm Size (hectares) *</Label>
                <Input
                  id="farmSize"
                  type="number"
                  placeholder="e.g., 2.5"
                  value={formData.farmSize}
                  onChange={(e) => handleInputChange("farmSize", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="soilType">Soil Type *</Label>
                <Select value={formData.soilType} onValueChange={(value) => handleInputChange("soilType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select soil type" />
                  </SelectTrigger>
                  <SelectContent>
                    {soilTypes.map((soil) => (
                      <SelectItem key={soil} value={soil}>
                        {soil}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="soilPH">Soil pH (if known)</Label>
                <Input
                  id="soilPH"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 6.5"
                  value={formData.soilPH}
                  onChange={(e) => handleInputChange("soilPH", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="plantingDate">Planting Date</Label>
                <Input
                  id="plantingDate"
                  type="date"
                  value={formData.plantingDate}
                  onChange={(e) => handleInputChange("plantingDate", e.target.value)}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fertilizerUsed">Fertilizer Application</Label>
                <Select value={formData.fertilizerUsed} onValueChange={(value) => handleInputChange("fertilizerUsed", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes, applied</SelectItem>
                    <SelectItem value="no">No fertilizer</SelectItem>
                    <SelectItem value="planned">Planned</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="irrigationMethod">Irrigation Method</Label>
                <Select value={formData.irrigationMethod} onValueChange={(value) => handleInputChange("irrigationMethod", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rainfed">Rainfed</SelectItem>
                    <SelectItem value="drip">Drip Irrigation</SelectItem>
                    <SelectItem value="sprinkler">Sprinkler</SelectItem>
                    <SelectItem value="flood">Flood Irrigation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="previousYield">Previous Yield (kg/ha)</Label>
                <Input
                  id="previousYield"
                  type="number"
                  placeholder="e.g., 3000"
                  value={formData.previousYield}
                  onChange={(e) => handleInputChange("previousYield", e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="pestPressure">Pest Pressure</Label>
                <Select value={formData.pestPressure} onValueChange={(value) => handleInputChange("pestPressure", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button 
              onClick={calculateYield}
              disabled={!isFormValid || isCalculating}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isCalculating ? (
                <>
                  <TrendingUp className="h-4 w-4 mr-2 animate-pulse" />
                  Calculating Yield...
                </>
              ) : (
                <>
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Predict Yield
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="space-y-6">
          {isCalculating && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <div className="animate-spin mx-auto">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <p className="text-lg font-medium">Analyzing your farm data...</p>
                  <p className="text-sm text-gray-600">Processing soil, weather, and practice data to predict yield</p>
                  <Progress value={66} className="w-full" />
                </div>
              </CardContent>
            </Card>
          )}

          {prediction && (
            <>
              {/* Yield Prediction */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Yield Prediction</span>
                    <Badge className="bg-green-100 text-green-800">
                      {prediction.confidence.toFixed(1)}% Confidence
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center space-y-4">
                    <div>
                      <div className="text-4xl font-bold text-green-600 mb-2">
                        {prediction.estimatedYield.toLocaleString()} kg
                      </div>
                      <p className="text-gray-600">Estimated Total Yield</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-medium text-gray-900">
                          {prediction.yieldRange.min.toLocaleString()} kg
                        </div>
                        <p className="text-sm text-gray-600">Minimum Expected</p>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="text-lg font-medium text-gray-900">
                          {prediction.yieldRange.max.toLocaleString()} kg
                        </div>
                        <p className="text-sm text-gray-600">Maximum Potential</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Yield Factors */}
              <Card>
                <CardHeader>
                  <CardTitle>Yield Factors Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(prediction.factors).map(([factor, score]) => (
                    <div key={factor} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium capitalize">{factor}</span>
                        <span className={`text-sm font-medium ${getFactorColor(score)}`}>
                          {score.toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={score} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Leaf className="h-5 w-5 text-green-600" />
                    <span>Recommendations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {prediction.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Risk Factors */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <span>Risk Factors</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {prediction.riskFactors.map((risk, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{risk}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          )}

          {!prediction && !isCalculating && (
            <Card>
              <CardContent className="pt-8">
                <div className="text-center text-gray-500">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>Fill in your farm details to get AI-powered yield predictions</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          Yield predictions are estimates based on provided data and historical patterns. Actual yields may vary due to weather, pests, diseases, and other factors. Use predictions as guidance alongside local expert advice.
        </AlertDescription>
      </Alert>
    </div>
  );
};